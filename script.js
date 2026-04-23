        // Navbar Glass Effect on Scroll
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                navbar.style.padding = window.innerWidth < 768 ? "10px 0" : "15px 0";
                navbar.style.background = "rgba(5, 4, 4, 0.7)";
                navbar.style.boxShadow = "0 10px 30px -10px rgba(0,0,0,0.5)";
            } else {
                navbar.style.padding = window.innerWidth < 768 ? "12px 0" : "20px 0";
                navbar.style.background = "rgba(5, 4, 4, 0.4)";
                navbar.style.boxShadow = "none";
            }
        });

        // Unique Full-Screen Mobile Menu Toggle Logic
        const mobileToggle = document.getElementById('mobile-toggle');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        const mobileLinks = document.querySelectorAll('.mobile-link');
        const menuItemsReveal = document.querySelectorAll('.menu-item-reveal');
        let isMenuOpen = false;

        function toggleMobileMenu() {
            isMenuOpen = !isMenuOpen;
            const icon = mobileToggle.querySelector('i');

            if (isMenuOpen) {
                // Open Menu
                mobileMenuOverlay.classList.remove('opacity-0', 'pointer-events-none');
                document.body.style.overflow = 'hidden'; // Stop background scrolling
                icon.classList.replace('fa-bars', 'fa-times');
                
                // Staggered entrance animation
                menuItemsReveal.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, 100 * (index + 1));
                });
            } else {
                // Close Menu
                mobileMenuOverlay.classList.add('opacity-0', 'pointer-events-none');
                document.body.style.overflow = ''; // Restore scrolling
                icon.classList.replace('fa-times', 'fa-bars');
                
                // Reset animation states
                menuItemsReveal.forEach(item => {
                    item.classList.remove('active');
                });
            }
        }

        mobileToggle.addEventListener('click', toggleMobileMenu);

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleMobileMenu);
        });

        // Intersection Observer for Reveal Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -30px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // Number Counter Animation
        const counters = document.querySelectorAll('.counter');
        let scrollStarted = false;

        const startCounters = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
        }

        const statsObserver = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting && !scrollStarted) {
                startCounters();
                scrollStarted = true;
            }
        });
        
        const statsSection = document.querySelector('.grid-cols-1.md\\:grid-cols-3');
        if(statsSection) statsObserver.observe(statsSection);

        // Advanced Lightbox
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxContent = document.getElementById('lightbox-content');

        function openLightbox(element) {
            const imgSrc = element.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex');
            
            // Trigger animation frame for CSS transition
            requestAnimationFrame(() => {
                lightbox.classList.remove('opacity-0');
                lightboxContent.classList.remove('scale-95');
                lightboxContent.classList.add('scale-100');
            });
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.add('opacity-0');
            lightboxContent.classList.remove('scale-100');
            lightboxContent.classList.add('scale-95');
            
            setTimeout(() => {
                lightbox.classList.add('hidden');
                lightbox.classList.remove('flex');
                if(!isMenuOpen) document.body.style.overflow = ''; // Only restore if mobile menu isn't open
            }, 500);
        }

        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox || e.target.closest('.absolute.inset-0.bg-black\\/80')) {
                closeLightbox();
            }
        });

        // FAQ Accordion Toggle
        function toggleFaq(button) {
            const faqItem = button.parentElement;
            
            // Close other items
            document.querySelectorAll('.faq-item').forEach(item => {
                if(item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });

            // Toggle current
            faqItem.classList.toggle('active');
        }

        // Add 3D tilt effect to glass panels based on mouse position (Desktop Only)
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            document.querySelectorAll('.glass-panel').forEach(panel => {
                panel.addEventListener('mousemove', (e) => {
                    const rect = panel.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = ((y - centerY) / centerY) * -5;
                    const rotateY = ((x - centerX) / centerX) * 5;
                    
                    panel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
                });
                
                panel.addEventListener('mouseleave', () => {
                    panel.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
                });
            });
        }