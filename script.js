// Smooth scrolling for anchor links
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

// Header background on scroll
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.padding = '20px 0';
    } else {
        header.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 70%, transparent 100%)';
        header.style.backdropFilter = 'none';
        header.style.padding = '40px 0 0';
    }
    
    lastScroll = currentScroll;
});

// Menu button toggle
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    
    if (menuOpen) {
        menuBtn.classList.add('open');
        // Add mobile menu functionality here if needed
    } else {
        menuBtn.classList.remove('open');
    }
});

// Scroll indicator animation
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    const kvSection = document.querySelector('.kv-section');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > kvSection.offsetHeight - 200) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// Gallery filter functionality
const galleryItems = document.querySelectorAll('.gallery-item');

// Intersection Observer for fade-in animations
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

// Observe elements for animations
const animateElements = document.querySelectorAll('.creator-card, .service-item, .news-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Gallery item hover effect
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const tag = item.querySelector('.gallery-tag');
        if (tag) {
            tag.style.transform = 'scale(1.05)';
            tag.style.transition = 'transform 0.3s ease';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        const tag = item.querySelector('.gallery-tag');
        if (tag) {
            tag.style.transform = 'scale(1)';
        }
    });
});

// Parallax effect for KV section
const kvVisual = document.querySelector('.kv-visual');
if (kvVisual) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        kvVisual.style.transform = `translateY(${rate}px)`;
    });
}

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Add smooth transitions to page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Contact button interaction
const contactBtn = document.querySelector('.contact-btn');
if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Add your contact form logic here
        console.log('Contact button clicked');
    });
}

// Gallery horizontal scroll with mouse wheel
const galleryRows = document.querySelectorAll('.gallery-row');
galleryRows.forEach(row => {
    row.addEventListener('wheel', (e) => {
        if (window.innerWidth > 768) {
            e.preventDefault();
            row.scrollLeft += e.deltaY;
        }
    });
});

// Add active state to navigation on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.footer-nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('class')?.split('-')[0] || '';
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href')?.includes(current)) {
            link.classList.add('active');
        }
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll handlers
const debouncedScroll = debounce(() => {
    // Your scroll logic here
});

window.addEventListener('scroll', debouncedScroll);

