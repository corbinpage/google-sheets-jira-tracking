function saveChartToDrive() {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Chart');
  var chart = sheet.getCharts()[0];
  if (chart) {
    var pic = chart.getAs('image/png');
    var date = Utilities.formatDate(new Date(), "GMT+5", "MM-dd-yyyy");
    var file = DriveApp.createFile(pic).setName("MER-Jira-SprintProgress-" + date +".png");
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); // Modify file permission to the open.
  }
}