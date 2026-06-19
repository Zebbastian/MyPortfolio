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
            
            // Show success message
            showMessage(`✅ Thank you ${name}! Your message has been sent. I'll get back to you soon.`, 'success');
            
            // Reset form
            form.reset();
            
            // Log to console (for debugging)
            console.log('Form submitted:', { name, email, subject, message });
        });
    }
});

function showMessage(text, type) {
    const messageDiv = document.getElementById('formMessage');
    const isSuccess = type === 'success';
    
    messageDiv.innerHTML = `
        <div class="form-${type}" style="
            padding: 15px 20px;
            border-radius: 8px;
            margin-top: 1rem;
            background: ${isSuccess ? '#d4edda' : '#f8d7da'};
            color: ${isSuccess ? '#155724' : '#721c24'};
            border: 1px solid ${isSuccess ? '#c3e6cb' : '#f5c6cb'};
        ">
            ${text}
        </div>
    `;
    
    messageDiv.style.display = 'block';
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}