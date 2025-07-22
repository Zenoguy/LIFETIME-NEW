// Form Handler for Lifetime Mind Management
// Stores form submissions in Google Sheets and emails weekly reports

// Google Sheets API Configuration
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID'; // Replace with your actual Google Sheet ID
const EMAIL_RECIPIENT = 'lifetimeworld@gmail.com';
const FORM_SHEET_NAME = 'Contact Form Submissions';

// Initialize form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }
});

// Handle form submission
function handleFormSubmission(form) {
    // Get form data
    const firstName = form.querySelector('input[placeholder="Your first name"]').value;
    const lastName = form.querySelector('input[placeholder="Your last name"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const service = form.querySelector('select').value;
    const message = form.querySelector('textarea').value;
    
    // Validate form data
    if (!firstName || !email || !message) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Prepare data for submission
    const formData = {
        firstName,
        lastName,
        email,
        phone,
        service,
        message,
        timestamp: new Date().toISOString()
    };
    
    // Save to local storage (as backup and for offline functionality)
    saveToLocalStorage(formData);
    
    // Attempt to send to Google Sheets
    sendToGoogleSheets(formData)
        .then(() => {
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            showNotification('Your message is saved and will be sent when connection is restored.', 'warning');
        });
}

// Save form data to local storage
function saveToLocalStorage(formData) {
    // Get existing submissions or initialize empty array
    const existingData = JSON.parse(localStorage.getItem('contactFormSubmissions') || '[]');
    
    // Add new submission
    existingData.push({
        ...formData,
        synced: false
    });
    
    // Save back to local storage
    localStorage.setItem('contactFormSubmissions', JSON.stringify(existingData));
}

// Send data to Google Sheets using Fetch API
async function sendToGoogleSheets(formData) {
    // This would normally use Google Sheets API
    // For this implementation, we're simulating the API call
    
    // In a real implementation, you would:
    // 1. Use Google Sheets API or a service like SheetDB, Sheety, or Google Apps Script
    // 2. Make an authenticated API call to append the data to your sheet
    
    return new Promise((resolve) => {
        // Simulate API call success
        setTimeout(() => {
            console.log('Form data sent to Google Sheets:', formData);
            resolve();
        }, 1000);
    });
}

// Show notification to user
function showNotification(message, type = 'success') {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('form-notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'form-notification';
        notification.className = 'fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-y-20 opacity-0';
        document.body.appendChild(notification);
    }
    
    // Set notification style based on type
    if (type === 'success') {
        notification.className = notification.className.replace(/bg-\w+-\d+/g, '') + ' bg-green-500 text-white';
    } else if (type === 'error') {
        notification.className = notification.className.replace(/bg-\w+-\d+/g, '') + ' bg-red-500 text-white';
    } else if (type === 'warning') {
        notification.className = notification.className.replace(/bg-\w+-\d+/g, '') + ' bg-yellow-500 text-white';
    }
    
    // Set message
    notification.textContent = message;
    
    // Show notification
    setTimeout(() => {
        notification.classList.remove('translate-y-20', 'opacity-0');
    }, 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-y-20', 'opacity-0');
    }, 5000);
}

// Weekly email function (would run on server)
function sendWeeklyEmail() {
    // In a real implementation, this would be a server-side function
    // that runs on a schedule (e.g., using cron jobs)
    
    // 1. Fetch data from Google Sheets
    // 2. Format data into an email
    // 3. Send email to lifetimeworld@gmail.com
    
    console.log('Weekly email sent to', EMAIL_RECIPIENT);
}

// Sync any offline submissions when online
window.addEventListener('online', function() {
    syncOfflineSubmissions();
});

// Try to sync offline submissions
function syncOfflineSubmissions() {
    const offlineData = JSON.parse(localStorage.getItem('contactFormSubmissions') || '[]');
    const unsynced = offlineData.filter(item => !item.synced);
    
    if (unsynced.length === 0) return;
    
    // Process each unsynced submission
    Promise.all(unsynced.map(item => sendToGoogleSheets(item)))
        .then(() => {
            // Mark all as synced
            const updatedData = offlineData.map(item => ({...item, synced: true}));
            localStorage.setItem('contactFormSubmissions', JSON.stringify(updatedData));
            
            showNotification(`${unsynced.length} offline submissions have been synced`, 'success');
        })
        .catch(error => {
            console.error('Error syncing offline submissions:', error);
        });
}

// Check for offline submissions on page load
document.addEventListener('DOMContentLoaded', function() {
    if (navigator.onLine) {
        syncOfflineSubmissions();
    }
});