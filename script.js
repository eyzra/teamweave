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

    // --- 3. Hero Slider (if exists) ---
    const slides = document.querySelectorAll('.slide');
    const captions = document.querySelectorAll('.caption');
    if(slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 6000; // Slower for reading

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            if(captions[currentSlide]) captions[currentSlide].classList.remove('active');
            
            currentSlide = (currentSlide + 1) % slides.length;
            
            slides[currentSlide].classList.add('active');
            if(captions[currentSlide]) captions[currentSlide].classList.add('active');
        }
        setInterval(nextSlide, slideInterval);
    }

    // --- 4. Insights SPA Logic (New) ---
    const blogCards = document.querySelectorAll('.blog-card[data-article]');
    const blogList = document.getElementById('insights-list');
    const backBtns = document.querySelectorAll('.back-btn');

    if(blogCards.length > 0) {
        // Open Article
        blogCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = card.getAttribute('data-article');
                const targetArticle = document.getElementById(targetId);
                
                if(targetArticle && blogList) {
                    blogList.style.display = 'none';
                    targetArticle.classList.add('active');
                    window.scrollTo(0, 0); // Scroll top
                }
            });
        });

        // Close Article (Back button)
        backBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const activeArticle = document.querySelector('.article-viewer.active');
                if(activeArticle) activeArticle.classList.remove('active');
                if(blogList) {
                    blogList.style.display = 'grid'; // Restore grid
                    blogList.classList.add('fade-in'); // simple re-anim
                }
            });
        });
    }

    // --- 5. Scroll Animations ---
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
            if (window.scrollY > window.innerHeight - 100) {
                logo.classList.add('hidden');
            } else {
                logo.classList.remove('hidden');
            }
            
            if(footer && navTrigger) {
                const footerRect = footer.getBoundingClientRect();
                if (footerRect.top <= window.innerHeight) {
                    navTrigger.classList.add('hidden');
                } else {
                    navTrigger.classList.remove('hidden');
                }
            }
        });
    }
});