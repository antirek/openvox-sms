var osms = require('../index');
var sms = new osms({host: 'localhost'});

var op = {text: 'Привет привет привет '};

console.log(op['text'].length);


sms.open(function () {
    sms.sendSMS({span: 1, number: '89135292926', text: op['text']}, function (response) {
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