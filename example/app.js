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
win.add(recordButton);

recordButton.addEventListener('click', function() {
	/*
	audiorecoder.recordAudio("i am form js", function(result) {
		var id = result['id'];
		alert("id = "+id);
	});
	*/
	
    audiorecoder.startRecording({
    	fileFormat:"mp3",
    	filePath: "sd/opt/mydir/rec",
        success: function(d) {
        	alert("success");
            Ti.API.info("response is => " + JSON.stringify(d));
        },
        cancel: function(d) {
        	alert("cancel");
            Ti.API.info("error is => " + JSON.stringify(d));
        }
    });
});

