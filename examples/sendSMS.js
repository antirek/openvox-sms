var osms = require('../index');
var sms = new osms({host: 'localhost'});

var op1 = {text: 'Привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет'};
var op2 = {text: 'Hello, my darling!! How do you do? Im fine. Hello, my darling!! How do you do? Im fine. Hello, my darling!! How do you do? Im fine. Hello, my darling!! How do you do? Im fine. Hello, my darling!! How do you do? Im fine.'};


console.log(op2['text'].length);
console.log('ascii', sms.isASCII(op2.text));


sms.open(function () {
    sms.sendSMS({span: 1, number: '89135292926', text: op2['text']}, function (response) {
        console.log(response, 'Done!');
    });
});


/*
sms.open(function () {
    sms.sendCSMS({span: 1, number: '89135292926', text: 'Привет 3', flag: 0, smscount: 3, smssequence: 3}, function (response) {
        console.log(response, 'Done!');
    });
});
*/