document.addEventListener('DOMContentLoaded', (event) => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

    // Function to set active link
    const setActiveLink = (url) => {
        navLinks.forEach(link => {
            if (link.href === url) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // Set active link on page load
    setActiveLink(window.location.href);

    // Update active link on navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const url = link.href;
            setActiveLink(url);
            window.location.href = url;
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