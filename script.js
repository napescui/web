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
    
    // Add enhanced animations to service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        const animationTypes = ['fade-in', 'scale-in', 'rotate-in', 'slide-in-bounce'];
        const randomAnimation = animationTypes[index % animationTypes.length];
        card.classList.add(randomAnimation);
        card.style.animationDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Add enhanced animations to portfolio items
    document.querySelectorAll('.portfolio-item').forEach((item, index) => {
        const animationTypes = ['scale-in-rotate', 'slide-in-bounce', 'fade-in'];
        const randomAnimation = animationTypes[index % animationTypes.length];
        item.classList.add(randomAnimation);
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

// Add advanced animation styles
const advancedStyles = document.createElement('style');
advancedStyles.textContent = `
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
    
    @keyframes windowBlink {
        0%, 70%, 100% { opacity: 1; }
        85% { opacity: 0.3; }
    }
    
    @keyframes rainFall {
        to {
            transform: translateY(100vh);
            opacity: 0;
        }
    }
    
    @keyframes lightningFlash {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
    }
    
    @keyframes headEmotion-happy {
        0%, 100% { transform: rotateZ(0deg); }
        50% { transform: rotateZ(10deg); }
    }
    
    @keyframes headEmotion-excited {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    @keyframes headEmotion-curious {
        0%, 100% { transform: rotateY(0deg); }
        50% { transform: rotateY(20deg); }
    }
    
    .action-jump .character-body {
        animation: characterJump 1s ease-out !important;
    }
    
    .action-wave .character-arm.arm-right {
        animation: armWave 1s ease-in-out !important;
    }
    
    .action-spin .character-3d {
        animation: characterSpin 2s ease-in-out !important;
    }
    
    .action-dance .character-body {
        animation: characterDance 2s ease-in-out !important;
    }
    
    @keyframes characterJump {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-40px); }
    }
    
    @keyframes armWave {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-60deg); }
        75% { transform: rotate(60deg); }
    }
    
    @keyframes characterSpin {
        0% { transform: rotateY(0deg); }
        100% { transform: rotateY(720deg); }
    }
    
    @keyframes characterDance {
        0%, 100% { transform: translateY(0) rotateZ(0deg); }
        25% { transform: translateY(-10px) rotateZ(5deg); }
        50% { transform: translateY(-20px) rotateZ(0deg); }
        75% { transform: translateY(-10px) rotateZ(-5deg); }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    /* Enhanced scroll animations */
    .scale-in-rotate {
        opacity: 0;
        transform: scale(0.5) rotate(45deg);
        transition: all 1s ease;
    }
    
    .scale-in-rotate.visible {
        opacity: 1;
        transform: scale(1) rotate(0deg);
    }
    
    .slide-in-bounce {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .slide-in-bounce.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(advancedStyles);

// Enhanced 3D Character and City Animation
let animationPhase = 0;
let isUserInteracting = false;
let characterState = 'walking';

// Advanced 3D Character Controller
class Character3DController {
    constructor() {
        this.character = document.querySelector('.growtopia-character-container');
        this.hero = document.querySelector('.hero');
        this.isFollowingMouse = false;
        this.currentEmotion = 'neutral';
        this.init();
    }
    
    init() {
        if (!this.character || !this.hero) return;
        
        // Enhanced mouse interaction
        this.hero.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.hero.addEventListener('mouseenter', () => this.startMouseFollow());
        this.hero.addEventListener('mouseleave', () => this.stopMouseFollow());
        this.hero.addEventListener('click', () => this.triggerCharacterAction());
        
        // Start emotion cycle
        this.startEmotionCycle();
    }
    
    handleMouseMove(e) {
        if (!this.isFollowingMouse) return;
        
        const rect = this.hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        // Advanced character positioning with depth
        this.character.style.left = `${x * 70 + 15}%`;
        this.character.style.bottom = `${(1 - y) * 50 + 15}%`;
        this.character.style.transform = `translateZ(${y * 100}px) rotateY(${x * 30 - 15}deg)`;
        
        // Change character state based on mouse speed
        this.updateCharacterState(e);
    }
    
    updateCharacterState(e) {
        const speed = Math.sqrt(e.movementX * e.movementX + e.movementY * e.movementY);
        
        if (speed > 5) {
            this.setCharacterState('running');
        } else if (speed > 2) {
            this.setCharacterState('walking');
        } else {
            this.setCharacterState('idle');
        }
    }
    
    setCharacterState(state) {
        if (this.characterState === state) return;
        
        this.characterState = state;
        this.character.setAttribute('data-state', state);
        
        // Adjust animation speed based on state
        const body = this.character.querySelector('.character-body');
        if (body) {
            switch(state) {
                case 'running':
                    body.style.animationDuration = '0.8s';
                    break;
                case 'walking':
                    body.style.animationDuration = '1.2s';
                    break;
                case 'idle':
                    body.style.animationDuration = '2s';
                    break;
            }
        }
    }
    
    startMouseFollow() {
        this.isFollowingMouse = true;
        this.character.style.transition = 'left 0.3s ease, bottom 0.3s ease, transform 0.3s ease';
        this.setEmotion('excited');
    }
    
    stopMouseFollow() {
        this.isFollowingMouse = false;
        this.character.style.transition = 'left 0.8s ease, bottom 0.8s ease, transform 0.8s ease';
        this.character.style.left = '20%';
        this.character.style.bottom = '20%';
        this.character.style.transform = 'translateZ(0) rotateY(0deg)';
        this.setEmotion('neutral');
    }
    
    triggerCharacterAction() {
        const actions = ['jump', 'wave', 'spin', 'dance'];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        this.performAction(randomAction);
    }
    
    performAction(action) {
        this.character.classList.add(`action-${action}`);
        setTimeout(() => {
            this.character.classList.remove(`action-${action}`);
        }, 2000);
    }
    
    setEmotion(emotion) {
        this.currentEmotion = emotion;
        this.character.setAttribute('data-emotion', emotion);
        
        const head = this.character.querySelector('.character-head');
        if (head) {
            head.style.animation = `headEmotion-${emotion} 2s ease-in-out`;
        }
    }
    
    startEmotionCycle() {
        const emotions = ['happy', 'excited', 'curious', 'playful', 'neutral'];
        
        setInterval(() => {
            if (!this.isFollowingMouse) {
                const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
                this.setEmotion(randomEmotion);
            }
        }, 4000);
    }
}

// Advanced City Animation Controller
class CityAnimationController {
    constructor() {
        this.buildings = document.querySelectorAll('.building');
        this.cityBackground = document.querySelector('.city-3d-background');
        this.isNightMode = false;
        this.init();
    }
    
    init() {
        this.startBuildingPulse();
        this.startWeatherEffects();
        this.startDayNightCycle();
    }
    
    startBuildingPulse() {
        this.buildings.forEach((building, index) => {
            // Create window lights
            this.addWindowLights(building, index);
            
            // Audio-reactive building heights
            setInterval(() => {
                const intensity = Math.sin(Date.now() * 0.003 + index * 0.5) * 0.3 + 0.7;
                const height = Math.sin(Date.now() * 0.002 + index * 0.3) * 15 + 100;
                
                building.style.transform = `scaleY(${height / 100}) rotateX(${intensity * 5}deg)`;
                building.style.filter = `brightness(${intensity}) saturate(${intensity * 1.5})`;
            }, 50);
        });
    }
    
    addWindowLights(building, index) {
        const windowCount = Math.floor(Math.random() * 8) + 4;
        
        for (let i = 0; i < windowCount; i++) {
            const window = document.createElement('div');
            window.className = 'building-window';
            window.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: ${Math.random() > 0.5 ? '#ffeb3b' : '#00bcd4'};
                top: ${Math.random() * 70 + 10}%;
                left: ${Math.random() * 60 + 20}%;
                animation: windowBlink ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                box-shadow: 0 0 5px currentColor;
            `;
            building.appendChild(window);
        }
    }
    
    startWeatherEffects() {
        // Add rain effect
        setInterval(() => {
            if (Math.random() < 0.3) {
                this.createRainDrop();
            }
        }, 100);
        
        // Add lightning effect
        setInterval(() => {
            if (Math.random() < 0.1) {
                this.createLightning();
            }
        }, 5000);
    }
    
    createRainDrop() {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.cssText = `
            position: absolute;
            width: 2px;
            height: 15px;
            background: linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.1));
            left: ${Math.random() * 100}%;
            top: -20px;
            animation: rainFall 1s linear forwards;
            pointer-events: none;
        `;
        
        document.querySelector('.hero').appendChild(drop);
        
        setTimeout(() => {
            drop.remove();
        }, 1000);
    }
    
    createLightning() {
        const lightning = document.createElement('div');
        lightning.className = 'lightning';
        lightning.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.3);
            animation: lightningFlash 0.3s ease-out;
            pointer-events: none;
        `;
        
        document.querySelector('.hero').appendChild(lightning);
        
        setTimeout(() => {
            lightning.remove();
        }, 300);
    }
    
    startDayNightCycle() {
        setInterval(() => {
            this.isNightMode = !this.isNightMode;
            this.updateCityLighting();
        }, 30000); // Change every 30 seconds
    }
    
    updateCityLighting() {
        const hero = document.querySelector('.hero');
        
        if (this.isNightMode) {
            hero.style.background = 'radial-gradient(circle at 20% 80%, #0a0a2e 0%, #000000 40%, #16213e 100%)';
        } else {
            hero.style.background = 'radial-gradient(circle at 20% 80%, #120a8f 0%, #000000 40%, #1a0033 100%)';
        }
    }
}

// Initialize enhanced 3D effects
function initialize3DEffects() {
    const characterController = new Character3DController();
    const cityController = new CityAnimationController();
    
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

// Growtopia Character emotion system
function updateCharacterEmotion() {
    const eyes = document.querySelectorAll('.eye');
    const mouth = document.querySelector('.mouth');
    const head = document.querySelector('.growtopia-head');
    const accessories = document.querySelectorAll('.accessory');
    
    if (eyes.length > 0 && mouth && head) {
        // Random emotion changes with Growtopia style
        const emotions = ['happy', 'excited', 'focused', 'playful', 'curious'];
        const currentEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        
        switch(currentEmotion) {
            case 'happy':
                mouth.style.transform = 'translateX(-50%) scaleX(1.3)';
                eyes.forEach(eye => {
                    eye.style.transform = 'scaleY(0.8) scaleX(1.1)';
                });
                head.style.animation = 'growtopiaHeadRotate 2s ease-in-out, growtopiaHappyBounce 1s ease-in-out';
                break;
            case 'excited':
                eyes.forEach(eye => {
                    eye.style.transform = 'scaleY(1.3) scaleX(1.2)';
                    eye.style.boxShadow = '0 0 15px rgba(255, 255, 0, 0.8)';
                });
                mouth.style.width = '25px';
                mouth.style.transform = 'translateX(-50%) rotateZ(5deg)';
                accessories.forEach(acc => {
                    acc.style.animationDuration = '1.5s';
                });
                break;
            case 'focused':
                eyes.forEach(eye => {
                    eye.style.transform = 'scaleY(0.6) scaleX(0.9)';
                });
                mouth.style.width = '12px';
                head.style.filter = 'brightness(1.1) contrast(1.2)';
                break;
            case 'playful':
                mouth.style.transform = 'translateX(-50%) rotate(8deg) scaleX(1.1)';
                head.style.animation = 'growtopiaHeadRotate 1.5s ease-in-out, growtopiaPlayfulShake 0.8s ease-in-out';
                accessories.forEach((acc, index) => {
                    acc.style.animation = `growtopiaAccessoryFloat 2s ease-in-out infinite ${index * 0.3}s`;
                });
                break;
            case 'curious':
                head.style.transform = 'rotateY(15deg) rotateZ(5deg)';
                eyes.forEach((eye, index) => {
                    eye.style.transform = index === 0 ? 'scaleY(1.2)' : 'scaleY(0.8)';
                });
                mouth.style.borderRadius = '10px 10px 0 0';
                break;
        }
        
        // Reset after animation with Growtopia styling
        setTimeout(() => {
            eyes.forEach(eye => {
                eye.style.transform = 'scaleY(1) scaleX(1)';
                eye.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
            });
            mouth.style.borderRadius = '0 0 20px 20px';
            mouth.style.width = '20px';
            mouth.style.transform = 'translateX(-50%)';
            head.style.animation = 'growtopiaHeadRotate 4s ease-in-out infinite';
            head.style.filter = 'none';
            head.style.transform = 'none';
            accessories.forEach(acc => {
                acc.style.animationDuration = '3s';
            });
        }, 3000);
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

// AI Chatbot Functionality
class GeminiChatbot {
    constructor() {
        // API key Gemini
        this.apiKey = 'AIzaSyBreoZhTVNwNNDqviHS__RDJPRpCP-pvlc';
        this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';
        
        this.chatbotToggle = document.getElementById('chatbot-toggle');
        this.chatbotWindow = document.getElementById('chatbot-window');
        this.chatbotInput = document.getElementById('chatbot-input');
        this.chatbotSend = document.getElementById('chatbot-send');
        this.chatbotMessages = document.getElementById('chatbot-messages');
        this.chatbotMinimize = document.getElementById('chatbot-minimize');
        this.chatbotClose = document.getElementById('chatbot-close');
        
        this.isOpen = false;
        this.isTyping = false;
        this.conversationHistory = [];
        this.botName = 'GTSA';
        
        this.init();
    }
    
    init() {
        // Event listeners
        this.chatbotToggle.addEventListener('click', () => this.toggleChatbot());
        this.chatbotClose.addEventListener('click', () => this.closeChatbot());
        this.chatbotMinimize.addEventListener('click', () => this.minimizeChatbot());
        this.chatbotSend.addEventListener('click', () => this.sendMessage());
        
        this.chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        this.chatbotInput.addEventListener('input', () => {
            this.chatbotSend.disabled = this.chatbotInput.value.trim() === '';
        });
        
        // Initialize send button state
        this.chatbotSend.disabled = true;
        
        // Load conversation history
        this.loadConversationHistory();
        
        // Auto-open chatbot after page loads
        setTimeout(() => {
            this.openChatbot();
        }, 3000);
    }
    
    toggleChatbot() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.chatbotWindow.classList.add('active');
            this.chatbotInput.focus();
        } else {
            this.chatbotWindow.classList.remove('active');
        }
    }
    
    closeChatbot() {
        this.isOpen = false;
        this.chatbotWindow.classList.remove('active');
    }
    
    minimizeChatbot() {
        this.isOpen = false;
        this.chatbotWindow.classList.remove('active');
    }
    
    async sendMessage() {
        const message = this.chatbotInput.value.trim();
        if (!message || this.isTyping) return;
        
        // Add user message
        this.addMessage(message, 'user');
        this.conversationHistory.push({ role: 'user', content: message });
        this.chatbotInput.value = '';
        this.chatbotSend.disabled = true;
        
        // Show typing indicator
        this.showTypingIndicator();
        
        try {
            // Call Gemini API
            const response = await this.callGeminiAPI(message);
            this.hideTypingIndicator();
            
            if (response) {
                this.addMessage(response, 'bot');
                this.conversationHistory.push({ role: 'assistant', content: response });
                this.saveConversationHistory();
            } else {
                const errorMsg = 'Maaf, saya mengalami kesulitan memproses permintaan Anda. Silakan coba lagi.';
                this.addMessage(errorMsg, 'bot');
                this.conversationHistory.push({ role: 'assistant', content: errorMsg });
                this.saveConversationHistory();
            }
        } catch (error) {
            this.hideTypingIndicator();
            console.error('Chatbot error:', error);
            const errorMsg = 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.';
            this.addMessage(errorMsg, 'bot');
            this.conversationHistory.push({ role: 'assistant', content: errorMsg });
            this.saveConversationHistory();
        }
    }
    
    async callGeminiAPI(message) {
        try {
            // Build conversation context with proper system prompt
            const systemPrompt = `Anda adalah GTSA, asisten AI yang dibuat oleh Jrenn. Anda adalah bot customer service yang ramah, profesional, dan cerdas untuk website portfolio kreatif. Anda bisa menggunakan emoji 😊, formatting text seperti **bold**, *italic*, dan karakter khusus lainnya dalam jawaban Anda. Selalu membantu dan menjawab dalam bahasa Indonesia dengan sopan, informatif, dan ekspresif.`;
            
            // Create proper conversation context
            let conversationContext = systemPrompt + "\n\nPercakapan:\n";
            
            // Add recent conversation history for context (last 4 exchanges)
            if (this.conversationHistory.length > 0) {
                this.conversationHistory.slice(-8).forEach(item => {
                    if (item.role === 'user') {
                        conversationContext += `Pengguna: ${item.content}\n`;
                    } else {
                        conversationContext += `Bot: ${item.content}\n`;
                    }
                });
            }
            
            conversationContext += `Pengguna: ${message}\nBot: `;
            
            const requestBody = {
                contents: [{
                    parts: [{
                        text: conversationContext
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 500,
                    stopSequences: []
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            };
            
            console.log('Making API request to:', this.apiUrl);
            
            const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            
            const data = await response.json();
            console.log('API Response:', data);
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
                return data.candidates[0].content.parts[0].text.trim();
            } else {
                console.error('Invalid response structure:', data);
                throw new Error('Invalid response format from API');
            }
        } catch (error) {
            console.error('API call failed:', error);
            // Return a fallback response instead of throwing
            return this.getFallbackResponse(message);
        }
    }
    
    getFallbackResponse(message) {
        // Simple keyword-based responses
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('halo') || lowerMessage.includes('hai') || lowerMessage.includes('hello')) {
            return "👋 **Halo!** Saya **GTSA**, asisten AI buatan *Jrenn*! 😊 Ada yang bisa saya bantu hari ini? ✨";
        }
        
        if (lowerMessage.includes('layanan') || lowerMessage.includes('service')) {
            return "🚀 Kami menyediakan layanan:\n\n💻 **Web Development**\n🎨 **UI/UX Design** \n📱 **Mobile App Development**\n📈 **Digital Marketing**\n\nMana yang ingin Anda ketahui lebih lanjut? 😉";
        }
        
        if (lowerMessage.includes('harga') || lowerMessage.includes('biaya') || lowerMessage.includes('price')) {
            return "💰 Untuk informasi harga yang *akurat*, silakan hubungi tim kami:\n📧 **hello@studio.com**\n📞 **+1 (555) 123-4567**\n\nKami akan memberikan penawaran sesuai kebutuhan proyek Anda! 💼✨";
        }
        
        if (lowerMessage.includes('portfolio') || lowerMessage.includes('proyek')) {
            return "🎯 Kami telah menyelesaikan **150+ proyek** untuk **50+ klien**! 🎉\n\nAnda bisa melihat portfolio kami di bagian *Portfolio* di website ini. Ada jenis proyek tertentu yang ingin Anda lihat? 👀";
        }
        
        if (lowerMessage.includes('kontak') || lowerMessage.includes('contact')) {
            return "📞 **Hubungi Kami:**\n\n📧 **Email:** hello@studio.com\n📱 **Phone:** +1 (555) 123-4567\n📍 **Address:** 123 Design Street, Creative City, CC 12345\n\nKami siap membantu! 😊✨";
        }
        
        // Default responses
        const fallbackResponses = [
            "😅 Maaf, saya sedang mengalami gangguan koneksi. Namun saya tetap bisa membantu Anda dengan informasi tentang layanan kami! 💪\n\nSilakan tanyakan tentang:\n🌐 **Web Development**\n🎨 **UI/UX Design** \n📱 **Mobile Apps**\n📈 **Digital Marketing**",
            "🔧 Sistem AI sedang dalam perbaikan, tapi saya masih bisa menjawab pertanyaan umum tentang studio kami. Ada yang ingin Anda ketahui? 🤔✨",
            "🙏 Terima kasih sudah menghubungi **GTSA**! Meskipun koneksi AI terganggu, saya siap membantu dengan informasi *layanan*, *portfolio*, atau *kontak* kami! 😊💼"
        ];
        
        return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }
    
    addMessage(content, sender, shouldScroll = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-user-tie"></i>' : '<i class="fas fa-user"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // Format text with markdown-like syntax
        let formattedContent = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
            .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
            .replace(/\n/g, '<br>'); // Line breaks
        
        messageContent.innerHTML = `<p>${formattedContent}</p>`;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        this.chatbotMessages.appendChild(messageDiv);
        if (shouldScroll) {
            this.scrollToBottom();
        }
    }
    
    showTypingIndicator() {
        this.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-message';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-user-tie"></i>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        this.chatbotMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        this.isTyping = false;
        const typingMessage = this.chatbotMessages.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }
    
    scrollToBottom() {
        setTimeout(() => {
            this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
        }, 100);
    }
    
    openChatbot() {
        this.isOpen = true;
        this.chatbotWindow.classList.add('active');
        this.chatbotInput.focus();
    }
    
    saveConversationHistory() {
        try {
            localStorage.setItem('chatbot_history', JSON.stringify(this.conversationHistory));
        } catch (error) {
            console.error('Failed to save conversation history:', error);
        }
    }
    
    loadConversationHistory() {
        try {
            const saved = localStorage.getItem('chatbot_history');
            if (saved) {
                this.conversationHistory = JSON.parse(saved);
                // Restore messages to UI
                this.conversationHistory.forEach(item => {
                    if (item.role === 'user') {
                        this.addMessage(item.content, 'user', false);
                    } else {
                        this.addMessage(item.content, 'bot', false);
                    }
                });
            }
        } catch (error) {
            console.error('Failed to load conversation history:', error);
            this.conversationHistory = [];
        }
    }
    
    clearHistory() {
        this.conversationHistory = [];
        localStorage.removeItem('chatbot_history');
        // Clear messages except welcome message
        const messages = this.chatbotMessages.querySelectorAll('.message:not(.welcome-message)');
        messages.forEach(msg => msg.remove());
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new GeminiChatbot();
});

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
