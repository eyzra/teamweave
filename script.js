document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Preloader ---
    const preloader = document.getElementById('preloader');
    if(preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => { preloader.style.display = 'none'; }, 800);
            }, 1000);
        });
    }

    // --- 2. Menu Toggle ---
    const navTrigger = document.getElementById('nav-trigger');
    const overlayNav = document.getElementById('overlay-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if(navTrigger) {
        navTrigger.addEventListener('click', () => {
            navTrigger.classList.toggle('active');
            overlayNav.classList.toggle('open');
        });
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                overlayNav.classList.remove('open');
                navTrigger.classList.remove('active');
            });
        });
    }

    // --- 3. Hero Slider ---
    const slides = document.querySelectorAll('.slide');
    const captions = document.querySelectorAll('.caption');
    if(slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 6000;

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            if(captions[currentSlide]) captions[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
            if(captions[currentSlide]) captions[currentSlide].classList.add('active');
        }
        setInterval(nextSlide, slideInterval);
    }

    // --- 4. Insights SPA Logic ---
    const blogCards = document.querySelectorAll('.blog-card[data-article]');
    const blogList = document.getElementById('insights-list');
    const backBtns = document.querySelectorAll('.back-btn');

    if(blogCards.length > 0) {
        blogCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = card.getAttribute('data-article');
                const targetArticle = document.getElementById(targetId);
                if(targetArticle && blogList) {
                    blogList.style.display = 'none';
                    targetArticle.classList.add('active');
                    window.scrollTo(0, 0);
                }
            });
        });

        backBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const activeArticle = document.querySelector('.article-viewer.active');
                if(activeArticle) activeArticle.classList.remove('active');
                if(blogList) {
                    blogList.style.display = 'grid';
                    blogList.classList.add('fade-in');
                }
            });
        });
    }

    // --- 5. Scroll Animations (Fade-in) ---
    const fadeElements = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);
    fadeElements.forEach(el => appearOnScroll.observe(el));

    // --- 6. Hide Logo on Scroll ---
    const logo = document.querySelector('.fixed-logo');
    const footer = document.querySelector('footer');
    if(logo) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight - 100) { logo.classList.add('hidden'); } 
            else { logo.classList.remove('hidden'); }
            
            if(footer && navTrigger) {
                const footerRect = footer.getBoundingClientRect();
                if (footerRect.top <= window.innerHeight) { navTrigger.classList.add('hidden'); } 
                else { navTrigger.classList.remove('hidden'); }
            }
        });
    }

    // --- 7. Stats Banner Animation (NEW) ---
    const statsSection = document.getElementById('stats-banner');
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    const locationText = document.querySelector('.location-text');
    let hasCounted = false;

    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                // Count numbers
                statNumbers.forEach(stat => {
                    const target = +stat.getAttribute('data-target');
                    const duration = 2000; 
                    const increment = target / (duration / 20); // updates every 20ms
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target.toLocaleString() + '+';
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.ceil(current).toLocaleString() + '+';
                        }
                    }, 20);
                });
                hasCounted = true;
            }
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);

        // Cycle Locations (Text Ticker)
        if (locationText) {
            const locations = ["Lagos", "Abuja", "Port Harcourt", "London", "Accra", "Dubai"];
            let index = 0;
            setInterval(() => {
                locationText.style.opacity = '0';
                setTimeout(() => {
                    index = (index + 1) % locations.length;
                    locationText.textContent = locations[index];
                    locationText.style.opacity = '1';
                }, 500); // Wait for fade out to change text
            }, 3000); // Change every 3 seconds
            
            // Add CSS transition for smooth text fade
            locationText.style.transition = 'opacity 0.5s ease';
        }
    }
});