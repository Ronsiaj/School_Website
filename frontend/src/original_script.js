/* ===== API CONFIGURATION ===== */
        const API_BASE = 'http://localhost/school/backend/public';

        /* Replace the hardcoded galleryData with an async fetch */
        async function loadGallery(category) {
            try {
                const res = await fetch(`${API_BASE}/api/gallery?category=${category || 'all'}`);
                const json = await res.json();
                if (json.status && json.data.items) {
                    galleryData.length = 0;
                    json.data.items.forEach(item => {
                        galleryData.push({
                            src: API_BASE + '/' + item.image,
                            cat: item.category
                        });
                    });
                }
            } catch (e) {
                console.warn('Gallery API unavailable, using fallback data.');
            }
        }

        /* ===== DATA ===== */
        const galleryData = [
            { src: 'https://picsum.photos/seed/gal1/600/400', cat: 'campus' }, { src: 'https://picsum.photos/seed/gal2/600/400', cat: 'events' },
            { src: 'https://picsum.photos/seed/gal3/600/400', cat: 'sports' }, { src: 'https://picsum.photos/seed/gal4/600/400', cat: 'campus' },
            { src: 'https://picsum.photos/seed/gal5/600/400', cat: 'achievements' }, { src: 'https://picsum.photos/seed/gal6/600/400', cat: 'events' },
            { src: 'https://picsum.photos/seed/gal7/600/400', cat: 'sports' }, { src: 'https://picsum.photos/seed/gal8/600/400', cat: 'campus' },
            { src: 'https://picsum.photos/seed/gal9/600/400', cat: 'achievements' }, { src: 'https://picsum.photos/seed/gal10/600/400', cat: 'events' },
            { src: 'https://picsum.photos/seed/gal11/600/400', cat: 'campus' }, { src: 'https://picsum.photos/seed/gal12/600/400', cat: 'sports' },
            { src: 'https://picsum.photos/seed/gal13/600/400', cat: 'events' }, { src: 'https://picsum.photos/seed/gal14/600/400', cat: 'achievements' },
            { src: 'https://picsum.photos/seed/gal15/600/400', cat: 'campus' }, { src: 'https://picsum.photos/seed/gal16/600/400', cat: 'sports' }
        ];

        const newsData = [
            { title: 'Annual Day Celebrations 2025', cat: 'news', date: 'Feb 28, 2025', img: 'https://picsum.photos/seed/news1/600/400', desc: 'A spectacular showcase of talent, creativity, and school spirit marked this year\'s Annual Day celebrations with over 1500 participants.' },
            { title: 'State Board Exam Toppers', cat: 'achievements', date: 'Feb 15, 2025', img: 'https://picsum.photos/seed/news2/600/400', desc: 'Five students from St. Joseph\'s secured positions in the State Top 10 list in the CBSE Board Examinations.' },
            { title: 'Inter-School Science Fair', cat: 'events', date: 'Jan 20, 2025', img: 'https://picsum.photos/seed/news3/600/400', desc: 'Our school hosted the regional Science Fair with over 30 participating schools and 200+ innovative projects.' },
            { title: 'National Science Olympiad Gold', cat: 'achievements', date: 'Jan 28, 2025', img: 'https://picsum.photos/seed/news4/600/400', desc: 'Rohan Patel won the Gold Medal in the National Science Olympiad, competing against 50,000+ students nationwide.' },
            { title: 'Republic Day Celebrations', cat: 'events', date: 'Jan 26, 2025', img: 'https://picsum.photos/seed/news5/600/400', desc: 'The school observed Republic Day with a flag hoisting ceremony, cultural programme, and patriotic speeches by students.' },
            { title: 'New Computer Lab Inaugurated', cat: 'news', date: 'Jan 10, 2025', img: 'https://picsum.photos/seed/news6/600/400', desc: 'A state-of-the-art computer lab with 60 workstations, robotics kits, and AI learning tools was inaugurated by the Chief Guest.' },
            { title: 'State Athletics Champions', cat: 'achievements', date: 'Nov 5, 2024', img: 'https://picsum.photos/seed/news7/600/400', desc: 'Our athletics team dominated the State Level Schools Athletics Meet, winning 8 gold, 5 silver, and 3 bronze medals.' },
            { title: 'Christmas Celebrations', cat: 'events', date: 'Dec 24, 2024', img: 'https://picsum.photos/seed/news8/600/400', desc: 'The school community came together for a joyous Christmas celebration with carols, a nativity play, and gift exchange.' },
            { title: 'Best School Award Received', cat: 'news', date: 'Oct 18, 2024', img: 'https://picsum.photos/seed/news9/600/400', desc: 'St. Joseph\'s was awarded the "Best School in the District" by the State Education Department for the third consecutive year.' }
        ];

        /* ===== ROUTING ===== */
        const protectedPages = ['admin-dashboard', 'admin-gallery', 'admin-news', 'admin-achievements', 'admin-content'];
        let currentPage = 'home';

        function navigateTo(page) {
            /* Check admin auth for protected pages */
            if (protectedPages.includes(page)) {
                const token = localStorage.getItem('schoolAdminToken');
                if (!token) {
                    showToast('Please login to access admin panel.', 'error');
                    page = 'admin-login';
                }
            }
            /* Hide all pages */
            document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
            /* Show target page */
            const target = document.getElementById('page-' + page);
            if (target) {
                target.classList.add('active');
                currentPage = page;
            }
            /* Update nav active state */
            document.querySelectorAll('.nav-links a[data-page]').forEach(a => a.classList.remove('active'));
            const navLink = document.querySelector('.nav-links a[data-page="' + page + '"]');
            if (navLink) navLink.classList.add('active');
            /* Update admin sidebar active state */
            document.querySelectorAll('.admin-sidebar nav a[data-page]').forEach(a => a.classList.remove('active'));
            const sideLink = document.querySelector('.admin-sidebar nav a[data-page="' + page + '"]');
            if (sideLink) sideLink.classList.add('active');
            /* Close mobile menu */
            document.getElementById('navLinks').classList.remove('open');
            document.getElementById('navToggle').setAttribute('aria-expanded', 'false');
            /* Scroll to top */
            window.scrollTo({ top: 0, behavior: 'smooth' });
            /* Trigger animations for the new page */
            if (page === 'home') initHomeAnimations();
            /* Render dynamic content */
            if (page === 'gallery') renderGalleryPage('all');
            if (page === 'news-events') renderNewsPage('all');
            if (page === 'admin-gallery') renderAdminGallery();
            if (page === 'admin-news') renderAdminNews();

            /* Show popup on public pages */
            if (!page.startsWith('admin-')) {
                showAdmissionPopup();
            }
        }

        /* ===== MOBILE NAV ===== */
        document.getElementById('navToggle').addEventListener('click', function () {
            const links = document.getElementById('navLinks');
            const isOpen = links.classList.toggle('open');
            this.setAttribute('aria-expanded', isOpen);
            this.querySelector('i').className = isOpen ? 'fas fa-times' : 'fas fa-bars';
        });

        /* Mobile dropdown toggle */
        document.querySelectorAll('.nav-links > li > a').forEach(link => {
            if (link.querySelector('.fa-chevron-down')) {
                link.addEventListener('click', function (e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        const dd = this.nextElementSibling;
                        if (dd && dd.classList.contains('dropdown-menu')) {
                            dd.classList.toggle('open');
                        }
                    }
                });
            }
        });

        /* ===== HERO CAROUSEL ===== */
        let heroIndex = 0;
        const heroSlides = document.querySelectorAll('.hero-slide');
        const heroDotsContainer = document.getElementById('heroDots');

        /* Create dots */
        heroSlides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.setAttribute('aria-label', 'Slide ' + (i + 1));
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToHeroSlide(i));
            heroDotsContainer.appendChild(dot);
        });

        function goToHeroSlide(idx) {
            heroSlides[heroIndex].classList.remove('active');
            heroDotsContainer.children[heroIndex].classList.remove('active');
            heroIndex = (idx + heroSlides.length) % heroSlides.length;
            heroSlides[heroIndex].classList.add('active');
            heroDotsContainer.children[heroIndex].classList.add('active');
        }

        function heroSlide(dir) { goToHeroSlide(heroIndex + dir); }

        /* Auto-slide every 5s */
        let heroAuto = setInterval(() => heroSlide(1), 5000);
        document.querySelector('.hero').addEventListener('mouseenter', () => clearInterval(heroAuto));
        document.querySelector('.hero').addEventListener('mouseleave', () => { heroAuto = setInterval(() => heroSlide(1), 5000); });

        /* ===== TESTIMONIAL SLIDER ===== */
        let testiIndex = 0;
        const testiItems = document.querySelectorAll('.testimonial-item');
        const testiDots = document.getElementById('testiDots').children;

        function goToTestimonial(idx) {
            testiItems[testiIndex].classList.remove('active');
            testiDots[testiIndex].classList.remove('active');
            testiIndex = (idx + testiItems.length) % testiItems.length;
            testiItems[testiIndex].classList.add('active');
            testiDots[testiIndex].classList.add('active');
        }

        setInterval(() => goToTestimonial(testiIndex + 1), 5000);

        /* ===== SCROLL EFFECTS ===== */
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        const navbar = document.getElementById('navbar');

        window.addEventListener('scroll', () => {
            /* Scroll to top button */
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
            /* Navbar shadow */
            if (window.scrollY > 10) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        /* ===== COUNTER ANIMATION ===== */
        function animateCounters() {
            document.querySelectorAll('.about-stat .num').forEach(el => {
                const target = parseInt(el.dataset.count);
                if (!target || el.dataset.animated) return;
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    el.dataset.animated = 'true';
                    let current = 0;
                    const step = Math.ceil(target / 60);
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) { current = target; clearInterval(timer); }
                        el.textContent = current.toLocaleString() + (el.parentElement.querySelector('.label').textContent === '% Pass Rate' ? '%' : '+');
                    }, 25);
                }
            });
        }

        /* ===== HOME ANIMATIONS ===== */
        function initHomeAnimations() {
            /* Reset counter animation */
            document.querySelectorAll('.about-stat .num').forEach(el => delete el.dataset.animated);
            /* Use IntersectionObserver for counters */
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(e => { if (e.isIntersecting) animateCounters(); });
            }, { threshold: 0.3 });
            const aboutStats = document.querySelector('.about-stats');
            if (aboutStats) observer.observe(aboutStats);
        }

        /* Initial trigger */
        initHomeAnimations();
        window.addEventListener('scroll', animateCounters);

        /* ===== GALLERY PAGE ===== */
        let filteredGallery = [...galleryData];

        function renderGalleryPage(cat) {
            filteredGallery = cat === 'all' ? [...galleryData] : galleryData.filter(g => g.cat === cat);
            const grid = document.getElementById('galleryPageGrid');
            grid.innerHTML = filteredGallery.map((g, i) =>
                '<div class="gp-item" onclick="openLightbox(' + i + ',true)" style="animation:fadeIn 0.3s ease ' + (i * 0.05) + 's both"><img src="' + g.src + '" alt="Gallery image" loading="lazy"><div class="gp-overlay"><i class="fas fa-search-plus"></i></div></div>'
            ).join('');
        }

        function filterGallery(cat, btn) {
            document.querySelectorAll('#page-gallery .news-tab').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            renderGalleryPage(cat);
        }

        /* ===== NEWS PAGE ===== */
        function renderNewsPage(cat) {
            const filtered = cat === 'all' ? newsData : newsData.filter(n => n.cat === cat);
            const grid = document.getElementById('newsGrid');
            const catColors = { news: 'var(--maroon)', events: '#27AE60', achievements: 'var(--gold)' };
            grid.innerHTML = filtered.map(n =>
                '<div class="card"><div class="card-img"><img src="' + n.img + '" alt="' + n.title + '" loading="lazy"><span class="card-tag" style="background:' + (catColors[n.cat] || 'var(--maroon)') + '">' + n.cat.charAt(0).toUpperCase() + n.cat.slice(1) + '</span></div><div class="card-body"><span style="font-size:0.78rem;color:var(--gold-dark);font-weight:600"><i class="far fa-calendar"></i> ' + n.date + '</span><h3>' + n.title + '</h3><p>' + n.desc + '</p></div></div>'
            ).join('');
        }

        function filterNews(cat, btn) {
            document.querySelectorAll('#newsTabs .news-tab').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            renderNewsPage(cat);
        }

        /* ===== LIGHTBOX ===== */
        let lightboxIndex = 0;
        let lightboxSource = 'home'; // 'home' or 'gallery'

        function openLightbox(idx, fromGallery) {
            lightboxSource = fromGallery ? 'gallery' : 'home';
            const data = lightboxSource === 'gallery' ? filteredGallery : galleryData.slice(0, 6);
            lightboxIndex = idx;
            document.getElementById('lightboxImg').src = data[lightboxIndex].src;
            document.getElementById('lightbox').classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            document.getElementById('lightbox').classList.remove('show');
            document.body.style.overflow = '';
        }

        function lightboxNav(dir) {
            const data = lightboxSource === 'gallery' ? filteredGallery : galleryData.slice(0, 6);
            lightboxIndex = (lightboxIndex + dir + data.length) % data.length;
            document.getElementById('lightboxImg').src = data[lightboxIndex].src;
        }

        /* Keyboard navigation for lightbox */
        document.addEventListener('keydown', (e) => {
            if (!document.getElementById('lightbox').classList.contains('show')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') lightboxNav(-1);
            if (e.key === 'ArrowRight') lightboxNav(1);
        });

        /* ===== ADMIN GALLERY ===== */
        function renderAdminGallery() {
            const grid = document.getElementById('adminGalleryGrid');
            grid.innerHTML = galleryData.map((g, i) =>
                '<div style="position:relative;border-radius:var(--radius);overflow:hidden;aspect-ratio:4/3;box-shadow:0 2px 10px var(--shadow)"><img src="' + g.src + '" alt="Gallery image" style="width:100%;height:100%;object-fit:cover" loading="lazy"><div style="position:absolute;top:0.5rem;right:0.5rem;display:flex;gap:0.25rem"><button class="edit-btn admin-actions" style="width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,0.9);color:#2980B9;display:flex;align-items:center;justify-content:center;font-size:0.7rem"><i class="fas fa-pen"></i></button><button class="del-btn admin-actions" style="width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,0.9);color:#C0392B;display:flex;align-items:center;justify-content:center;font-size:0.7rem" onclick="showToast(\'Image deleted successfully.\',\'success\')"><i class="fas fa-trash"></i></button></div><div style="position:absolute;bottom:0;left:0;right:0;padding:0.3rem 0.5rem;background:rgba(0,0,0,0.6);color:white;font-size:0.7rem;text-transform:uppercase">' + g.cat + '</div></div>'
            ).join('');
        }

        /* ===== ADMIN NEWS TABLE ===== */
        function renderAdminNews() {
            const body = document.getElementById('adminNewsBody');
            body.innerHTML = newsData.map(n =>
                '<tr><td>' + n.title + '</td><td>' + n.cat.charAt(0).toUpperCase() + n.cat.slice(1) + '</td><td>' + n.date + '</td><td><span class="status-badge active">Published</span></td><td class="admin-actions"><button class="edit-btn" onclick="showToast(\'News editor opened.\',\'info\')"><i class="fas fa-pen"></i></button><button class="del-btn" onclick="showToast(\'News deleted successfully.\',\'success\')"><i class="fas fa-trash"></i></button></td></tr>'
            ).join('');
        }

        /* ===== ADMIN LOGIN ===== */
        async function handleAdminLogin(e) {
            e.preventDefault();
            const user = document.getElementById('admin-user').value.trim();
            const pass = document.getElementById('admin-pass').value.trim();
            const errEl = document.getElementById('loginError');

            try {
                const res = await fetch(`${API_BASE}/api/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: user, password: pass })
                });
                const json = await res.json();

                if (json.status) {
                    errEl.style.display = 'none';
                    localStorage.setItem('schoolAdminToken', 'session_active');
                    localStorage.setItem('schoolAdminUser', json.data.name);
                    showToast('Login successful! Welcome, ' + json.data.name + '.', 'success');
                    setTimeout(() => navigateTo('admin-dashboard'), 500);
                } else {
                    errEl.textContent = '';
                    errEl.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + json.message;
                    errEl.style.display = 'block';
                }
            } catch (e) {
                errEl.innerHTML = '<i class="fas fa-exclamation-circle"></i> Cannot connect to server.';
                errEl.style.display = 'block';
            }
            return false;
        }

        function handleAdminLogout() {
            localStorage.removeItem('schoolAdminToken');
            localStorage.removeItem('schoolAdminUser');
            showToast('Logged out successfully.', 'info');
            navigateTo('home');
        }

        /* Check if already logged in on admin pages */
        (function checkAuth() {
            const token = localStorage.getItem('schoolAdminToken');
            if (!token && protectedPages.includes(currentPage)) {
                navigateTo('admin-login');
            }
        })();

        /* ===== CONTACT FORM ===== */
        async function handleContactForm(e) {
            e.preventDefault();
            let valid = true;
            const fields = [
                { id: 'cf-name', validate: v => v.trim().length >= 2 },
                { id: 'cf-phone', validate: v => /^[\+]?[0-9\s\-]{10,15}$/.test(v.trim()) },
                { id: 'cf-email', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
                { id: 'cf-subject', validate: v => v.trim().length > 0 },
                { id: 'cf-message', validate: v => v.trim().length >= 10 }
            ];

            fields.forEach(f => {
                const el = document.getElementById(f.id);
                const group = el.closest('.form-group');
                if (!f.validate(el.value)) {
                    group.classList.add('has-error');
                    valid = false;
                } else {
                    group.classList.remove('has-error');
                }
            });

            if (valid) {
                try {
                    const res = await fetch(`${API_BASE}/api/contact`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            name: document.getElementById('cf-name').value,
                            phone: document.getElementById('cf-phone').value,
                            email: document.getElementById('cf-email').value,
                            subject: document.getElementById('cf-subject').value,
                            message: document.getElementById('cf-message').value
                        })
                    });
                    const json = await res.json();
                    if (json.status) {
                        showToast(json.message, 'success');
                        e.target.reset();
                    } else {
                        showToast(json.message || 'Failed to send message.', 'error');
                    }
                } catch (e) {
                    showToast('Cannot connect to server. Message not sent.', 'error');
                }
            }
            return false;
        }

        /* Clear error on input */
        document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(el => {
            el.addEventListener('input', () => el.closest('.form-group').classList.remove('has-error'));
            el.addEventListener('change', () => el.closest('.form-group').classList.remove('has-error'));
        });

        /* ===== MODAL ===== */
        function closeModal(id) {
            document.getElementById(id).classList.remove('show');
            document.body.style.overflow = '';
        }

        /* ===== TOAST ===== */
        function showToast(message, type) {
            const container = document.getElementById('toastContainer');
            const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
            const toast = document.createElement('div');
            toast.className = 'toast ' + (type || 'info');
            toast.innerHTML = '<i class="fas ' + (icons[type] || icons.info) + '"></i>' + message;
            container.appendChild(toast);
            setTimeout(() => toast.remove(), 3200);
        }

        /* ===== ADMISSION POPUP ===== */
        function showAdmissionPopup() {
            setTimeout(() => {
                document.getElementById('admissionPopup').classList.add('show');
                document.body.style.overflow = 'hidden';
            }, 500);
        }

        // Show on initial load
        if (!currentPage.startsWith('admin-')) {
            showAdmissionPopup();
        }

        /* Close modal on overlay click */
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('show');
                    document.body.style.overflow = '';
                }
            });
        });

        /* ===== ADMIN DELETE BUTTONS ===== */
        document.addEventListener('click', (e) => {
            const delBtn = e.target.closest('.del-btn');
            if (delBtn && !delBtn.hasAttribute('onclick')) {
                const row = delBtn.closest('tr');
                if (row) {
                    row.style.transition = 'all 0.3s ease';
                    row.style.opacity = '0';
                    row.style.transform = 'translateX(20px)';
                    setTimeout(() => {
                        row.remove();
                        showToast('Record deleted successfully.', 'success');
                    }, 300);
                }
            }
        });

        /* ===== KEYBOARD ACCESSIBILITY ===== */
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal-overlay.show').forEach(m => {
                    m.classList.remove('show');
                    document.body.style.overflow = '';
                });
                closeLightbox();
            }
        });

        /* Load dynamic content on page init */
        async function loadSiteContent() {
            try {
                const res = await fetch(`${API_BASE}/api/content/school-info`);
                const json = await res.json();
                if (json.status) {
                    // Update announcement bar, footer, etc. with dynamic data
                    const d = json.data;
                    if (d.announcement_text) {
                        const marquee = document.querySelector('.marquee-content');
                        if (marquee) {
                            const items = d.announcement_text.split('|');
                            marquee.innerHTML = items.map(t =>
                                `<span><i class="fas fa-bullhorn"></i> ${t.trim()}</span>`
                            ).join('');
                        }
                    }
                }
            } catch (e) {
                console.warn('Content API unavailable.');
            }
        }

        // Boot
        loadSiteContent();