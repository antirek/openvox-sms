
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
	sms.sendSMS({span: 1, number: '89135292926', text: 'hello'}, function (response) {
		console.log('Done!');
	});
});

`````

API
===

**new osms(options)**

init osms object

`````
var sms = new osms({         //connect to Asterisk AMI
	host: 'localhost',       //host
	port: 5038,              //port
	username: 'admin',       //username
	password: 'admin',       //password
	});
`````

**sms.open(callback)**

connect to Asterisk in OpenVox VoxStack gsm gateway

`````
sms.open(function () {
	//do something
	});
`````


**sms.sendSMS**

send SMS via opened connection to Asterisk

auto split long sms to array of csms

all params are required

`````
sendSMS({
	span: 1,                  // span of gsm board OpenVox VoxStack
	number: '89135292926',    // number 
	text: 'hello'             // text can be long, more than 160 for ascii sms and more than 70 for non-ascii sms
	}, callback);             // callback receive one response for short sms or array for long sms
`````


Tests
=====

> npm test



Bugs?
=====

Please, contact me


Links
=====

http://habrahabr.ru/post/205122/

http://mysyura.in.ua/otpravka-shlyuz-openvox/

http://www.openvox.cn/pub/manuals/Release/English/VS-GW1600-20G%20User%20Manual.pdf

http://www.openvox.cn/products/voip-gateways/gsm-gateways/148/vs-gw1600-gsm-series-detail.html

http://openvox.qiniudn.com/pub/misc/GSM%20Gateway/OpenVox%20%20GSM%20Gateway%20HTTP%20Interface_en.pdf
