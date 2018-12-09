function getJql() {
  var jql = "project = PAN AND issuetype in standardIssueTypes() AND Sprint IN openSprints() ORDER BY key DESC, lastViewed DESC";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Chart");
  var cell = sheet.getRange(1,2);
      
  if(!cell.isBlank()) {
    jql = "project = PAN AND issuetype in standardIssueTypes() AND Sprint = '" + cell.getValue() + "' ORDER BY key DESC, lastViewed DESC";
  }
  
  // Logger.log(jql);
  return jql;
}

function importCurrentSprint() {
  var jql = getJql();
  var data = getJireIssues(jql);
  
  if(data.length > 0) {
    var sheet = prepareSheet();
    // Logger.log(data);
    setRowsData(sheet, data);
  } else {
    var ui = SpreadsheetApp.getUi();
    var result = ui.alert(
      'Error: No tickets found. Please check the Sprint name and try again.',
      ui.ButtonSet.OK
    )
  }
}

function importCurrentSprintAndPost() {
  var jql = getJql();
  var data = getJireIssues(jql);
  
  if(data.length > 0) {
    var sheet = prepareSheet();
    Logger.log(data);
    setRowsData(sheet, data);
    saveChartToDrive();
  }
}