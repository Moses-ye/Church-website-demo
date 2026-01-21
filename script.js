// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Update active link
        document.querySelectorAll('.nav-menu a').forEach(item => {
            item.classList.remove('active');
        });
        link.classList.add('active');
    });
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <strong>Thank you, ${name}!</strong> Your message has been sent successfully. We'll get back to you at ${email} soon.
        </div>
    `;
    
    // Insert success message
    this.parentNode.insertBefore(successMsg, this.nextSibling);
    
    // Reset form
    this.reset();
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMsg.remove();
    }, 5000);
});

// Newsletter Signup Form
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    
    // Show confirmation message
    const confirmation = document.createElement('p');
    confirmation.className = 'newsletter-confirmation';
    confirmation.style.cssText = 'color: #28a745; font-weight: 600; margin-top: 10px;';
    confirmation.textContent = `Thank you! You've been subscribed with ${email}.`;
    
    // Check if there's already a confirmation message
    const existingConfirmation = this.querySelector('.newsletter-confirmation');
    if (existingConfirmation) {
        existingConfirmation.remove();
    }
    
    // Add confirmation message
    this.appendChild(confirmation);
    
    // Clear the form
    this.reset();
    
    // Remove confirmation after 5 seconds
    setTimeout(() => {
        confirmation.remove();
    }, 5000);
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
    
    // Update active navigation link based on scroll position
    updateActiveNavLink();
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            // Calculate offset for fixed header
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active navigation link
            document.querySelectorAll('.nav-menu a').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const headerHeight = document.querySelector('header').offsetHeight;
        
        if (window.scrollY >= (sectionTop - headerHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Initialize with home link active
document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.querySelector('.nav-menu a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
    
    // Add current year to footer if needed
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('footer .footer-bottom p');
    if (yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
});

// Service time update function
function updateServiceTimes() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const currentHour = now.getHours();
    
    // Highlight current/next service if it's Sunday
    if (dayOfWeek === 0) {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.classList.remove('service-highlight');
        });
        
        // Determine which service to highlight
        if (currentHour < 8) {
            // Before first service
            serviceCards[0].classList.add('service-highlight');
        } else if (currentHour >= 8 && currentHour < 10) {
            // During first service
            serviceCards[0].classList.add('service-highlight');
        } else if (currentHour >= 10 && currentHour < 12) {
            // During main service
            serviceCards[1].classList.add('service-highlight');
        } else if (currentHour >= 12 && currentHour < 17) {
            // Between main and evening service
            serviceCards[2].classList.add('service-highlight');
        } else if (currentHour >= 17 && currentHour < 19) {
            // During evening service
            serviceCards[2].classList.add('service-highlight');
        } else {
            // After evening service
            serviceCards[0].classList.remove('service-highlight');
            serviceCards[1].classList.remove('service-highlight');
            serviceCards[2].classList.remove('service-highlight');
        }
    }
}

// Call service time update on page load
updateServiceTimes();

// Update service times every minute
setInterval(updateServiceTimes, 60000);
