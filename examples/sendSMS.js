var osms = require('../index');
var sms = new osms({host: '192.168.243.125', port: 5038});

var text = {
  op1: 'Привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет',
  op2: 'Hello, my darling!! How do you do? Im fine. Hello, my darling!! How do you do? Im fine. Hello, my darling!! How do you do? Im fine. Hello, my darling!! How do you do? Im fine. Hello, my darling!! How do you do? Im fine.'
};

sms.on('connect', function() {

    sms.sendSMS({span: 1, number: '89135292926', text: text['op1']}, function (err, response) {
        console.log(err, response, 'Done!');
    });

    
    sms.sendSMS({span: 1, number: '89135292926', text: text['op2']}, function (err, response) {
        console.log(err, response, 'Done!');
    });


});

sms.on('error', function (err) {
	console.log('error', err);
});