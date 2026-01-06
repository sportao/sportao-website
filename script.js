document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }

    // --- Header scroll effect ---
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.background = 'rgba(10, 10, 11, 0.95)';
        } else {
            header.style.background = 'rgba(10, 10, 11, 0.8)';
        }

        lastScroll = currentScroll;
    });

    // --- Intersection Observer for scroll animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- Smooth scrolling for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#" or empty
            if (href === '#' || href === '') return;

            const targetElement = document.querySelector(href);

            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Animate stats on scroll ---
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = target.getAttribute('data-target');
                animateValue(target, 0, parseInt(value), 2000);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateValue(element, start, end, duration) {
        const prefix = element.textContent.includes('$') ? '$' : '';
        const suffix = element.textContent.includes('+') ? 'M+' : element.textContent.includes('%') ? '%' : '';

        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = prefix + current + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // --- Parallax effect for hero gradient ---
    const heroGradient = document.querySelector('.hero-gradient');

    if (heroGradient) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroGradient.style.transform = `translateX(-50%) translateY(${rate}px)`;
        });
    }

    // --- Active nav link highlighting ---
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a[href^="#"]');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // --- Orbit animation pause on hover ---
    const modelVisual = document.querySelector('.model-visual');
    const modelOrbit = document.querySelector('.model-orbit');

    if (modelVisual && modelOrbit) {
        modelVisual.addEventListener('mouseenter', () => {
            modelOrbit.style.animationPlayState = 'paused';
            document.querySelectorAll('.orbit-item').forEach(item => {
                item.style.animationPlayState = 'paused';
            });
        });

        modelVisual.addEventListener('mouseleave', () => {
            modelOrbit.style.animationPlayState = 'running';
            document.querySelectorAll('.orbit-item').forEach(item => {
                item.style.animationPlayState = 'running';
            });
        });
    }

    // --- Scroll indicator hide on scroll ---
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }

    // --- Application Form mailto handler ---
    const applicationForm = document.getElementById('applicationForm');

    if (applicationForm) {
        applicationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const role = applicationForm.getAttribute('data-role');
            const formData = new FormData(applicationForm);

            // Build email body
            let body = `APPLICATION: ${role}\n`;
            body += `${'='.repeat(40)}\n\n`;

            body += `PERSONAL DETAILS\n`;
            body += `-----------------\n`;
            body += `Name: ${formData.get('name') || 'Not provided'}\n`;
            body += `Email: ${formData.get('email') || 'Not provided'}\n`;
            body += `LinkedIn: ${formData.get('linkedin') || 'Not provided'}\n`;
            body += `Location: ${formData.get('location') || 'Not provided'}\n\n`;

            body += `PROFESSIONAL DETAILS\n`;
            body += `--------------------\n`;
            body += `Video Link: ${formData.get('video_link') || 'Not provided'}\n`;
            body += `Expected Rate: ${formData.get('salary') || 'Not provided'}\n`;
            body += `Availability: ${formData.get('availability') || 'Not provided'}\n\n`;

            const question = formData.get('question');
            if (question) {
                body += `ADDITIONAL RESPONSE\n`;
                body += `-------------------\n`;
                body += `${question}\n`;
            }

            // Create mailto link
            const subject = encodeURIComponent(`Application: ${role}`);
            const encodedBody = encodeURIComponent(body);
            const mailtoLink = `mailto:grow@sportao.com?subject=${subject}&body=${encodedBody}`;

            // Open email client
            window.location.href = mailtoLink;
        });
    }
});
