var osms = require('../index');
var sms = new osms({host: 'localhost'});

var text = {
  op1: 'Привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет',
  op2: 'Hello, my darling!! How do you do? Im fine. Hello, my darling!! How do you do? Im fine. Hello, my darling!! How do you do? Im fine. Hello, my darling!! How do you do? Im fine. Hello, my darling!! How do you do? Im fine.'
};

sms.open(function () {
    sms.sendSMS({span: 1, number: '89135292926', text: text['op1']}, function (response) {
        console.log(response, 'Done!');
    });

    sms.sendSMS({span: 1, number: '89135292926', text: text['op2']}, function (response) {
        console.log(response, 'Done!');
    });
});