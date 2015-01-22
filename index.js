var Nami = require("nami");

var osms = function (options) {

	var options = options || {} ;

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

osms.prototype.sendSMS = function(options, callback){
	var Command = new Nami.Actions.Command();
	Command.command = ['gsm send sms', options['span'], options['number'], '"' + options['text'] + '"'].join(' ');
	console.log(Command.command);
	this.send(Command, callback)
};

module.exports = osms;