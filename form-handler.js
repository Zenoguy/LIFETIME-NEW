// Form handler for Lifetime website with Google Sheets integration
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    // Replace with your Google Apps Script Web App URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbw-I1Qw9GMvxh3Ye8Z_FKEPhWfz3LFeOkfKkiXKnP0apelMpk0ualoMlKrI629DCNxF/exec';
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formDataObj = {};
            
            // Convert FormData to object for loggingwill th
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Add timestamp
            formData.append('timestamp', new Date().toISOString());
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            
            // Send data to Google Sheets
            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => {
                    if (response.ok) {
                        console.log('Data stored successfully:', formDataObj);
                        
                        // Show success message
                        submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
                        submitBtn.style.background = '#10b981';
                        
                        // Reset form after delay
                        setTimeout(() => {
                            submitBtn.innerHTML = originalText;
                            submitBtn.style.background = '';
                            submitBtn.disabled = false;
                            contactForm.reset();
                        }, 3000);
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    
                    // Show error message
                    submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i>Error!';
                    submitBtn.style.background = '#ef4444';
                    
                    // Reset button after delay
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                });
        });
    }
});