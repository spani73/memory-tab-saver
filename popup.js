document.addEventListener('DOMContentLoaded', function() {
    var saveLink = document.getElementById("save");
    var reopenLink = document.getElementById("reopen");

    saveLink.addEventListener("click", function(){
    	// save the tabs
    	saveTabs();
    });

    reopenLink.addEventListener("click", function() {
        // re-open all urls
        reopenTabs();
    });
});

function saveTabs() {
	var urls = [];

	chrome.tabs.query({}, function(tabs) {
		// if only one empty tab exists, do nothing
		if (tabs.length == 1 && tabs[0].url === "chrome://newtab/") {
			window.close();
			return;
		}

		tabs.forEach(function(tab){
		    urls.push(tab.url);
		});

		// store data
		chrome.storage.local.set({'url_key': urls}, function() {
			window.close();
		});
	} );
}

function reopenTabs() {
	// load back saved tabs and re-open them
	chrome.storage.local.get('url_key', function(items) {
		for (i = 0; i < items.url_key.length; i++) {
			chrome.tabs.create({ url: items.url_key[i] });
		}

		// remove empty tabs
		chrome.tabs.query({}, function(tabs) {
			for (var i = 0; i < tabs.length; i++) {
			    if (tabs[i].url === "chrome://newtab/") {
			        chrome.tabs.remove(tabs[i].id);
			    }
			}
		});
	});
}