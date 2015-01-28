var Nami = require("nami");

var osms = function (options) {

	var options = options || {} ;
	this.MAX_ONE_SMS_SIZE = options['MAX_ONE_SMS_SIZE'] || 67;

	this.ami = new Nami.Nami({
		host: options['host'] || 'localhost',
		port: options['port'] || 5038,
		username: options['username'] || 'admin',
		secret: options['secret'] || 'admin'
	});
};

osms.prototype.on = function (evt, callback) {
	this.ami.on(evt, callback);
};

osms.prototype.open = function (callback) {
	this.on('namiConnected', callback);
	this.ami.open();
};

osms.prototype.send = function (action, callback) {
	this.ami.send(action, callback);
};

osms.prototype.validateOptionsForOneSMS = function (options) {
	if (!options || !options['span'] || !options['number'] || !options['text']){
		throw new Error('No required options');
	}
	if (options['text'].length > this.MAX_ONE_SMS_SIZE){
		throw new Error('SMS size is over');
	}
	return true;
};

osms.prototype.getSendSMSCommand = function (options) {	
	return [
		'gsm send sync sms',
		options['span'],
		options['number'],
		'"' + options['text'] + '"',
		options['timeout']
		].join(' ');
};

osms.prototype.getSendCSMSCommand = function (options) {
	return [
		'gsm send sync csms',
		options['span'],
		options['number'],
		'"' + options['text'] + '"',
		options['flag'],
		options['smscount'],
		options['smssequence'],
		options['timeout']
		].join(' ');
};

osms.prototype.sendOneSMS = function (options, callback) {
	this.validateOptionsForOneSMS(options);
	options['timeout'] = options['timeout'] || '20';

	var Command = new Nami.Actions.Command();
	Command.command = this.getSendSMSCommand(options);
	this.send(Command, callback);
};

osms.prototype.sendCSMS = function (options, callback) {
	//this.validateOptionsForOneSMS(options);
	options['timeout'] = options['timeout'] || '20';

	var Command = new Nami.Actions.Command();
	Command.command = this.getSendCSMSCommand(options);
	this.send(Command, callback);
};


osms.prototype.splitText = function (text) {
	var array = text.match(/.{1,67}/g);
	return array;
};

osms.prototype.sendLongSMS = function (options, callback) {
	var responses = [];
	var array = this.splitText(options['text']);

	array.map(function (text, i, array) {
		opts = {
			span: options['span'],
			number: options['number'],
			text: text,
			flag: 0,
			smscount: array.length,
			smssequence: i + 1,
			timeout: options['timeout'] || 20
		};

		this.sendCSMS(opts, function (response) {
			responses.push(response);
			if (i == array.length - 1) {
				callback(responses);
			}
		});

	}, this);
};

osms.prototype.sendSMS = function (options, callback) {
	if (options && options['text']) {
		if (options['text'].length > this.MAX_ONE_SMS_SIZE) {
			this.sendLongSMS(options, callback);
		} else {
			this.sendOneSMS(options, callback);
		}
	}
};

module.exports = osms;