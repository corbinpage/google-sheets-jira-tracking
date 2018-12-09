function getJireIssues(jql) {
  var searchResults = {};
  var data = [];
  var isLast = false;
  var nextIndex = 0;
  var i = 0;
  
  while(!isLast && i < 100) {
    var searchResults = queryJira(nextIndex, jql);
    var newData = formatData(searchResults);
    data = data.concat(newData);
    
    nextIndex = searchResults.startAt + searchResults.maxResults;
    isLast = (nextIndex > searchResults.total);
    i++;
  }
  
  // Logger.log(data);
  
  return data;
}

function queryJira(startAt, jql) {
  var urlBase = 'https://landstream.atlassian.net/rest/api/3';
  var urlPath = '/search';
  var url = urlBase + urlPath;
  
  var auth = '<Auth email>:<Auth public>';
  var encodedAuth = 'Basic ' + Utilities.base64Encode(auth);
  
  var data = {
    "jql": jql,
    "startAt": startAt ? startAt : 0,
    "maxResults": 1000,
    "fields": ["id","key","summary","status","customfield_10200","issuetype","assignee"],
  }
  
  var options = {
    'muteHttpExceptions' : true,
    'method' : 'post',
    'payload': JSON.stringify(data),
    'contentType': 'application/json',
    'headers' : {
      'Authorization' : encodedAuth,
    },
  };
  
  var response = UrlFetchApp.fetch(url, options);
  // Logger.log(response.getContentText());
  
  return JSON.parse(response.getContentText());
}

