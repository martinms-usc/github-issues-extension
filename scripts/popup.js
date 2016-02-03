var d = document;

// when popup open, populate it from local storage
d.addEventListener('DOMContentLoaded', function() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var recentIssues = issues.slice(0,10);

  for (var i=0; i<recentIssues.length; i++) {
    appendIssue(recentIssues[i]);
  }

  fixLinks();
});

// add issue to popup.html
function appendIssue(info) {
  var issueUrl = info.url;
  var issueNum = issueUrl.slice(issueUrl.indexOf('issues') + 7);
  var issues = d.getElementById('issue-list');
  var a = d.createElement('a');
  var p = d.createElement('p');
  var br = d.createElement('br');
  var n = d.createTextNode(info.name);
  var t = d.createTextNode(info.time);

  a.href = info.url;
  a.appendChild(d.createTextNode(issueNum.toString()));
  p.appendChild(a);
  p.appendChild(br);
  p.appendChild(br);
  p.appendChild(n);
  p.appendChild(br);
  p.appendChild(t);
  issues.appendChild(p);
}

// create new tabs for clicked links in popup
function fixLinks() {
  var links = d.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    var href = link.href;
    link.onclick = function () {
      chrome.tabs.create({active: true, url: href});
    };
  }
}