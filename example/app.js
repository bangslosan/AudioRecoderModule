
// open a single window
var win = Ti.UI.createWindow({
	backgroundColor : 'white'
});

win.open();

var audiorecoder = require('titutorial.audiorecoder');
Ti.API.info("module is => " + audiorecoder);
// Create a Button.
var recordButton = Ti.UI.createButton({
	title : 'record',
	height : '40dp',
	width : '200dp',
	top : '100dp'
});
win.add(record);

record.addEventListener('click', function() {
	audiorecoder.recordAudio("i am form js", function(result) {
		var id = result['id'];
		alert("id = "+id);
	});
});

