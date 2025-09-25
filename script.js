
// script.js

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initPage();
});

// Initialize page functionality
function initPage() {
    // Smooth scrolling for anchor links
    setupSmoothScrolling();
    
    // Mobile menu functionality
    setupMobileMenu();
    
    // Header background on scroll
    setupHeaderScroll();
    
    // Animation on scroll
    setupScrollAnimations();
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const authButtons = document.querySelector('.auth-buttons');
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn i');
                
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    authButtons.classList.remove('active');
                    mobileMenuBtn.classList.remove('fa-times');
                    mobileMenuBtn.classList.add('fa-bars');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    const menuIcon = mobileMenuBtn.querySelector('i');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        authButtons.classList.toggle('active');
        
        // Toggle menu icon
        if (menuIcon.classList.contains('fa-bars')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
}

// Header background on scroll
function setupHeaderScroll() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'white';
            header.style.backdropFilter = 'none';
        }
    });
}

// Animation on scroll
function setupScrollAnimations() {
    // Create Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.feature-card, .step, .testimonial-card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Add animation class to CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .feature-card, .step, .testimonial-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .feature-card.animate-in, .step.animate-in, .testimonial-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .feature-card:nth-child(1) { transition-delay: 0.1s; }
    .feature-card:nth-child(2) { transition-delay: 0.2s; }
    .feature-card:nth-child(3) { transition-delay: 0.3s; }
    
    .step:nth-child(1) { transition-delay: 0.1s; }
    .step:nth-child(2) { transition-delay: 0.2s; }
    .step:nth-child(3) { transition-delay: 0.3s; }
    
    .testimonial-card:nth-child(1) { transition-delay: 0.1s; }
    .testimonial-card:nth-child(2) { transition-delay: 0.2s; }
    .testimonial-card:nth-child(3) { transition-delay: 0.3s; }
`;
document.head.appendChild(style);
