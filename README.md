# openvox-sms
OpenVox VoxStack GSM-gateway sms sender


Intro
=====

OpenVox VoxStack GSM-gateway have inside Asterisk PBX (http://www.asterisk.org)
Asterisk have AMI (Asterisk Manager Interface) - telnet connection 
for exchange commands and events


Install
=======

> npm install openvox-sms --save


Usage
=====

`````
var osms = require('openvox-sms');

var sms = new osms({host: 'localhost'});

sms.open(function () {
	sms.sendSMS({span: 1, number: '89135292926', text: 'hello'}, function () {
		console.log('Done!');
	});
});

`````

Bugs?
=====

Please, contact with me