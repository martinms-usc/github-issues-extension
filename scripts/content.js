var d = new Date();
var time = d.toLocaleTimeString(); 

// pull some info from the issue page
var issueInfo = {
  name: document.getElementsByClassName('js-issue-title')[0].textContent,
  url: window.location.href,
  time: time
};

// send issue info back to background script
chrome.runtime.sendMessage({
  from: 'content',
  subject: 'addNewIssue',
  issue: issueInfo
});
