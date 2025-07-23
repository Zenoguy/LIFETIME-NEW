# Setting Up Email and Google Sheets Integration

This document explains how to set up the contact form to store submissions in Google Sheets and send weekly email reports.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Rename the spreadsheet to "Lifetime Contact Form Responses"

## Step 2: Set Up Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any code in the editor
3. Copy the entire code from `Apps_script_edit.js` in this project
4. Paste it into the Apps Script editor
5. Update the `EMAIL_RECIPIENTS` variable with the email addresses that should receive weekly reports
6. Click **Save** and name the project "Lifetime Form Handler"

## Step 3: Test the Script

1. In the Apps Script editor, select the `testScript` function from the dropdown
2. Click the **Run** button
3. Authorize the script when prompted
4. Check your spreadsheet - a new sheet named "Form Responses" should be created with a test entry
5. If you see any errors, check the Execution log in the Apps Script editor

## Step 4: Deploy the Web App

1. In the Apps Script editor, click **Deploy > New deployment**
2. Select **Web app** as the deployment type
3. Set the following options:
   - Description: "Lifetime Form Handler"
   - Execute as: "Me" (your Google account)
   - Who has access: "Anyone"
4. Click **Deploy**
5. Copy the Web App URL that appears after deployment

## Step 5: Update the Form Handler

1. Open `form-handler.js` in this project
2. Replace the placeholder URL in this line:
   ```javascript
   const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec';
   ```
3. Paste the Web App URL you copied in Step 4

## Step 6: Set Up Weekly Email Reports

1. Go back to the Google Apps Script editor
2. Run the `createWeeklyTrigger` function manually:
   - Select `createWeeklyTrigger` from the function dropdown
   - Click the **Run** button
3. This will create a trigger that sends weekly email reports every Monday at 8:00 AM

## Testing the Integration

1. Fill out and submit the contact form on your website
2. Check the Google Sheet to verify that the data was stored correctly
3. To test the email functionality, run the `sendWeeklyEmail` function in the Apps Script editor

## Troubleshooting

- If you get errors when running functions, try the simplified script version
- Make sure you've authorized all required permissions
- Check that the Web App URL in `form-handler.js` is correct
- Verify the form field names match what the script expects

## Security Notes

- This is a client-side submission to Google Sheets, suitable for moderate security needs
- For higher security, consider a server-side solution
- Don't store highly sensitive information in the sheet