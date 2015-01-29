var expect = require('expect.js');
var osms = require('../index');

var sms = new osms();

describe('SMS', function () {

  it('validate options for send short sms', function () {    
    var result = sms.validateOptionsForShortSMS({
                      text: '1234',
                      span: 1,
                      number: '100',
                      timeout: 20
                    });

    expect(result).to.eql(true);
  });

  it('validate options for send concatenated sms', function () {    
    var result = sms.validateOptionsForCSMS({
                      text: '1234',
                      span: 1,
                      number: '100',
                      timeout: 20,
                      smscount: 3,
                      smssequence: 2,
                      flag: 0
                    });

    expect(result).to.eql(true);
  });

  it('validate right command string for SMS', function() {
    var command = sms.getSendSMSCommand({
                      text: '1234',
                      span: 1,
                      number: '100',
                      timeout: 20
                    });

    expect(command).to.eql('gsm send sync sms 1 100 "1234" 20');
  });

  it('validate right command string for CSMS', function() {
    var command = sms.getSendCSMSCommand({
                      text: '1234',
                      span: 1,
                      number: '100',
                      timeout: 20,
                      smscount: 3,
                      smssequence: 2,
                      flag: 0
                    });

    expect(command).to.eql('gsm send sync csms 1 100 "1234" 0 3 2 20');
  });

  it('validate string must be ASCIII', function () {    
    var text = 'lopata';
    var result = sms.isASCII(text);

    expect(result).to.eql(true);
  });

  it('validate string must be non-ASCIII', function () {
    var text = 'лопата';
    var result = sms.isASCII(text);

    expect(result).to.eql(false);
  });

  it('validate string is long sms (false)', function () {
    var text = 'лопата';

    var result = sms.isLongSMSText(text);

    expect(result).to.eql(false);
  });

  it('validate string is long sms (true)', function () {
    var text = 'lopata lopata lopata lopata lopata lopata lopata lopata lopata lopata' + 
               'lopata lopata lopata lopata lopata lopata lopata lopata lopata lopata' + 
               'lopata lopata lopata lopata lopata lopata lopata lopata lopata lopata';

    var result = sms.isLongSMSText(text);

    expect(result).to.eql(true);
  });

  /*
  it('validate options for send one sms', function() {
    var sms = new osms();
    
    expect(function () { 
      sms.validateOptionsForOneSMS({text: '1234', span: 1});
    }).to.throw('No required options');
  });
  */

});