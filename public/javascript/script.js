document.addEventListener('DOMContentLoaded', (event) => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

    // Function to set active link
    const setActiveLink = (pathname) => {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === pathname) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // Set active link on page load
    setActiveLink(window.location.pathname);

    // Update active link on navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pathname = link.getAttribute('href');
            setActiveLink(pathname);
            window.location.href = pathname;
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Hero Carousel
    const heroBackgrounds = document.querySelectorAll('.hero-background');
    let currentIndex = 0;
    let direction = 1; // 1 for forward, -1 for backward

    function nextSlide() {
        const prevIndex = (currentIndex - 1 + heroBackgrounds.length) % heroBackgrounds.length;
        const nextIndex = (currentIndex + 1) % heroBackgrounds.length;

        heroBackgrounds[prevIndex].classList.remove('active', 'next', 'prev');
        heroBackgrounds[currentIndex].classList.remove('active', 'next', 'prev');
        heroBackgrounds[nextIndex].classList.remove('active', 'next', 'prev');

        if (direction === 1) {
            heroBackgrounds[prevIndex].classList.add('prev');
            heroBackgrounds[nextIndex].classList.add('next');
        } else {
            heroBackgrounds[prevIndex].classList.add('next');
            heroBackgrounds[nextIndex].classList.add('prev');
        }

        heroBackgrounds[currentIndex].classList.add('active');

        currentIndex = (currentIndex + direction + heroBackgrounds.length) % heroBackgrounds.length;
        direction *= 1; // Change direction for next transition
    }

    // Set initial active slide
    heroBackgrounds[currentIndex].classList.add('active');

    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Simple image lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyLoadImage = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    };

    const imageObserver = new IntersectionObserver(lazyLoadImage, {
        root: null,
        threshold: 0.1
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});