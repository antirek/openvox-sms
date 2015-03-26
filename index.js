'use strict';

var AsteriskManager = new require('asterisk-manager');

var osms = function (options) {

    var options = options || {} ;
    this.SMS_SIZE = 160;
    this.CSMS_SIZE = 160 - 8;

    var config = {
        host: options['host'] || 'localhost',
        port: options['port'] || 5038,
        username: options['username'] || 'admin',
        secret: options['secret'] || 'admin'
    };
    console.log(config);
    this.ami = new AsteriskManager(config.port, config.host, config.username, config.secret);    
};

osms.prototype.on = function (evt, callback) {
    this.ami.on(evt, callback);
};

osms.prototype.isConnected = function () {
    return this.ami.isConnected();
}

osms.prototype.close = function (callback) {
    this.ami.disconnect(callback);
};

osms.prototype.send = function (action, callback) {
    //console.log('send', action);
    this.ami.action(action, callback);
};

osms.prototype.validateOptionsForShortSMS = function (options) {
    if (!options || !options['span'] || !options['number'] || 
        !options['text'] || !options['timeout']) {

        throw new Error('No required options');
    }

    if (options['text'].length > this.SMS_SIZE) {
        throw new Error('SMS size is over');
    }
    
    return true;
};

osms.prototype.validateOptionsForCSMS = function (options) {
    if (!options || !options['span'] || !options['number'] || 
        !options['text'] || !options['smscount'] ||
        !options['smssequence'] || !options['timeout']) {
        console.log('options', options);
        throw new Error('No required options');
    }

    if (options['text'].length > this.CSMS_SIZE) {
        throw new Error('CSMS size is over');
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

osms.prototype.sendShortSMS = function (options, callback) {
    options['timeout'] = options['timeout'] || '20';
    this.validateOptionsForShortSMS(options);

    var action = {
        action: 'Command',
        command: this.getSendSMSCommand(options)
    };

    this.send(action, callback);
};

osms.prototype.sendCSMS = function (options, callback) {
    this.validateOptionsForCSMS(options);

    var action = {
        action: 'Command',
        command: this.getSendCSMSCommand(options)
    }
    this.send(action, callback);
};

osms.prototype.isASCII = function (str) {
    return /^[\x00-\x7F]*$/.test(str);
};

osms.prototype.splitText = function (text) {
    return text.match(new RegExp('.{1,' + this.CSMS_SIZE + '}', 'g'));
};

osms.prototype.prepareCSMSArray = function (options) {
    var array = this.splitText(options['text']);
    return array.map(function (text, i, array) {
        return {
            span: options['span'],
            number: options['number'],
            text: text,
            flag: 0,
            smscount: array.length,
            smssequence: i + 1,
            timeout: options['timeout'] || 20
        };
    });
};

osms.prototype.sendLongSMS = function (options, callback) {
    var responses = [],
        array = this.prepareCSMSArray(options);

    array.map(function (csms, i, array) {
        this.sendCSMS(csms, function (response) {
            responses.push(response);
            if (i == array.length - 1) {
                callback(responses);
            }
        });
    }, this);
};

osms.prototype.setSMSsize = function (text) {
    if (!this.isASCII(text)) {
        this.SMS_SIZE = 70;     //16bit
        this.CSMS_SIZE = 70 - 3;
    }else{
        this.SMS_SIZE = 160;     //7bit
        this.CSMS_SIZE = 160 - 8;
    };
};

osms.prototype.isLongSMSText = function (text) {
    return text.length > this.SMS_SIZE;
};

osms.prototype.validate = function (options) {
    return options && options['text'] &&
       options['number'] && options['span'];
};

osms.prototype.sendSMS = function (options, callback) {
    if (this.validate(options)) {
        var text = options['text'];

        this.setSMSsize(text);
        
        if (this.isLongSMSText(text)) {
            this.sendLongSMS(options, callback);
        } else {
            this.sendShortSMS(options, callback);
        }
    } else {
        throw new Error('Not valid options');
    }
};

module.exports = osms;