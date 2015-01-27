var osms = require('../index');
var iconv = require('iconv-lite');

//var Cutter = require('utf8-binary-cutter');

var sms = new osms({host: 'localhost'});

var Cutter = function () {

  function getBinarySize(string) {
    return Buffer.byteLength(string || '', 'utf8');
  }
  
  function truncateToBinarySize(string, binaryMaxSize, truncateCallback) {
    string = string || '';

    if(getBinarySize(string) <= binaryMaxSize) return string; // OK


    // we'll use buffer.write to truncate,
    // since it doesn't overflow neither write partial UTF-8 characters.
    var truncatingBuffer = new Buffer(binaryMaxSize);
    var writtenBinaryLength = truncatingBuffer.write(string, 'utf8');
    var truncatedString = truncatingBuffer.toString('utf8', 0, writtenBinaryLength);
    if(truncateCallback) truncateCallback(binaryMaxSize, string, truncatedString);

    return truncatedString;
  }

  return {
    getBinarySize: getBinarySize,
    truncateToBinarySize: truncateToBinarySize
  }
}();


//var rus_text = 'Приветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветпривет';

var rus_text = 'Привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет привет ';

var eng_text = 'Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! '


console.log( Cutter.getBinarySize( eng_text ) ); 
console.log( Cutter.getBinarySize( rus_text ) );

//var m = Cutter.truncateToBinarySize( eng_text, 160);  //good send
//var m = Cutter.truncateToBinarySize( rus_text, 137);  //good send

//var m1 = Cutter.truncateToBinarySize( eng_text, 120);  //good send
//var m2 = Cutter.truncateToBinarySize( rus_text, 120);  //good send

//var m1 = Cutter.truncateToBinarySize( eng_text, 140);  //good send
//var m2 = Cutter.truncateToBinarySize( rus_text, 140);  //good send

var m1 = Cutter.truncateToBinarySize( eng_text, 140);  //good send
var m2 = Cutter.truncateToBinarySize( rus_text, 140);  //bad send

console.log(Cutter.getBinarySize(m1));
console.log(Cutter.getBinarySize(m2));


var buffer = new Buffer(m2, 'utf8');
//var writtenBinaryLength = buffer.write(m1, 'utf8');
var q = iconv.decode(buffer, 'utf8');

console.log('q', q);
var stt = buffer.toString('utf8');

console.log('buffer', buffer.toString('utf8'));
console.log('binary size', Cutter.getBinarySize(stt));

//console.log(string2Bin(m1));
//console.log(string2Bin(m2));

console.log(string2Bin(m1).length);
console.log(string2Bin(m2).length);

console.log(Buffer.byteLength(m1));
console.log(Buffer.byteLength(m2));

console.log(m1);
console.log(m2);

//console.log( Cutter.getBinarySize( m ) );
//console.log( m);

/*
sms.open(function () {
  sms.sendOneSMS({span: 1, number: '89135292926', text: m2}, function (responses) {
    console.log(responses, 'Done!');
  })
});
*/

function string2Bin(str) {
  var result = [];
  for (var i = 0; i < str.length; i++) {
    result.push(str.charCodeAt(i));
  }
  return result;
}