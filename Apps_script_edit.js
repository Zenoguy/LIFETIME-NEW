// Simplified Google Apps Script for form handling and weekly emails

// Sheet name and email recipient
const SHEET_NAME = "Form Responses";
const EMAIL_RECIPIENTS = "lifetimeworld@gmail.com";

/**
 * Test function to verify script is working
 * Run this first to check if the script works
 */
function testScript() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  
  if (sheet.getLastRow() === 0) {
    const headers = ["Timestamp", "First Name", "Last Name", "Email", "Phone", "Service", "Message"];
    sheet.appendRow(headers);
  }
  
  sheet.appendRow([new Date(), "Test", "User", "test@example.com", "1234567890", "Test Service", "This is a test message"]);
  
  return "Test successful! Check your spreadsheet for a test entry.";
}

/**
 * Handle form submissions
 */
function doPost(e) {
  try {
    // Get form data
    const data = e.parameter || {};
    
    // Get spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    
    // Add headers if needed
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "First Name", "Last Name", "Email", "Phone", "Service", "Message"]);
    }
    
    // Add data row
    sheet.appendRow([
      new Date(),
      data.firstName || "",
      data.lastName || "",
      data.email || "",
      data.phone || "",
      data.service || "",
      data.message || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({result: "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({result: "error", error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Send weekly email with form data
 */
function sendWeeklyEmail() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet || sheet.getLastRow() <= 1) {
      return "No data to send";
    }
    
    // Get data
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const rows = data.slice(1);
    
    // Create email body
    let emailBody = "<h2>Weekly Form Submissions Report</h2>";
    emailBody += "<table border='1' cellpadding='5' style='border-collapse: collapse;'>";
    
    // Add headers
    emailBody += "<tr style='background-color: #f2f2f2;'>";
    headers.forEach(header => {
      emailBody += `<th>${header}</th>`;
    });
    emailBody += "</tr>";
    
    // Add rows
    rows.forEach(row => {
      emailBody += "<tr>";
      row.forEach(cell => {
        emailBody += `<td>${cell}</td>`;
      });
      emailBody += "</tr>";
    });
    
    emailBody += "</table>";
    
    // Send email
    MailApp.sendEmail({
      to: EMAIL_RECIPIENTS,
      subject: "Weekly Form Submissions - Lifetime Mind Management",
      htmlBody: emailBody
    });
    
    return "Email sent successfully";
  } catch (error) {
    return "Error sending email: " + error.toString();
  }
}

/**
 * Create weekly trigger
 */
function createWeeklyTrigger() {
  try {
    // Delete existing triggers
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === "sendWeeklyEmail") {
        ScriptApp.deleteTrigger(trigger);
      }
    });
    
    // Create new trigger
    ScriptApp.newTrigger("sendWeeklyEmail")
      .timeBased()
      .everyWeeks(1)
      .onWeekDay(ScriptApp.WeekDay.MONDAY)
      .atHour(8)
      .create();
    
    return "Weekly trigger created successfully";
  } catch (error) {
    return "Error creating trigger: " + error.toString();
  }
}