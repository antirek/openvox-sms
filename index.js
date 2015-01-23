var Nami = require("nami");

var osms = function (options) {

	var options = options || {};
	this.SPLIT_COUNT = 102;

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

osms.prototype.sendOneSMS = function (options, callback) {
	var Command = new Nami.Actions.Command();
	Command.command = ['gsm send sms', options['span'], options['number'], '"' + options['text'] + '"'].join(' ');
	console.log(Command.command);
	this.send(Command, callback)
};

osms.prototype.sendSMS = function (options, callback) {

	var string = options['text'];
	var count_cycles = Math.floor(string.length / this.SPLIT_COUNT);
	var array = [];
	var responses = [];

	for (var i = 0; i <= count_cycles; i++) {
		array[i] = string.substr(i * this.SPLIT_COUNT, this.SPLIT_COUNT);
	};

	array.map(function (element) {
		options['text'] = element;
		this.sendOneSMS(options, function (response){
			responses.push(response);
		});
	}, this);

	callback(responses);
};

module.exports = osms;