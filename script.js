// Smooth scrolling for navigation links
document.addEventListener(\'DOMContentLoaded\', function() {
    // Add loading animation
    document.body.classList.add(\'loading\');
    
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll(\'a[href^="#"]\');
    links.forEach(link => {
        link.addEventListener(\'click\', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute(\'href\');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector(\'.header\').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: \'smooth\'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector(\'.header\');
    let lastScrollTop = 0;
    
    window.addEventListener(\'scroll\', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = \'rgba(102, 126, 234, 0.95)\';
            header.style.backdropFilter = \'blur(10px)\';
        } else {
            header.style.background = \'linear-gradient(135deg, #667eea 0%, #764ba2 100%)\';
            header.style.backdropFilter = \'none\';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: \'0px 0px -50px 0px\'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = \'1\';
                entry.target.style.transform = \'translateY(0)\';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(\'.benefit-card, .chapter-card, .testimonial-card, .highlight-item\');
    animatedElements.forEach(el => {
        el.style.opacity = \'0\';
        el.style.transform = \'translateY(30px)\';
        el.style.transition = \'opacity 0.6s ease, transform 0.6s ease\';
        observer.observe(el);
    });
    
    // Counter animation for price
    const priceElements = document.querySelectorAll(\'.new-price\');
    priceElements.forEach(el => {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animatePrice(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(el);
    });
    
    // Mobile menu toggle (if needed)
    const mobileMenuBtn = document.querySelector(\'.mobile-menu-btn\');
    const nav = document.querySelector(\'.nav\');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener(\'click\', function() {
            nav.classList.toggle(\'active\');
        });
    }
    
    // Add floating elements animation
    createFloatingElements();
    
    // Add scroll progress indicator
    createScrollProgress();
});

// Price animation function
function animatePrice(element) {
    const finalPrice = 67.00;
    const duration = 2000;
    const startTime = Date.now();
    
    function updatePrice() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentPrice = (finalPrice * progress).toFixed(2);
        
        element.textContent = `Por apenas R$ ${currentPrice}`;
        
        if (progress < 1) {
            requestAnimationFrame(updatePrice);
        }
    }
    
    updatePrice();
}

// Create floating elements for visual appeal
function createFloatingElements() {
    const hero = document.querySelector(\'.hero\');
    if (!hero) return;
    
    for (let i = 0; i < 5; i++) {
        const element = document.createElement(\'div\');
        element.className = \'floating-element\';
        element.style.cssText = `
            position: absolute;
            width: ${Math.random() * 20 + 10}px;
            height: ${Math.random() * 20 + 10}px;
            background: rgba(255, 215, 0, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            pointer-events: none;
        `;
        hero.appendChild(element);
    }
}

// Create scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement(\'div\');
    progressBar.className = \'scroll-progress\';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(45deg, #ff6b6b, #ffa500);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener(\'scroll\', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + \'%\';
    });
}

// Purchase button handler (updated with Meta Pixel tracking)
function handlePurchase() {
    fbq(\'track\', \'InitiateCheckout\');
    // You can keep the loading state and alert if you want, or remove them
    // const button = event.target;
    // const originalText = button.innerHTML;
    // button.innerHTML = \'<i class="fas fa-spinner fa-spin"></i> Processando...\';
    // button.style.pointerEvents = \'none\';
    
    // Simulate purchase process (for demonstration, remove in production)
    // setTimeout(() => {
    //     alert(\'Obrigado pelo interesse! Em um site real, você seria redirecionado para o sistema de pagamento.\');
    //     button.innerHTML = originalText;
    //     button.style.pointerEvents = \'auto\';
    // }, 2000);
}

// Add some interactive effects
document.addEventListener(\'mousemove\', function(e) {
    const bookCover = document.querySelector(\'.book-cover\');
    if (!bookCover) return;
    
    const rect = bookCover.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        bookCover.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    }
});

// Reset book cover on mouse leave
document.addEventListener(\'mouseleave\', function() {
    const bookCover = document.querySelector(\'.book-cover\');
    if (bookCover) {
        bookCover.style.transform = \'rotateY(-15deg) rotateX(5deg)\';
    }
});

// Add testimonial carousel functionality (if needed)
function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll(\'.testimonial-card\');
    let currentIndex = 0;
    
    if (testimonials.length <= 1) return;
    
    setInterval(() => {
        testimonials[currentIndex].style.opacity = \'0.7\';
        currentIndex = (currentIndex + 1) % testimonials.length;
        testimonials[currentIndex].style.opacity = \'1\';
        testimonials[currentIndex].style.transform = \'scale(1.05)\';
        
        setTimeout(() => {
            testimonials[currentIndex].style.transform = \'scale(1)\';
        }, 300);
    }, 5000);
}

// Initialize carousel after DOM is loaded
setTimeout(initTestimonialCarousel, 1000);

// Add keyboard navigation
document.addEventListener(\'keydown\', function(e) {
    if (e.key === \'Enter\' && e.target.classList.contains(\'btn-primary\')) {
        e.target.click();
    }
});

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll(\'img[data-src]\');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove(\'lazy\');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Add error handling for failed loads
window.addEventListener(\'error\', function(e) {
    console.log(\'Error caught:\', e.error);
});

// Add analytics tracking (placeholder)
function trackEvent(eventName, eventData) {
    // In a real scenario, this would send data to analytics service
    console.log(\'Event tracked:\', eventName, eventData);
}

// Track button clicks
document.addEventListener(\'click\', function(e) {
    if (e.target.classList.contains(\'btn-primary\')) {
        trackEvent(\'button_click\', {
            button_text: e.target.textContent.trim(),
            page_location: window.location.href
        });
    }
});

// Add social sharing functionality (if needed)
function shareOnSocial(platform) {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(\'Confira este incrível e-book infantil: No Quintal Tem Um Portal!\');
    
    let shareUrl = \'\';
    switch(platform) {
        case \'facebook\':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case \'twitter\':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            break;
        case \'whatsapp\':
            shareUrl = `https://wa.me/?text=${text}%20${url}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, \'_blank\', \'width=600,height=400\');
    }
}

// Para página de obrigado (caso exista):
// Exemplo de como usar:
// if (window.location.pathname.includes(\'/pagina-de-obrigado\')) {
//   fbq(\'track\', \'Purchase\', {
//     value: 67.00,
//     currency: \'BRL\'
//   });
// }

