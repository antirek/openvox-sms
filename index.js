var Nami = require("nami");

var osms = function (options) {

	var options = options || {} ;
	this.MAX_ONE_SMS_SIZE = options['MAX_ONE_SMS_SIZE'] || 102;

	this.ami = new Nami.Nami({
		host: options['host'] || 'localhost', 
		port: options['port'] || 5038,
		username: options['username'] || 'admin', 
		secret: options['secret'] || 'admin' 
	});
};

osms.prototype.on = function (evt, callback){
	this.ami.on(evt, callback);
};

osms.prototype.open = function (callback) {
	this.on('namiConnected', callback);
	this.ami.open();
};

osms.prototype.send = function (action, callback) {
	this.ami.send(action, callback);
};

osms.prototype.validateOptionsForOneSMS = function (options){
	if (!options || !options['span'] || !options['number'] || !options['text']){
		throw new Error('No required options');
	}
	if (options['text'].length > this.MAX_ONE_SMS_SIZE){
		throw new Error('SMS size is over');
	}
	return true;
}

osms.prototype.getCommand = function (options) {
	this.validateOptionsForOneSMS(options);
	return ['gsm send sms', options['span'], options['number'], '"' + options['text'] + '"'].join(' ');
}

osms.prototype.sendOneSMS = function (options, callback) {
	var Command = new Nami.Actions.Command();
	Command.command = this.getCommand(options);
	this.send(Command, callback)
};

osms.prototype.splitText = function (text) {
	var array = text.match(/.{1,100}/g);
	return array;
}

osms.prototype.sendSMS = function (options, callback) {
	if(options && options['text']){
		if(options['text'] > this.MAX_ONE_SMS_SIZE){
			var responses = [];
			var array = this.splitText(options['text']);

			array.map(function (text, array, i) {
				options['text'] = text;
				this.sendOneSMS(options, function (response){
					responses.push(response);
					if (i == array.length - 1) {
						callback(responses);
					}
				});
				
			}, this);
		} else {
			this.sendOneSMS(options, callback);
		}
	}
};

module.exports = osms;