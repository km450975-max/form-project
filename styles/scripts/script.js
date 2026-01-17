// DOM Elements
const form = document.getElementById('userForm');
const commentsTextarea = document.getElementById('comments');
const charCountElement = document.getElementById('charCount');
const successMessage = document.getElementById('successMessage');
const closeMessageButton = document.getElementById('closeMessage');

// Character counter for comments textarea
commentsTextarea.addEventListener('input', function() {
    const currentLength = this.value.length;
    charCountElement.textContent = currentLength;
    
    // Change color when approaching limit
    if (currentLength > 450) {
        charCountElement.style.color = '#e53e3e';
    } else if (currentLength > 400) {
        charCountElement.style.color = '#dd6b20';
    } else {
        charCountElement.style.color = '#4a5568';
    }
    
    // Limit to 500 characters
    if (currentLength > 500) {
        this.value = this.value.substring(0, 500);
        charCountElement.textContent = 500;
    }
});

// Form submission handler
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Basic form validation
    const nameInput = document.getElementById('name');
    const genderSelected = document.querySelector('input[name="gender"]:checked');
    const hobbiesSelected = document.querySelectorAll('input[name="hobbies"]:checked');
    
    let isValid = true;
    
    // Validate name
    if (!nameInput.value.trim()) {
        showError(nameInput, 'Please enter your name');
        isValid = false;
    } else {
        clearError(nameInput);
    }
    
    // Validate gender
    if (!genderSelected) {
        const genderLabel = document.querySelector('label[for="male"]').closest('.form-group');
        showError(genderLabel, 'Please select a gender');
        isValid = false;
    } else {
        const genderLabel = document.querySelector('label[for="male"]').closest('.form-group');
        clearError(genderLabel);
    }
    
    // If valid, show success message
    if (isValid) {
        // Get form data for demonstration
        const formData = {
            name: nameInput.value.trim(),
            gender: genderSelected.value,
            hobbies: Array.from(hobbiesSelected).map(cb => cb.value),
            comments: commentsTextarea.value.trim()
        };
        
        // Log form data to console (in real app, you would send to server)
        console.log('Form submitted with data:', formData);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        setTimeout(() => {
            form.reset();
            charCountElement.textContent = '0';
            charCountElement.style.color = '#4a5568';
        }, 100);
    }
});

// Form reset handler
form.addEventListener('reset', function() {
    // Clear all error states
    clearAllErrors();
    charCountElement.textContent = '0';
    charCountElement.style.color = '#4a5568';
});

// Close success message
closeMessageButton.addEventListener('click', function() {
    successMessage.classList.add('hidden');
});

// Error handling functions
function showError(element, message) {
    // Remove any existing error first
    clearError(element);
    
    // Add error class
    element.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = '#e53e3e';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '5px';
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    // Insert error message after the input
    if (element.type === 'text' || element.tagName === 'TEXTAREA') {
        element.parentNode.insertBefore(errorElement, element.nextSibling);
    } else {
        element.appendChild(errorElement);
    }
}

function clearError(element) {
    element.classList.remove('error');
    const existingError = element.parentNode.querySelector('.error-message') || 
                         element.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function clearAllErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
    
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => element.classList.remove('error'));
}

function showSuccessMessage() {
    successMessage.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (!successMessage.classList.contains('hidden')) {
            successMessage.classList.add('hidden');
        }
    }, 5000);
}

// Add real-time validation for name field
const nameInput = document.getElementById('name');
nameInput.addEventListener('blur', function() {
    if (this.value.trim() && this.value.length < 2) {
        showError(this, 'Name must be at least 2 characters long');
    } else if (this.value.trim()) {
        clearError(this);
    }
});

// Add hover effects to form elements
document.querySelectorAll('.radio-option, .checkbox-option').forEach(option => {
    option.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    option.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Initialize character counter on page load
window.addEventListener('DOMContentLoaded', () => {
    charCountElement.textContent = commentsTextarea.value.length;
});