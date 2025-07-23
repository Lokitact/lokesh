function deleteEmptyRows() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();

  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].join("").trim() === "") {
      sheet.deleteRow(i + 1);
    }
  }
}

function onEdit(e) {
  deleteEmptyRows(); // Make sure this matches the function above
}
