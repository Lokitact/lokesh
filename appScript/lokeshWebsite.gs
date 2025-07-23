function doPost(e) {
  if (!e || !e.parameter) {
    return ContentService.createTextOutput("No data received").setMimeType(ContentService.MimeType.TEXT);
  }

  const data = e.parameter;

  // Save to Google Sheet
  const sheet = SpreadsheetApp.openById('1htZldTcUW3MvZFCtOG3TpnXrnN5fOzICDrx6FMT_RmM').getSheetByName('Sheet1');
  sheet.appendRow([new Date(), data.name, data.email, data.subject, data.message]);

  // Escape HTML to avoid injection issues
  function escapeHTML(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  const name = escapeHTML(data.name || "User");
  const email = data.email;
  const subject = escapeHTML(data.subject || "(No Subject)");
  const message = escapeHTML(data.message || "(No Message)").replace(/\n/g, "<br>");
  const timestamp = new Date().toLocaleString(); // or new Date().toString()

  // Notify Admin
  const adminEmail = "tactloki@gmail.com";

  // Prepare HTML email for admin
  const adminTemplate = HtmlService.createTemplateFromFile("AdminReply");
  adminTemplate.name = name;
  adminTemplate.email = email;
  adminTemplate.subject = subject;
  adminTemplate.message = message;
  adminTemplate.timestamp = timestamp;

  const adminHtmlBody = adminTemplate.evaluate().getContent();

  MailApp.sendEmail({
    to: adminEmail,
    subject: "New Contact Form Submission",
    htmlBody: adminHtmlBody
  });


  // Prepare HTML template
  const template = HtmlService.createTemplateFromFile("AutoReply");
  template.name = name;
  template.subject = subject;
  template.message = message;

  const htmlBody = template.evaluate().getContent();

  // Send HTML Auto-reply to User
  MailApp.sendEmail({
    to: email,
    subject: "Thank you for reaching out",
    name: "Lokesh",
    body: `Hi ${name},\n\nThank you for contacting us. We'll reply within 48 working hours.\n\n– Lokesh Team`,
    htmlBody: htmlBody
  });

  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}
