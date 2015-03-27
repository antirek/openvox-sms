var osms = require('../index');
var sms = new osms({host: 'localhost'});

var text = {
  rus: 'Привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет',
  eng: 'Hello, my darling!! How do you do? Im fine. Hello, my darling!! How do you do? Im fine. Hello, my darling!! How do you do? Im fine. Hello, my darling!! How do you do? Im fine. Hello, my darling!! How do you do? Im fine.'
  //eng: 'Hello my darling'
};

sms.on('connect', function () {
    console.log('connected?', sms.isConnected());
    /*
    sms.sendSMS({span: 1, number: '89135292926', text: text['rus']}, function (error, response) {
        console.log(error, response, 'Done!');
    });
    */
    
    sms.sendSMS({span: 1, number: '89135292926', text: text['eng']}, function (error, response) {
        console.log(error, response, 'Done!');
        sms.close(function () {
            console.log('close after sms');

            if (sms.isConnected()) {
                console.log('connected');
            } else {
                console.log('not connected');
            }
            //process.exit(0);
        });
    });
});

sms.on('close', function (evt) {
    console.log('close', evt);
});

sms.on('end', function (evt) {
    console.log('end', evt);
});

sms.on('error', function (err) {
    console.log('error', err);
});