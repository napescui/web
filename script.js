// Loading Screen Animation
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        document.body.style.overflow = 'visible';
    }, 2000);
});

// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Animated Counter for Statistics
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate counters when stats section is visible
            if (entry.target.classList.contains('stats')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
            }
        }
    });
}, observerOptions);

// Add scroll animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('fade-in');
        observer.observe(header);
    });
    
    // Add slide-in animations to service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Add slide-in animations to portfolio items
    document.querySelectorAll('.portfolio-item').forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.15}s`;
        observer.observe(item);
    });
    
    // Add animations to about section
    document.querySelector('.about-text').classList.add('slide-in-left');
    document.querySelector('.about-image').classList.add('slide-in-right');
    observer.observe(document.querySelector('.about-text'));
    observer.observe(document.querySelector('.about-image'));
    
    // Add animations to contact section
    document.querySelector('.contact-info').classList.add('slide-in-left');
    document.querySelector('.contact-form').classList.add('slide-in-right');
    observer.observe(document.querySelector('.contact-info'));
    observer.observe(document.querySelector('.contact-form'));
    
    // Observe stats for counter animation
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
});

// Portfolio Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Form Submission Handler
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Show success message (in a real app, you'd send to server)
    showNotification('Message sent successfully!', 'success');
    
    // Reset form
    contactForm.reset();
});

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease forwards;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
document.head.appendChild(notificationStyles);

// Enhanced 3D Character and City Animation
let animationPhase = 0;
let isUserInteracting = false;

// Initialize 3D effects
function initialize3DEffects() {
    // Add mouse interaction to character
    const character = document.querySelector('.character-3d-container');
    const hero = document.querySelector('.hero');
    
    if (character && hero) {
        hero.addEventListener('mousemove', (e) => {
            if (!isUserInteracting) return;
            
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            // Make character follow mouse
            character.style.left = `${x * 80 + 10}%`;
            character.style.bottom = `${(1 - y) * 60 + 10}%`;
        });
        
        hero.addEventListener('mouseenter', () => {
            isUserInteracting = true;
            character.style.transition = 'left 0.3s ease, bottom 0.3s ease';
        });
        
        hero.addEventListener('mouseleave', () => {
            isUserInteracting = false;
            character.style.transition = 'left 0.5s ease, bottom 0.5s ease';
            character.style.left = '20%';
            character.style.bottom = '20%';
        });
    }
    
    // Dynamic RGB light intensity based on time
    const rgbLights = document.querySelectorAll('.rgb-light');
    setInterval(() => {
        rgbLights.forEach((light, index) => {
            const intensity = Math.sin(Date.now() * 0.001 + index) * 0.5 + 0.5;
            light.style.opacity = intensity;
        });
    }, 50);
    
    // Animate buildings based on audio-like visualization
    const buildings = document.querySelectorAll('.building');
    setInterval(() => {
        buildings.forEach((building, index) => {
            const height = Math.sin(Date.now() * 0.003 + index * 0.5) * 20 + 100;
            building.style.transform = `scaleY(${height / 100})`;
        });
    }, 100);
    
    // Particle system controller
    const particles3D = document.querySelectorAll('.particle-3d');
    particles3D.forEach((particle, index) => {
        particle.addEventListener('animationiteration', () => {
            // Change particle color randomly
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f093fb', '#ff9f43'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = randomColor;
            particle.style.boxShadow = `0 0 10px ${randomColor}`;
        });
    });
}

// Character emotion system
function updateCharacterEmotion() {
    const eyes = document.querySelectorAll('.eye');
    const mouth = document.querySelector('.mouth');
    
    if (eyes.length > 0 && mouth) {
        // Random emotion changes
        const emotions = ['happy', 'excited', 'focused', 'playful'];
        const currentEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        
        switch(currentEmotion) {
            case 'happy':
                mouth.style.borderRadius = '15px 15px 0 0';
                break;
            case 'excited':
                eyes.forEach(eye => eye.style.transform = 'scaleY(1.2)');
                mouth.style.width = '18px';
                break;
            case 'focused':
                eyes.forEach(eye => eye.style.transform = 'scaleY(0.8)');
                break;
            case 'playful':
                mouth.style.transform = 'rotate(5deg)';
                break;
        }
        
        // Reset after animation
        setTimeout(() => {
            eyes.forEach(eye => eye.style.transform = 'scaleY(1)');
            mouth.style.borderRadius = '0 0 15px 15px';
            mouth.style.width = '15px';
            mouth.style.transform = 'rotate(0deg)';
        }, 2000);
    }
}

// Enhanced parallax for 3D elements
function update3DParallax() {
    const scrolled = window.pageYOffset;
    const cityLayers = document.querySelectorAll('.city-layer');
    const holoElements = document.querySelectorAll('.holo-element');
    
    cityLayers.forEach((layer, index) => {
        const speed = (index + 1) * 0.3;
        layer.style.transform = `translateZ(${(index + 1) * 100}px) translateY(${scrolled * speed}px)`;
    });
    
    holoElements.forEach((element, index) => {
        const speed = (index + 1) * 0.2;
        element.style.transform = `translateY(${scrolled * speed}px) rotateZ(${scrolled * 0.1}deg)`;
    });
}

// Advanced energy wave effects
function triggerEnergyWave() {
    const waves = document.querySelectorAll('.energy-wave');
    waves.forEach((wave, index) => {
        setTimeout(() => {
            wave.style.animationPlayState = 'running';
            wave.style.borderColor = `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.6)`;
        }, index * 300);
    });
}

// Initialize all 3D effects when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        initialize3DEffects();
        
        // Start character emotion updates
        setInterval(updateCharacterEmotion, 5000);
        
        // Trigger energy waves periodically
        setInterval(triggerEnergyWave, 8000);
        
        // Start first energy wave
        setTimeout(triggerEnergyWave, 3000);
    }, 2500);
});

// Enhanced scroll effects with 3D elements
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // 3D Parallax effects
    update3DParallax();
    
    // RGB light intensity based on scroll
    const rgbLights = document.querySelectorAll('.rgb-light');
    rgbLights.forEach((light, index) => {
        const intensity = Math.sin(scrolled * 0.01 + index) * 0.3 + 0.7;
        light.style.opacity = intensity;
    });
}, 16));

// Typewriter Effect for Hero Title
function typewriterEffect() {
    const titleWords = document.querySelectorAll('.title-word');
    
    titleWords.forEach((word, index) => {
        const text = word.textContent;
        word.textContent = '';
        word.style.opacity = '1';
        
        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    word.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 100);
        }, index * 800);
    });
}

// Initialize typewriter effect after loading
window.addEventListener('load', () => {
    setTimeout(typewriterEffect, 2500);
});

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Add floating animation to service icons
document.querySelectorAll('.service-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.animation = 'float 1s ease-in-out infinite';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.animation = 'none';
    });
});

// Initialize all animations and effects
document.addEventListener('DOMContentLoaded', () => {
    // Add stagger animation to navigation items
    document.querySelectorAll('.nav-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('nav-item-animate');
    });
    
    // Add pulse animation to scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Add navigation animation styles
const navStyles = document.createElement('style');
navStyles.textContent = `
    .nav-item-animate {
        opacity: 0;
        transform: translateY(-20px);
        animation: slideDown 0.5s ease forwards;
    }
    
    @keyframes slideDown {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(navStyles);

// Performance optimization - throttle scroll events
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

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Parallax effect
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.particle');
    
    parallaxElements.forEach((element, index) => {
        const speed = (index % 3 + 1) * 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 16));
