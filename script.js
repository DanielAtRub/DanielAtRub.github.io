document.addEventListener('DOMContentLoaded', () => {
    const safeGet = id => {
        const el = document.getElementById(id);
        if (!el) console.warn(`[script.js] Elemento no encontrado: #${id}`);
        return el;
    };

    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    /* ===================================================== */
    /* THEME                                                 */
    /* ===================================================== */
    const themeToggleBtn = safeGet('theme-toggle');
    let currentTheme = localStorage.getItem('site-theme') || 'dark';

    function updateTheme(theme) {
        currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('site-theme', theme);
        if (themeToggleBtn) {
            themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    updateTheme(currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            updateTheme(newTheme);
        });
    }

    /* ===================================================== */
    /* TRANSLATIONS                                          */
    /* ===================================================== */
    const translations = {
        en: {
            player: "Daniel Atienza",
            main_title: "Daniel Atienza",
            role: "Unity & VR Developer | C# Programmer",
            hero_description: "I build immersive VR experiences, gameplay systems and technical tools with Unity and C#.",
            available_text: "Available for new opportunities",
            quest_1: "About Me",
            quest_2: "Skills",
            quest_3: "Experience & Projects",
            about_title: "About Me",
            about_p1: "I am a Computer Engineer and Unity Developer specialized in VR, gameplay programming and interactive experiences.",
            about_p2: "Over the last years, I have worked on commercial VR projects for Meta Quest and PICO platforms, contributing to gameplay systems, multiplayer features, optimization and technical architecture.",
            about_p3: "I have also taken technical leadership responsibilities, including architecture decisions and team coordination, while remaining closely involved in development.",
            skills_title: "Skills & Technologies",
            skill_english: "English B2",
            cat_core: "Core Technologies",
            cat_architecture: "Software Architecture & Engineering",
            cat_vr: "VR & Gameplay",
            portfolio_title: "Experience & Projects",
            btn_all: "All",
            btn_exp: "Experience",
            btn_proj: "Projects",
            btn_tools: "Unity Tools",
            btn_edu: "Education",
            date_present: "Oct 2024 - Present",
            job_cto: "Lead VR Programmer",
            job_vr_description: "Unity development for commercial VR experiences, including gameplay, multiplayer systems, optimization and technical architecture.",
            proj_vr_rev: "Virtual Revolution Project",
            proj_personal: "Personal Project",
            badge_tool: "Unity Asset Store Tool",
            tech_native_pico: "Developed natively for PICO 4 Ultra Enterprise.",
            tech_ported_pico: "Originally developed for Quest 2 and later ported and optimized for PICO 4 Ultra Enterprise.",
            tech_quest2: "Original launch developed natively for Meta Quest 2.",
            tech_mobile: "Mobile casual game developed with Unity & C#.",
            date_inv_pro: "Latest update: May 2026",
            date_groove: "Latest update: February 2026",
            date_inv_lite: "Latest update: February 2026",
            date_sniper: "Latest update: January 2026",
            date_creature: "Latest update: November 2025",
            desc_inv_pro: "Advanced modular inventory framework designed for professional Unity projects.",
            desc_groove: "Modular racing kit featuring custom shaders, meshes and physics systems.",
            desc_inv_lite: "Lightweight and performance-oriented inventory system for Unity.",
            desc_sniper: "Realistic ballistics, scope mechanics and modular weapon-system architecture.",
            desc_creature: "Procedural IK and animation system for multi-legged creatures.",
            btn_assetstore: "View on Asset Store →",
            btn_details: "More details →",
            btn_google: "View on Google Play →",
            date_uni: "2020 - 2026",
            edu_uni: "University of Almería",
            edu_degree: "Computer Engineering Degree",
            date_verajoker: "Apr 2019 - Sep 2019",
            job_tech: "IT Technician",
            date_esistemas: "Mar 2018 - Jun 2018",
            edu_asir: "Network Computer Systems Administration",
            date_computerstore: "Mar 2015 - Jun 2015",
            edu_smr: "Microcomputer Systems and Networks",
            ach_start: "Welcome to my portfolio",
            ach_mid: "Reviewing experience...",
            ach_end: "Thanks for reading!",
            ach_unlocked: ""
        },
        es: {
            player: "Daniel Atienza",
            main_title: "Daniel Atienza",
            role: "Unity & VR Developer | Programador C#",
            hero_description: "Desarrollo experiencias de Realidad Virtual, sistemas de gameplay y herramientas técnicas con Unity y C#.",
            available_text: "Disponible para nuevas oportunidades",
            quest_1: "Sobre mí",
            quest_2: "Habilidades",
            quest_3: "Experiencia y Proyectos",
            about_title: "Sobre mí",
            about_p1: "Soy Ingeniero Informático y Unity Developer especializado en Realidad Virtual, programación de gameplay y experiencias interactivas.",
            about_p2: "Durante los últimos años he trabajado en proyectos comerciales de VR para Meta Quest y PICO, participando en sistemas de gameplay, funcionalidades multijugador, optimización y arquitectura técnica.",
            about_p3: "También he asumido responsabilidades de liderazgo técnico, incluyendo decisiones de arquitectura y coordinación de equipos, manteniéndome directamente involucrado en el desarrollo.",
            skills_title: "Habilidades y Tecnologías",
            skill_english: "Inglés B2",
            cat_core: "Tecnologías Principales",
            cat_architecture: "Arquitectura e Ingeniería de Software",
            cat_vr: "VR y Gameplay",
            portfolio_title: "Experiencia y Proyectos",
            btn_all: "Todo",
            btn_exp: "Experiencia",
            btn_proj: "Proyectos",
            btn_tools: "Herramientas Unity",
            btn_edu: "Formación",
            date_present: "Oct 2024 - Presente",
            job_cto: "Lead VR Programmer",
            job_vr_description: "Desarrollo de experiencias VR comerciales con Unity, incluyendo gameplay, sistemas multijugador, optimización y arquitectura técnica.",
            proj_vr_rev: "Proyecto de Virtual Revolution",
            proj_personal: "Proyecto Personal",
            badge_tool: "Herramienta de Unity Asset Store",
            tech_native_pico: "Desarrollado de forma nativa para PICO 4 Ultra Enterprise.",
            tech_ported_pico: "Desarrollado originalmente para Quest 2 y posteriormente portado y optimizado para PICO 4 Ultra Enterprise.",
            tech_quest2: "Lanzamiento original desarrollado nativamente para Meta Quest 2.",
            tech_mobile: "Juego casual para móvil desarrollado con Unity y C#.",
            date_inv_pro: "Última actualización: Mayo 2026",
            date_groove: "Última actualización: Febrero 2026",
            date_inv_lite: "Última actualización: Febrero 2026",
            date_sniper: "Última actualización: Enero 2026",
            date_creature: "Última actualización: Noviembre 2025",
            desc_inv_pro: "Sistema de inventario modular avanzado diseñado para proyectos profesionales en Unity.",
            desc_groove: "Kit modular de carreras con shaders, mallas y sistemas de físicas personalizados.",
            desc_inv_lite: "Sistema de inventario ligero y orientado al rendimiento para Unity.",
            desc_sniper: "Balística realista, mecánicas de óptica y arquitectura modular para sistemas de armas.",
            desc_creature: "Sistema de IK y animación procedimental para criaturas multípedo.",
            btn_assetstore: "Ver en Asset Store →",
            btn_details: "Más detalles →",
            btn_google: "Ver en Google Play →",
            date_uni: "2020 - 2026",
            edu_uni: "Universidad de Almería",
            edu_degree: "Grado en Ingeniería Informática",
            date_verajoker: "Abr 2019 - Sep 2019",
            job_tech: "Técnico Informático",
            date_esistemas: "Mar 2018 - Jun 2018",
            edu_asir: "Administración de Sistemas Informáticos en Red",
            date_computerstore: "Mar 2015 - Jun 2015",
            edu_smr: "Sistemas Microinformáticos y Redes",
            ach_start: "Bienvenido a mi portafolio",
            ach_mid: "Revisando experiencia...",
            ach_end: "¡Gracias por leer!",
            ach_unlocked: ""
        }
    };

    /* ===================================================== */
    /* LANGUAGE                                              */
    /* ===================================================== */
    let currentLang = localStorage.getItem('site-lang') || 'en';

    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('site-lang', lang);
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        const btn = safeGet('lang-toggle');
        if (btn) btn.textContent = lang === 'en' ? 'ES' : 'EN';
        startTypewriter();
    }

    const langBtn = safeGet('lang-toggle');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'es' : 'en';
            updateLanguage(newLang);
        });
    }

    /* ===================================================== */
    /* TYPEWRITER                                            */
    /* ===================================================== */
    let typerTimeout;

    function startTypewriter() {
        const titleElement = safeGet('main-title');
        if (!titleElement) return;
        if (typerTimeout) clearTimeout(typerTimeout);

        const titleText = translations[currentLang].main_title;
        titleElement.textContent = "";
        let ci = 0;

        (function type() {
            if (ci < titleText.length) {
                titleElement.textContent += titleText.charAt(ci++);
                typerTimeout = setTimeout(type, 100);
            }
        })();
    }

    updateLanguage(currentLang);

    /* ===================================================== */
    /* SMOOTH LINKS                                          */
    /* ===================================================== */
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ===================================================== */
    /* PORTFOLIO FILTER                                      */
    /* ===================================================== */
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const portfolioCards = document.querySelectorAll('#portfolio-grid .card');

    function applyFilter(filter) {
        portfolioCards.forEach(card => {
            card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'flex' : 'none';
        });
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilter(btn.dataset.filter);
        });
    });

    const defaultActiveBtn = document.querySelector('.filter-btn.active');
    if (defaultActiveBtn) {
        applyFilter(defaultActiveBtn.dataset.filter);
    }

    /* ===================================================== */
    /* BACKGROUND ANIMATION                                  */
    /* ===================================================== */
    const canvas = safeGet('bg-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;

    if (canvas) {
        canvas.width = 320;
        canvas.height = 180;
    }

    const totalFrames = 671;
    const candidatePrefixes = ['backgrounds/frame_', 'backgrounds/bg_frame_', 'backgrounds/frames/frame_', 'frame_', 'bg_frame_', 'frames/frame_'];
    const candidateExts = ['png', 'jpg', 'webp'];
    const candidatePads = [3, 4];

    function loadImagePromise(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error('load error'));
            img.src = url;
        });
    }

    async function detectFramePattern() {
        for (const prefix of candidatePrefixes) {
            for (const ext of candidateExts) {
                for (const pad of candidatePads) {
                    const url = `${prefix}${String(1).padStart(pad, '0')}.${ext}`;
                    try {
                        await loadImagePromise(url);
                        return { prefix, ext, pad };
                    } catch (err) {}
                }
            }
        }
        return null;
    }

    (async function initBackground() {
        const pattern = await detectFramePattern();
        if (!pattern) return;

        const { prefix, ext, pad } = pattern;
        const makeUrl = i => `${prefix}${String(i).padStart(pad, '0')}.${ext}`;
        const preloaded = new Map();
        const maxParallel = 10;
        let firstFrameDrawn = false;

        async function downloadFrame(idx) {
            try {
                const img = await loadImagePromise(makeUrl(idx));
                preloaded.set(idx, img);

                if (idx === 1 && ctx) {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    if (!firstFrameDrawn) {
                        canvas.classList.add('loaded');
                        firstFrameDrawn = true;
                    }
                }
            } catch (err) {}
        }

        async function preloadAllFrames() {
            const indices = Array.from({ length: totalFrames }, (_, i) => i + 1);
            let cursor = 0;
            const workers = new Array(Math.min(maxParallel, totalFrames)).fill(0).map(async () => {
                while (cursor < indices.length) {
                    const idx = indices[cursor++];
                    await downloadFrame(idx);
                }
            });
            await Promise.all(workers);
        }

        preloadAllFrames();

        let lastIndex = -1;
        function updateByPercent(pct) {
            if (!ctx) return;
            const clamped = clamp(pct, 0, 100);
            let idx = Math.ceil((clamped / 100) * (totalFrames - 1)) + 1;
            idx = clamp(idx, 1, totalFrames);

            if (idx === lastIndex) return;
            lastIndex = idx;

            const pre = preloaded.get(idx);
            if (pre) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(pre, 0, 0, canvas.width, canvas.height);
            }
        }
        window.__updateAnimatedBackground = updateByPercent;
    })();

    /* ===================================================== */
    /* SCROLL PROGRESS                                       */
    /* ===================================================== */
    const xpBar = safeGet('xp-bar');

    function getScrollPercent() {
        const doc = document.documentElement;
        const scrollable = Math.max(doc.scrollHeight - window.innerHeight, 1);
        return (window.scrollY / scrollable) * 100;
    }

    let ticking = false;

    function onScroll() {
        if (ticking) return;
        requestAnimationFrame(() => {
            ticking = false;
            const pct = getScrollPercent();
            if (xpBar) {
                xpBar.style.width = `${Math.min(pct, 100)}%`;
            }
            if (typeof window.__updateAnimatedBackground === 'function') {
                window.__updateAnimatedBackground(pct);
            }
            checkAchievements(pct);
        });
        ticking = true;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    /* ===================================================== */
    /* ACHIEVEMENTS                                          */
    /* ===================================================== */
    const achievementToastEl = safeGet('achievement-toast');

    const achievementList = {
        inicio: { unlocked: false, threshold: 0, keyName: "ach_start" },
        mitad: { unlocked: false, threshold: 50, keyName: "ach_mid" },
        final: { unlocked: false, threshold: 99, keyName: "ach_end" }
    };

    function showAchievementToast(keyName) {
        const msgPrefix = translations[currentLang].ach_unlocked;
        const msgBody = translations[currentLang][keyName];
        const text = `${msgPrefix}${msgBody}`;

        if (achievementToastEl) {
            achievementToastEl.textContent = text;
            achievementToastEl.classList.add('show');
            setTimeout(() => achievementToastEl.classList.remove('show'), 3000);
        }
    }

    function unlockAchievement(key) {
        const a = achievementList[key];
        if (!a || a.unlocked) return;
        a.unlocked = true;
        showAchievementToast(a.keyName);
    }

    function checkAchievements(pct) {
        if (pct >= achievementList.inicio.threshold) unlockAchievement('inicio');
        if (pct >= achievementList.mitad.threshold) unlockAchievement('mitad');
        if (pct >= achievementList.final.threshold) unlockAchievement('final');
    }
});