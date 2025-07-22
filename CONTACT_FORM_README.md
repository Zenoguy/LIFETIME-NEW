# Contact Form System for Lifetime Mind Management

Setup Required:
To fully implement this solution, you'll need to:

Create a Google Sheet and get its ID

Set up Google API credentials

Configure the email service in the weekly email script

Set up a weekly scheduled task on a server to run the email script

The detailed setup instructions are provided in the CONTACT_FORM_README.md file.

This document explains how the contact form submission system works and how to set it up.

## Overview

The system collects contact form submissions from the website, stores them in a Google Sheet, and sends a weekly email report to `sambhranta1123@gmail.com` containing all submissions from the past week.

## Components

1. **Client-side Form Handler** (`form-handler.js`)
   - Captures form submissions
   - Validates form data
   - Stores submissions in local storage as backup
   - Sends data to Google Sheets
   - Shows success/error notifications to users

2. **Server-side Weekly Email Service** (`weekly-email-service.js`)
   - Runs on a schedule (once per week)
   - Retrieves submissions from Google Sheets
   - Generates an HTML email report
   - Sends the report to `sambhranta1123@gmail.com`

## Setup Instructions

### 1. Google Sheets Setup

1. Create a new Google Sheet
2. Rename the first sheet to "Contact Form Submissions"
3. Add the following headers in row 1:
   - First Name
   - Last Name
   - Email
   - Phone
   - Service
   - Message
   - Timestamp

4. Get the Google Sheet ID from the URL:
   - Example URL: `https://docs.google.com/spreadsheets/d/1ABC123DEF456GHI789JKL/edit`
   - Sheet ID: `1ABC123DEF456GHI789JKL`

5. Update the `SHEET_ID` in `form-handler.js` with your Sheet ID

### 2. Google API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google Sheets API
4. Create service account credentials
5. Download the credentials JSON file
6. Share your Google Sheet with the service account email

### 3. Server Setup for Weekly Emails

1. Install Node.js on your server
2. Install required packages:
   ```
   npm install googleapis nodemailer
   ```
3. Update the `weekly-email-service.js` file:
   - Add your Google Sheet ID
   - Add your service account credentials
   - Configure the email sender (update with your email service details)

4. Set up a weekly cron job:
   - Linux/Unix: `0 9 * * MON node /path/to/weekly-email-service.js`
   - Windows Task Scheduler: Create a task that runs weekly

## Testing

1. Submit a test form on the website
2. Check the browser console to verify the submission was processed
3. Check your Google Sheet to confirm the data was added
4. Run the weekly email script manually to test:
   ```
   node weekly-email-service.js
   ```
5. Check the recipient email to confirm receipt of the report

## Troubleshooting

- **Form submissions not appearing in Google Sheet:**
  - Check browser console for errors
  - Verify Google Sheet permissions
  - Check service account credentials

- **Weekly emails not being sent:**
  - Check server logs
  - Verify email service configuration
  - Check cron job/scheduled task is running

## Security Considerations

- The Google service account credentials should be kept secure
- Email configuration should use environment variables, not hardcoded values
- Consider implementing rate limiting to prevent form spam

## Data Retention

Form submissions are stored indefinitely in the Google Sheet. Consider implementing a data retention policy to periodically clean up old submissions if needed.

---

For any questions or issues, please contact the website administrator.