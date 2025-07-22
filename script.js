// Global Variables
let currentTestimonial = 0;
let currentLightboxImage = 0;
let testimonialInterval;

// Testimonials Data
const testimonials = [
    {
        name: "Priya Sharma",
        position: "Business Owner, TechStart Solutions",
        avatar: "PS",
        rating: 5,
        text: "LIFETIME's financial planning services transformed our business. Their expert guidance on mutual funds and tax planning helped us save significantly while growing our investments. Highly recommended!"
    },
    {
        name: "Rajesh Kumar",
        position: "HR Manager, Global Industries",
        avatar: "RK",
        rating: 5,
        text: "The corporate training programs provided by LIFETIME are exceptional. Our team's productivity increased by 40% after their professional development sessions. Outstanding service!"
    },
    {
        name: "Anita Desai",
        position: "Marketing Executive, Creative Agency",
        avatar: "AD",
        rating: 5,
        text: "Their digital marketing training course was comprehensive and practical. I learned cutting-edge strategies that immediately improved our campaign results. Worth every penny!"
    },
    {
        name: "Vikram Singh",
        position: "Entrepreneur, StartUp Ventures",
        avatar: "VS",
        rating: 5,
        text: "From LIC policies to investment planning, LIFETIME provided end-to-end financial solutions. Their personalized approach and expert advice helped secure my family's future."
    },
    {
        name: "Meera Patel",
        position: "IT Professional, Tech Solutions",
        avatar: "MP",
        rating: 5,
        text: "The career development program helped me transition to a leadership role. The mentorship and skill development sessions were incredibly valuable for my professional growth."
    },
    {
        name: "Amit Gupta",
        position: "Finance Director, Manufacturing Corp",
        avatar: "AG",
        rating: 5,
        text: "LIFETIME's investment awareness programs educated our entire finance team about market dynamics. Their practical approach to financial education is commendable."
    }
];

// Gallery Images Data
const galleryImages = [
    {
        src: "assets/gallery1.jpg",
        title: "Education Training Session",
        description: "Professional development workshop in progress"
    },
    {
        src: "assets/LITIME MindManagement.jpg",
        title: "Mind Management Seminar",
        description: "Investment awareness program for clients"
    },
    {
        src: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
        title: "Team Collaboration",
        description: "Our expert team working together"
    },
    {
        src: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
        title: "Client Consultation",
        description: "One-on-one financial advisory session"
    },
    {
        src: "https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg",
        title: "Digital Marketing Workshop",
        description: "Online marketing strategies training"
    },
    {
        src: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
        title: "Professional Development",
        description: "Skills enhancement program"
    },
    {
        src: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg",
        title: "Investment Analysis",
        description: "Market research and analysis session"
    },
    {
        src: "https://images.pexels.com/photos/3184425/pexels-photo-3184425.jpeg",
        title: "Educational Training",
        description: "Academic and vocational training programs"
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeHeader();
    initializeTestimonials();
    initializeContactForm();
    initializeBackToTop();
    initializeMobileMenu();
    initializeSmoothScrolling();
});

// Header Scroll Effect
function initializeHeader() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            header.style.padding = '15px 0';
        }
    });
}

// Mobile Menu Toggle
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const menuIcon = document.getElementById('menuIcon');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            menuIcon.className = 'fas fa-times';
        } else {
            menuIcon.className = 'fas fa-bars';
        }
    });
    
    // Close menu when clicking on a link
    navLinks.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-link')) {
            navLinks.classList.remove('active');
            menuIcon.className = 'fas fa-bars';
        }
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll to Section Function
function scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Services Toggle
function toggleService(serviceIndex) {
    const serviceDetails = document.getElementById(`service-${serviceIndex}`);
    const toggleButton = document.querySelector(`[data-service="${serviceIndex}"] .service-toggle i`);
    
    if (serviceDetails.classList.contains('active')) {
        serviceDetails.classList.remove('active');
        toggleButton.className = 'fas fa-plus';
    } else {
        // Close all other services
        document.querySelectorAll('.service-details').forEach(detail => {
            detail.classList.remove('active');
        });
        document.querySelectorAll('.service-toggle i').forEach(icon => {
            icon.className = 'fas fa-plus';
        });
        
        // Open clicked service
        serviceDetails.classList.add('active');
        toggleButton.className = 'fas fa-minus';
    }
}

// Gallery Lightbox
function openLightbox(imageIndex) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    
    currentLightboxImage = imageIndex;
    lightboxImage.src = galleryImages[imageIndex].src;
    lightboxImage.alt = galleryImages[imageIndex].title;
    lightbox.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

function nextImage() {
    currentLightboxImage = (currentLightboxImage + 1) % galleryImages.length;
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.src = galleryImages[currentLightboxImage].src;
    lightboxImage.alt = galleryImages[currentLightboxImage].title;
}

function prevImage() {
    currentLightboxImage = currentLightboxImage === 0 ? galleryImages.length - 1 : currentLightboxImage - 1;
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.src = galleryImages[currentLightboxImage].src;
    lightboxImage.alt = galleryImages[currentLightboxImage].title;
}

// Close lightbox on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Close lightbox on background click
document.getElementById('lightbox')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Testimonials Carousel
function initializeTestimonials() {
    updateTestimonial();
    startTestimonialAutoplay();
}

function updateTestimonial() {
    const testimonial = testimonials[currentTestimonial];
    
    document.getElementById('testimonialText').textContent = testimonial.text;
    document.getElementById('testimonialName').textContent = testimonial.name;
    document.getElementById('testimonialPosition').textContent = testimonial.position;
    document.getElementById('testimonialAvatar').textContent = testimonial.avatar;
    
    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonial);
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial();
    resetTestimonialAutoplay();
}

function prevTestimonial() {
    currentTestimonial = currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1;
    updateTestimonial();
    resetTestimonialAutoplay();
}

function currentTestimonial(index) {
    currentTestimonial = index;
    updateTestimonial();
    resetTestimonialAutoplay();
}

function startTestimonialAutoplay() {
    testimonialInterval = setInterval(() => {
        nextTestimonial();
    }, 5000);
}

function resetTestimonialAutoplay() {
    clearInterval(testimonialInterval);
    startTestimonialAutoplay();
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        const formData = new FormData(contactForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        
        // Hide form and show success message
        contactForm.style.display = 'none';
        successMessage.classList.add('active');
        
        // Reset after 3 seconds
        setTimeout(() => {
            contactForm.style.display = 'block';
            successMessage.classList.remove('active');
            contactForm.reset();
        }, 3000);
        
        console.log('Form submitted:', data);
    });
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Intersection Observer for Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .achievement-item, .client-item, .gallery-item, .timeline-item, .mission-card, .vision-card, .founder-profile').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAnimations);

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add loading animation for images
function addImageLoadingAnimation() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });
}

// Initialize image loading animation
document.addEventListener('DOMContentLoaded', addImageLoadingAnimation);

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#e5e7eb';
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.style.borderColor = '#ef4444';
                isValid = false;
            }
        }
        
        // Phone validation
        if (input.type === 'tel' && input.value) {
            const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(input.value)) {
                input.style.borderColor = '#ef4444';
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Add real-time form validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateForm(form);
            });
            
            input.addEventListener('input', function() {
                this.style.borderColor = '#e5e7eb';
            });
        });
    }
});

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// Add smooth scrolling for all internal links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Add keyboard navigation for testimonials
document.addEventListener('keydown', function(e) {
    if (e.target.closest('.testimonial-carousel')) {
        if (e.key === 'ArrowLeft') {
            prevTestimonial();
        } else if (e.key === 'ArrowRight') {
            nextTestimonial();
        }
    }
});

// Add touch/swipe support for testimonials on mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    if (e.target.closest('.testimonial-carousel')) {
        touchStartX = e.changedTouches[0].screenX;
    }
});

document.addEventListener('touchend', function(e) {
    if (e.target.closest('.testimonial-carousel')) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            prevTestimonial();
        } else {
            nextTestimonial();
        }
    }
}

// Add error handling for failed image loads
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.warn('Failed to load image:', e.target.src);
    }
}, true);

// Console welcome message
console.log('%c🌟 Welcome to LIFETIME Professional Services! 🌟', 'font-size: 16px; color: #fbbf24; font-weight: bold;');
console.log('%cFor any technical support, contact: lifetimeworld07@gmail.com', 'font-size: 12px; color: #1e40af;');
