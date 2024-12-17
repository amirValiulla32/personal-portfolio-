// Typing effect for the tagline
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Scroll reveal animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

// Skill bars animation
function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(level => {
        const width = level.style.width;
        level.style.width = '0';
        setTimeout(() => {
            level.style.width = width;
        }, 200);
    });
}

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// Enhanced Form Validation
function validateForm(form) {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Clear previous errors
    form.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });

    // Validate Name
    const nameInput = form.querySelector('#name');
    if (nameInput.value.trim().length < 2) {
        showError(nameInput, 'Name must be at least 2 characters');
        isValid = false;
    }

    // Validate Email
    const emailInput = form.querySelector('#email');
    if (!emailRegex.test(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate Message
    const messageInput = form.querySelector('#message');
    if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
    }

    return isValid;
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    
    let errorMessage = formGroup.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        formGroup.appendChild(errorMessage);
    }
    errorMessage.textContent = message;
}

// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    // Typing effect on page load
    const tagline = document.querySelector('.tagline');
    if (tagline) {
        typeWriter(tagline, tagline.textContent);
    }

    // Scroll animations
    window.addEventListener('scroll', revealOnScroll);
    
    // Initialize skill bars animation if on skills page
    if (document.querySelector('.skills-grid')) {
        animateSkillBars();
    }

    // Form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                const button = this.querySelector('button');
                const loader = button.querySelector('.button-loader');
                const buttonText = button.querySelector('.button-text');
                
                // Show loading state
                button.classList.add('loading');
                loader.style.display = 'inline-block';
                buttonText.textContent = 'Sending...';
                
                // Simulate form submission
                setTimeout(() => {
                    button.classList.remove('loading');
                    loader.style.display = 'none';
                    buttonText.textContent = 'Message Sent!';
                    button.classList.add('success');
                    
                    // Reset form
                    setTimeout(() => {
                        this.reset();
                        buttonText.textContent = 'Send Message';
                        button.classList.remove('success');
                    }, 3000);
                }, 2000);
            }
        });
    }

    initScrollProgress();
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add scroll-to-top functionality
const scrollButton = document.createElement('div');
scrollButton.className = 'scroll-to-top';
scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}); 