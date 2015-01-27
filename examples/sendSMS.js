var osms = require('../index');
var sms = new osms({host: 'localhost'});


sms.open(function () {
    sms.sendSMS({span: 1, number: '89135292926', text: 'Привет'}, function (response) {
        console.log(response, 'Done!');
    });
});