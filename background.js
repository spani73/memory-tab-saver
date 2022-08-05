
(function () {

	// Draw browser action icon with HTML5 canvas
	document.write('<canvas id="canvas"></canvas>');
  
	var SIZE = 19; // Icon size
	var canvas = document.getElementById('canvas');
	canvas.width = SIZE;
	canvas.height = SIZE;
  
	var c = canvas.getContext("2d");
  
	// Define an array to storage available memory percent
	var availMem = Array(SIZE);
	for (var i = availMem.length; i--; ) {
	  availMem[i] = 1;
	}
    var count = 0;
	(function draw() {
       
	  // Get available memory percent
	  chrome.system.memory.getInfo(function (info) {
		availMem.push(info.availableCapacity / info.capacity);
		availMem.shift();
		
        console.log("command");
		// Show memory information on mouse over
		chrome.browserAction.setTitle({
		  title: 'Total: ' + (info.capacity / 1073741824).toFixed(2) + ' GiB\n' +
				 'Available: ' + (info.availableCapacity / 1073741824).toFixed(2) + ' GiB',
		});
        
		var percent = (((info.availableCapacity / 1073741824) / (info.capacity / 1073741824))*100).toFixed(2);
		count = count +1;
		console.log(count + "   "+ percent);
		if(percent < 15 && count%200 == 0){
			alert("Set Memory Limit Exceeded! Please Use Alt + S to save current tabs before you close them!");
			
		}

		c.clearRect(0, 0, SIZE, SIZE);
  
		// Draw memory usage change
		c.beginPath();
		  c.moveTo(0, SIZE);
		  for (var i = 0; i < SIZE; i++) {
			c.lineTo(i, availMem[i] * SIZE);
		  }
		  c.lineTo(SIZE, SIZE);
		  c.lineWidth = 2;
		  c.fillStyle = '#FFFFFF';
		  c.fill();
  
		// Draw border
		c.beginPath();
		  c.moveTo(0, 0);
		  c.lineTo(0, SIZE);
		  c.lineTo(SIZE, SIZE);
		  c.lineTo(SIZE, 0);
		  c.closePath();
		  c.lineWidth = 2;
		  c.strokeStyle = '#F5052D';
		  c.stroke();
  
		chrome.browserAction.setIcon({
		  imageData: c.getImageData(0, 0, SIZE, SIZE)
		});
	  });
  
	  setTimeout(draw, 1000);
	})();
  })();
  



// Alt + S command to SAVE all urls code from here
function generateTabList(callback) {
	var tabsString = '';
	chrome.windows.getAll({ populate: true }, function (windows) {
		for (var i = 0; i < windows.length; i++) {
			for (var j = 0; j < windows[i].tabs.length; j++) {
				tabsString += windows[i].tabs[j].title + ":  ";
				tabsString += windows[i].tabs[j].url + "\r\n\n\n";
			}
		}
		callback(tabsString);
	});
}

function createDownloadLink(text) {
	var fileName = generateFilename();
	var downloadLink = document.createElement('a');
	var blob = new Blob([text], { type: 'text/plain' });
	downloadLink.setAttribute('href', window.URL.createObjectURL(blob));
	downloadLink.setAttribute('download', fileName);
	downloadLink.innerHTML = 'Download file';
	return downloadLink;
}

function generateFilename() {
	var d = new Date();
	var date_string =
		d.getFullYear()
		+ ''
		+ ('0' + (d.getMonth() + 1)).slice(-2)
		+ ''
		+ ('0' + d.getDate()).slice(-2)
		+ '-'
		+ ('0' + d.getHours()).slice(-2)
		+ 'h'
		+ ('0' + d.getMinutes()).slice(-2);
	return 'chrome-tabs-' + date_string + '.txt';
};

function downloadTabList() {
	generateTabList(function (text) {
		var downloadLink = createDownloadLink(text);
		downloadLink.click()
	});
}


chrome.commands.onCommand.addListener(function (command) {
	if (command === 'download') {
		console.log("dw");
		downloadTabList();
	}
});