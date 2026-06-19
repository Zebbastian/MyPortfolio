// ===== CONTACT FORM =====
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const messageDiv = document.getElementById('formMessage');
    
    if (form && messageDiv) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject')?.value.trim() || 'No subject';
            const message = document.getElementById('message').value.trim();
            
            // Validate
            if (!name || !email || !message) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show success (in production, this would send to a server)
            showMessage(`Thank you ${name}! Your message has been sent. I'll get back to you soon.`, 'success');
            
            // Reset form
            form.reset();
            
            // Log to console (for debugging)
            console.log('Form submitted:', { name, email, subject, message });
        });
    }
});

function showMessage(text, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.innerHTML = `<p class="form-${type}">${text}</p>`;
    messageDiv.style.display = 'block';
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}