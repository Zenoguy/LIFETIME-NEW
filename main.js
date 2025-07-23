// Consolidated main JavaScript file for Lifetime website

// Immediately fix service card icons
(function() {
    function fixServiceIcons() {
        const serviceIcons = document.querySelectorAll('.service-card div.w-16');
        if (serviceIcons.length > 0) {
            serviceIcons.forEach(icon => {
                icon.style.opacity = '1';
                icon.style.visibility = 'visible';
                icon.style.transform = 'none';
                icon.style.display = 'flex';
            });
        }
    }
    
    // Run immediately
    fixServiceIcons();
    
    // Also run when DOM is loaded
    document.addEventListener('DOMContentLoaded', fixServiceIcons);
    
    // Run again after a short delay
    setTimeout(fixServiceIcons, 100);
})();

// Configuration
const config = {
    duration: {
        fast: 0.5,
        normal: 0.8,
        slow: 1.2
    },
    ease: {
        smooth: "power2.out",
        bounce: "back.out(1.7)",
        elastic: "elastic.out(1, 0.5)"
    }
};

// Utility Functions
const utils = {
    // Simple fade in from direction
    fadeIn(elements, direction = "y", distance = 50, options = {}) {
        const defaults = {
            opacity: 0,
            duration: config.duration.normal,
            ease: config.ease.smooth,
            [direction]: distance
        };
        
        return gsap.from(elements, { ...defaults, ...options });
    },

    // Enhanced scroll triggered animation
    scrollTriggerFade(elements, triggerElement, options = {}) {
        return gsap.from(elements, {
            opacity: 0,
            y: 50,
            duration: config.duration.normal,
            ease: "power3.out",
            scrollTrigger: {
                trigger: triggerElement,
                start: "top 85%",
                end: "top 35%",
                toggleActions: "play none none reverse",
                scrub: options.scrub || false,
                markers: false
            },
            ...options
        });
    },

    // Stagger animation
    staggerFade(elements, options = {}) {
        return gsap.from(elements, {
            opacity: 0,
            y: 30,
            duration: config.duration.fast,
            ease: config.ease.smooth,
            stagger: 0.1,
            ...options
        });
    }
};

// Register GSAP plugins
document.addEventListener('DOMContentLoaded', function() {
    // Register plugins if not already registered
    if (typeof gsap !== 'undefined') {
        if (typeof ScrollTrigger !== 'undefined' && !gsap.plugins.ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);
        }
        if (typeof ScrollToPlugin !== 'undefined' && !gsap.plugins.scrollTo) {
            gsap.registerPlugin(ScrollToPlugin);
        }
    }
    
    // Initialize all components
    initPageLoader();
    initScrollProgress();
    initMobileMenu();
    initAnimations();
    
    console.log('✨ Lifetime website initialized');
});

// Page Loading
function initPageLoader() {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;
    
    gsap.to(loader, {
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        onComplete: () => {
            loader.style.display = 'none';
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }
    });
}

// Scroll Progress
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const maxHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxHeight) * 100;
        progressBar.style.width = Math.min(progress, 100) + '%';
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        mobileMenu.classList.toggle('hidden');
        
        // Change icon based on menu state
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && 
            !mobileMenu.contains(e.target) && 
            !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars text-xl';
        }
    });
    
    // Header background on scroll
    gsap.to("#header", {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        scrollTrigger: {
            trigger: "body",
            start: "top -50px",
            scrub: true
        }
    });
}

// Main animations
function initAnimations() {
    // Fix service card icons again
    const serviceIcons = document.querySelectorAll('.service-card div.w-16');
    serviceIcons.forEach(icon => {
        icon.style.opacity = '1';
        icon.style.visibility = 'visible';
        icon.style.transform = 'none';
    });

    // Hero section animations
    const heroTl = gsap.timeline();
    
    heroTl
        .from("#home .text-secondary", { 
            opacity: 0, 
            y: 30, 
            duration: config.duration.normal,
            ease: config.ease.bounce 
        })
        .from("#home h1", { 
            opacity: 0, 
            y: 50, 
            duration: config.duration.slow,
            ease: config.ease.smooth 
        }, "-=0.3")
        .from("#home p", { 
            opacity: 0, 
            y: 30, 
            duration: config.duration.normal,
            ease: config.ease.smooth 
        }, "-=0.5")
        .from("#home .glass-effect", { 
            opacity: 0, 
            y: 40, 
            scale: 0.9,
            duration: config.duration.normal,
            ease: config.ease.smooth 
        }, "-=0.3")
        .from("#home .flex a", { 
            opacity: 0, 
            y: 30, 
            duration: config.duration.fast,
            stagger: 0.2,
            ease: config.ease.bounce 
        }, "-=0.2")
        .from("#home .grid > div", { 
            opacity: 0, 
            y: 20, 
            duration: config.duration.fast,
            stagger: 0.1,
            ease: config.ease.smooth 
        }, "-=0.3");

    // Hero visual element
    utils.fadeIn("#home .relative img", "scale", 0.8, {
        duration: config.duration.slow,
        ease: config.ease.smooth,
        delay: 0.5
    });

    // Section animations
    const sections = [
        { selector: "#about", trigger: "#about" },
        { selector: "#services", trigger: "#services" },
        { selector: "#branches", trigger: "#branches" },
        { selector: "#gallery", trigger: "#gallery" },
        { selector: "#contact", trigger: "#contact" }
    ];

    sections.forEach(({ selector, trigger }) => {
        // Section headers
        utils.scrollTriggerFade(`${selector} h2`, trigger, { y: 40 });
        utils.scrollTriggerFade(`${selector} .w-24`, trigger, { 
            width: 0, 
            y: 0, 
            delay: 0.2 
        });
        utils.scrollTriggerFade(`${selector} .text-xl`, trigger, { 
            y: 20, 
            delay: 0.4 
        });
    });

    // About section specific
    utils.scrollTriggerFade("#about .grid > div:first-child", "#about", { 
        x: -50, 
        delay: 0.3 
    });
    utils.scrollTriggerFade("#about .grid > div:last-child", "#about", { 
        x: 50, 
        delay: 0.5 
    });

    // Services cards with enhanced animation
    gsap.from(".service-card", {
        opacity: 0,
        y: 60,
        scale: 0.95,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.4)",
        scrollTrigger: {
            trigger: "#services",
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none reverse"
        },
        onComplete: () => {
            // Ensure service icons are visible after animation
            serviceIcons.forEach(icon => {
                icon.style.opacity = '1';
                icon.style.visibility = 'visible';
            });
        }
    });

    // Team cards
    utils.scrollTriggerFade(".team-card", "#team", {
        y: 40,
        scale: 0.9,
        stagger: 0.2,
        delay: 0.2
    });

    // Why Choose Us section
    utils.scrollTriggerFade("#why-choose-us .flex.items-start", "#why-choose-us", {
        x: -30,
        stagger: 0.2,
        delay: 0.3
    });
    
    utils.scrollTriggerFade("#why-choose-us .bg-white", "#why-choose-us", {
        scale: 0.95,
        delay: 0.4
    });

    // Branches stats and cards
    utils.scrollTriggerFade("#branches .grid:first-of-type > div", "#branches", {
        y: 40,
        stagger: 0.15,
        delay: 0.3
    });
    
    utils.scrollTriggerFade(".branch-card", "#branches", {
        y: 40,
        stagger: 0.2,
        delay: 0.6
    });

    // Gallery items
    utils.scrollTriggerFade(".gallery-item", "#gallery", {
        y: 40,
        scale: 0.9,
        stagger: 0.1,
        delay: 0.3
    });

    // Client section
    utils.scrollTriggerFade(".text-center.bg-white", ".py-20.bg-light", {
        y: 30,
        stagger: 0.15,
        delay: 0.3
    });

    // Contact section
    utils.scrollTriggerFade(".contact-info", "#contact", { 
        x: -50, 
        delay: 0.3 
    });
    utils.scrollTriggerFade(".contact-form-container", "#contact", { 
        x: 50, 
        delay: 0.5 
    });

    // Footer
    utils.scrollTriggerFade(".footer-section", "footer", {
        y: 30,
        stagger: 0.2
    });

    // Initialize interactive elements
    initInteractiveElements();
}

// Interactive elements
function initInteractiveElements() {
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        ScrollTrigger.create({
            start: "top -300px",
            end: "max",
            onUpdate: self => {
                if (self.direction === 1) {
                    gsap.to(backToTop, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.3,
                        ease: config.ease.smooth
                    });
                } else {
                    gsap.to(backToTop, {
                        opacity: 0,
                        scale: 0,
                        duration: 0.3,
                        ease: config.ease.smooth
                    });
                }
            }
        });

        backToTop.addEventListener('click', () => {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: 0 },
                ease: "power2.inOut"
            });
        });
    }

    // Improved hover effects for interactive elements
    gsap.utils.toArray('.hover-lift').forEach(element => {
        // Create hover timeline (paused initially)
        const hoverTl = gsap.timeline({paused: true})
            .to(element, {
                y: -10,
                scale: 1.02,
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                duration: 0.4,
                ease: 'power2.out'
            });
            
        // Mouse enter event
        element.addEventListener('mouseenter', () => {
            hoverTl.play();
        });

        // Mouse leave event
        element.addEventListener('mouseleave', () => {
            hoverTl.reverse();
        });
    });

    // Button hover effects
    gsap.utils.toArray('a[class*="bg-"], button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: config.duration.fast,
                ease: config.ease.smooth
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: config.duration.fast,
                ease: config.ease.smooth
            });
        });
    });

    // Consultation slot selection
    document.querySelectorAll('.consultation-slot').forEach(slot => {
        slot.addEventListener('click', function() {
            // Remove active class from all slots
            document.querySelectorAll('.consultation-slot').forEach(s => {
                s.classList.remove('bg-white/40', 'ring-2', 'ring-white');
                s.classList.add('bg-white/20');
            });
            
            // Add active class to clicked slot
            this.classList.remove('bg-white/20');
            this.classList.add('bg-white/40', 'ring-2', 'ring-white');
            
            // Update form with selected time
            const selectedTime = this.getAttribute('data-time');
            const messageField = document.querySelector('textarea[placeholder*="Tell us about your needs"]');
            if (messageField && !messageField.value.includes('Preferred consultation time:')) {
                messageField.value = `Preferred consultation time: ${selectedTime}\n\n` + messageField.value;
            }
        });
    });

    // Form validation and submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ef4444';
                    isValid = false;
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Show success message
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    this.reset();
                }, 3000);
            }
        });
    }

    // Add subtle parallax effects
    const parallaxElements = [
        { element: "#home .absolute.top-20.left-20", speed: 0.2 },
        { element: "#home .absolute.bottom-20.right-20", speed: 0.3 },
        { element: "#home .absolute.top-1/2.left-1/2", speed: 0.1 },
        { element: ".floating-contact", speed: -0.1 }
    ];
    
    parallaxElements.forEach(item => {
        const element = document.querySelector(item.element);
        if (element) {
            gsap.to(element, {
                y: `${item.speed * 100}px`,
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true
                }
            });
        }
    });
}