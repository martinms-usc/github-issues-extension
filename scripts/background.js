// initialize storage
chrome.runtime.onStartup.addListener(function(details){
  localStorage.setItem('issues', []);
});

chrome.runtime.onInstalled.addListener(function(details){
  localStorage.setItem('issues', []);
});

// if any tabs are updated, check if it is a github issue and execute the content sctipt
chrome.tabs.onUpdated.addListener(function(id, info, tab) {
	if (tab.url !== undefined && info.status === "complete") {
		if (tab.url.indexOf('github.com') > -1 && isIssue(tab.url)) {
			chrome.tabs.executeScript(id, {file: 'scripts/content.js'});
		}
	}
});

// when the content script returns issue info, add it to local storage
chrome.runtime.onMessage.addListener(function(request, sender, response) {
	if ((request.from === 'content') && (request.subject === 'addNewIssue')) {
		var newIssue = request.issue;
		var storage = localStorage.getItem('issues');
		storage = storage || [];

		if (Array.isArray(storage)) {
			storage.unshift(newIssue);
		} else {
			storage = JSON.parse(storage);
			storage.unshift(newIssue);
		}

		localStorage.setItem('issues', JSON.stringify(storage));
	}
});

function isIssue(path) {
  var re = /(issues)+\/[0-9]/;
  return re.test(path);
}
