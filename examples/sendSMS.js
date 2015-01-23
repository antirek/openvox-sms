var osms = require('../index');

var sms = new osms({host: 'localhost'});

var rus_text = 'Привет, крошка! Привет, крошка!Привет, крошка!Привет, крошка!Привет, крошка!Привет, крошка!Привет, крошка!Привет, крошка!Привет, крошка!Привет, крошка!Привет, крошка!Привет, крошка!Привет, крошка!Привет, крошка!Привет, крошка!Привет, крошка! Привет, крошка!Привет, крошка!Привет, крошка!Привет, крошка!';

var eng_text = 'Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! '

sms.open(function () {
	sms.sendSMS({span: 1, number: '89135292926', text: eng_text}, function (responses){
		console.log(responses, 'Done!');
	})
});