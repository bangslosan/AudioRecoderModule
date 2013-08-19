
// open a single window
var win = Ti.UI.createWindow({
	backgroundColor : 'white',
	layout : 'vertical'
});
var audioPlayer;
win.open();

var audioRecoder = require('titutorial.audiorecoder');
Ti.API.info("@@## module is => " + audioRecoder);
Ti.API.info("@@## audioRecoder.MPEG_4 => " + audioRecoder.MPEG_4);

// Create a Button.
var recordButton = Ti.UI.createButton({
	title : 'record',
	height : '40dp',
	width : '200dp',
	top : '100dp'
});
win.add(recordButton);

recordButton.addEventListener('click', function() {
	audioRecoder.startRecording({
		outputFormat : audioRecoder.OutputFormat_MPEG_4,
		directoryName : "testdir1",
		fileName : "testfile1",
		maxDuration : 6000,
		success : function(d) {
			alert("success");
			Ti.API.info("@@## response is => " + JSON.stringify(d));

			var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, 'DCIM/test.3gp');
			Ti.API.info("@@## dir.nativePath " + dir.nativePath);

			var url1 = Titanium.Filesystem.getFile(d.filepath);
			Ti.API.info("@@## url1.nativePath " + url1.nativePath);

			Ti.API.info("@@## d.filepath2 " + d.filepath2);
			var audioDir = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, 'AudioRecorder');
			Ti.API.info("@@## audioDir.nativePath " + audioDir.nativePath);
			var audioFile = Titanium.Filesystem.getFile(audioDir.nativePath, d.filepath2);
			Ti.API.info("@@## audioFile.nativePath " + audioFile.nativePath);

			var t1 = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, "/AudioRecorder/" + d.filepath2);
			Ti.API.info("@@## t1.nativePath " + t1.nativePath);

			if (audioFile.exists) {
				Ti.API.info('audioFile YES! (' + audioFile.nativePath + ')');
			} else {
				Ti.API.info('audioFile NO!');
			}

			var tmpFile = Titanium.Filesystem.getFile("file://" + d.filepath);
			Ti.API.info("@@## tmpFile.nativePath " + tmpFile.nativePath);
			if (tmpFile.exists) {
				Ti.API.info('tmpFile YES! (' + tmpFile.nativePath + ')');
			} else {
				Ti.API.info('tmpFile NO!');
			}

			var audio_file = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory + "/AudioRecorder/" + d.filepath2);
			Ti.API.info("@@## audio_file.nativePath " + audio_file.nativePath);
			
			audioPlayer.url = tmpFile.nativePath;
		},
		cancel : function(d) {
			alert("cancel");
			Ti.API.info("error is => " + JSON.stringify(d));
		}
	});
});

var stopButton = Ti.UI.createButton({
	title : 'stop',
	height : '40dp',
	width : '200dp',
	top : '20dp'
});
win.add(stopButton);

stopButton.addEventListener('click', function() {
	audioRecoder.stopRecording();
});

var startStopButton = Titanium.UI.createButton({
	title : 'Start/Stop Streaming',
	top : '100dp',
	width : '200dp',
	height : '40dp'
});

var pauseResumeButton = Titanium.UI.createButton({
	title : 'Pause/Resume Streaming',
	top : '20dp',
	width : '200dp',
	height : '40dp',
	enabled : false
});

win.add(startStopButton);
win.add(pauseResumeButton);

// allowBackground: true on Android allows the
// player to keep playing when the app is in the
// background.
audioPlayer = Ti.Media.createAudioPlayer({
	//url : tmpFile.nativePath,
	allowBackground : true
});

startStopButton.addEventListener('click', function() {
	// When paused, playing returns false.
	// If both are false, playback is stopped.
	if (audioPlayer.playing || audioPlayer.paused) {
		audioPlayer.stop();
		pauseResumeButton.enabled = false;
		if (Ti.Platform.name === 'android') {
			audioPlayer.release();
		}
	} else {
		audioPlayer.start();
		pauseResumeButton.enabled = true;
	}
});

pauseResumeButton.addEventListener('click', function() {
	if (audioPlayer.paused) {
		audioPlayer.start();
	} else {
		audioPlayer.pause();
	}
});
