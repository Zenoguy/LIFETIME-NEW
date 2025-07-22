// Weekly Email Service for Lifetime Mind Management
// This script would run on a server with a scheduled task/cron job

const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const sheets = google.sheets('v4');

// Configuration
const CONFIG = {
  sheetId: 'YOUR_GOOGLE_SHEET_ID',
  sheetName: 'Contact Form Submissions',
  emailRecipient: 'lifetimeworld@gmail.com',
  emailSubject: 'Weekly Contact Form Submissions - Lifetime Mind Management',
  // Service account credentials would be stored securely on the server
  credentials: {
    // Your Google service account credentials would go here
  }
};

// Main function to run weekly
async function sendWeeklyReport() {
  try {
    // Get date range for the past week
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Format dates for logging
    const fromDate = lastWeek.toISOString().split('T')[0];
    const toDate = today.toISOString().split('T')[0];
    
    console.log(`Generating weekly report from ${fromDate} to ${toDate}`);
    
    // Get submissions from Google Sheets
    const submissions = await getSubmissionsForDateRange(lastWeek, today);
    
    // If no submissions, send empty report
    if (submissions.length === 0) {
      console.log('No submissions found for the past week');
      await sendEmail(`No new contact form submissions for the week of ${fromDate} to ${toDate}.`);
      return;
    }
    
    // Generate HTML for email
    const emailHtml = generateEmailHtml(submissions, fromDate, toDate);
    
    // Send email
    await sendEmail(emailHtml);
    
    console.log(`Weekly report sent successfully to ${CONFIG.emailRecipient}`);
  } catch (error) {
    console.error('Error sending weekly report:', error);
  }
}

// Get submissions from Google Sheets for a date range
async function getSubmissionsForDateRange(startDate, endDate) {
  try {
    // Authenticate with Google Sheets API
    const auth = await authenticate();
    
    // Get all submissions from the sheet
    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: CONFIG.sheetId,
      range: `${CONFIG.sheetName}!A:G`, // Adjust range as needed
    });
    
    const rows = response.data.values || [];
    
    // Skip header row and filter by date
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    
    // Filter submissions by date (assuming timestamp is in column G)
    return rows.slice(1).filter(row => {
      const submissionDate = new Date(row[6]); // Timestamp column
      const submissionTime = submissionDate.getTime();
      return submissionTime >= startTimestamp && submissionTime <= endTimestamp;
    }).map(row => ({
      firstName: row[0],
      lastName: row[1],
      email: row[2],
      phone: row[3],
      service: row[4],
      message: row[5],
      timestamp: row[6]
    }));
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return [];
  }
}

// Authenticate with Google Sheets API
async function authenticate() {
  const auth = new google.auth.GoogleAuth({
    credentials: CONFIG.credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  });
  
  return await auth.getClient();
}

// Generate HTML for email
function generateEmailHtml(submissions, fromDate, toDate) {
  // Create HTML table with submissions
  const tableRows = submissions.map(sub => `
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">${sub.firstName} ${sub.lastName}</td>
      <td style="border: 1px solid #ddd; padding: 8px;">${sub.email}</td>
      <td style="border: 1px solid #ddd; padding: 8px;">${sub.phone || 'N/A'}</td>
      <td style="border: 1px solid #ddd; padding: 8px;">${sub.service || 'N/A'}</td>
      <td style="border: 1px solid #ddd; padding: 8px;">${new Date(sub.timestamp).toLocaleString()}</td>
    </tr>
  `).join('');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #0066cc;
          color: white;
        }
        tr:nth-child(even) {
          background-color: #f2f2f2;
        }
      </style>
    </head>
    <body>
      <h2>Weekly Contact Form Submissions</h2>
      <p>Period: ${fromDate} to ${toDate}</p>
      <p>Total submissions: ${submissions.length}</p>
      
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Service</th>
          <th>Submission Time</th>
        </tr>
        ${tableRows}
      </table>
      
      <h3>Message Details</h3>
      ${submissions.map((sub, index) => `
        <div style="margin-bottom: 20px; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
          <p><strong>Submission #${index + 1} - ${sub.firstName} ${sub.lastName}</strong></p>
          <p><strong>Message:</strong> ${sub.message}</p>
        </div>
      `).join('')}
      
      <p>This is an automated email from Lifetime Mind Management website.</p>
    </body>
    </html>
  `;
}

// Send email using nodemailer
async function sendEmail(htmlContent) {
  // Create a transporter (configure with your email service)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // Replace with your email
      pass: 'your-app-password' // Replace with your app password
    }
  });
  
  // Email options
  const mailOptions = {
    from: 'Lifetime Mind Management <your-email@gmail.com>',
    to: CONFIG.emailRecipient,
    subject: CONFIG.emailSubject,
    html: htmlContent
  };
  
  // Send email
  return transporter.sendMail(mailOptions);
}

// Execute the script
sendWeeklyReport().catch(console.error);

// In a real implementation, this script would be scheduled to run weekly
// using a cron job or a scheduling service like:
// 
// Linux/Unix cron: 0 9 * * MON node /path/to/weekly-email-service.js
// Windows Task Scheduler: powershell -Command "node C:\path\to\weekly-email-service.js"
// Cloud services: AWS Lambda + EventBridge, Google Cloud Functions + Cloud Scheduler, etc.