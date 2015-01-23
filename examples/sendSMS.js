var osms = require('../index');
var Cutter = require('utf8-binary-cutter');

var sms = new osms({host: 'localhost'});

var rus_text = 'Приветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветприветпривет';

var eng_text = 'Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! Hello, Baby! '


console.log( Cutter.getBinarySize( eng_text ) ); 
console.log( Cutter.getBinarySize( rus_text ) );

//var m = Cutter.truncateToBinarySize( eng_text, 160);  //good send
var m = Cutter.truncateToBinarySize( rus_text, 137);  //good send

console.log( Cutter.getBinarySize( m ) );
console.log( m);


sms.open(function () {
	sms.sendOneSMS({span: 1, number: '89135292926', text: m}, function (responses){
		console.log(responses, 'Done!');
	})
});