var expect = require('expect.js');
var osms = require('../index');


describe('SMS', function() {
  it('validate options for send one sms', function() {
    var sms = new osms();
    var result = sms.validateOptionsForOneSMS({text: '1234', span: 1, number: '100', timeout: 20});

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