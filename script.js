document.addEventListener('DOMContentLoaded', () => {

    const safeGet = id => {
        const el = document.getElementById(id);
        if (!el) console.warn(`[script.js] Elemento no encontrado: #${id}`);
        return el;
    };
    const clamp = (v,a,b) => Math.max(a, Math.min(b, v));

    /* ---------------------------------------------------- */
    /* LOGICA TEMA OSCURO / CLARO                           */
    /* ---------------------------------------------------- */
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

    /* ---------------------------------------------------- */
    /* SISTEMA DE IDIOMAS (I18N) PROFESIONAL                */
    /* ---------------------------------------------------- */
    const translations = {
        en: {
            player: "Daniel Atienza",
            main_title: "Daniel Atienza",
            role: "Software Developer | VR/AR Enthusiast",
            quest_1: "About Me",
            quest_2: "Skills",
            quest_3: "Portfolio",
            about_title: "About Me",
            about_p1: "I am a Computer Engineer with a strong passion for emerging technologies and continuous learning.",
            about_p2: "Currently, I work as CTO and Lead Programmer, driving strategic decision-making and fostering a healthy, productive team environment.",
            about_p3: "My experience covers development with Unity, Photon, Mirror and Virtual Reality projects.",
            skills_title: "Skills & Technologies",
            skill_english: "English B2",
            portfolio_title: "Experience & Projects",
            btn_all: "All",
            btn_exp: "Experience",
            btn_proj: "Projects",
            btn_tools: "Unity Tools",
            btn_edu: "Education",
            date_present: "Oct 2024 - Present",
            job_cto: "CTO & Lead Programmer",
            proj_vr_rev: "Virtual Revolution Project",
            proj_personal: "Personal Project",
            badge_tool: "Unity Asset Store Tool",
            tech_native_pico: "Developed natively for PICO 4 Ultra Enterprise.",
            tech_ported_pico: "Originally developed for Quest 2; later ported and optimized for PICO 4 Ultra Enterprise.",
            tech_quest2: "Original launch natively developed for Meta Quest 2.",
            tech_mobile: "Mobile casual game developed with Unity & C#.",
            tech_ue4: "Early exploration in 3D game mechanics & level design using UE4.",
            date_inv_pro: "Latest release date: May 2026",
            date_groove: "Latest release date: February 2026",
            date_inv_lite: "Latest release date: February 2026",
            date_sniper: "Latest release date: January 2026",
            date_creature: "Latest release date: November 2025",
            desc_inv_pro: "Advanced and modular inventory framework designed for professional Unity projects.",
            desc_groove: "Comprehensive modular kit with custom shaders, meshes, and physics for slot car racing systems.",
            desc_inv_lite: "Lightweight and highly performant inventory system architecture for fast Unity integration.",
            desc_sniper: "Realistic ballistics, scope optics mechanics, and weapon system template for Unity.",
            desc_creature: "Advanced IK and procedural animation solver system for multi-legged creatures in Unity.",
            btn_assetstore: "View on Asset Store \u2192",
            btn_details: "More details \u2192",
            btn_google: "View on Google Play \u2192",
            date_uni: "2020 - 2025",
            edu_uni: "University of Almería",
            edu_degree: "Computer Engineering Degree",
            date_verajoker: "Apr 2019 - Sep 2019",
            job_tech: "IT Technician",
            date_esistemas: "Mar 2018 - Jun 2018",
            btn_youtube: "Watch on YouTube \u2192",
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
            role: "Desarrollador de Software | Entusiasta VR/AR",
            quest_1: "Sobre mí",
            quest_2: "Habilidades",
            quest_3: "Portafolio",
            about_title: "Sobre mí",
            about_p1: "Soy Ingeniero Informático, un apasionado de las nuevas tecnologías y del aprendizaje continuo.",
            about_p2: "Actualmente, me desempeño como CTO y Lead Programmer, liderando la toma de decisiones estratégicas y promoviendo un entorno de trabajo saludable y productivo.",
            about_p3: "Mi experiencia abarca el desarrollo con Unity, Photon, Mirror y proyectos en Realidad Virtual.",
            skills_title: "Habilidades y Tecnologías",
            skill_english: "Inglés B2",
            portfolio_title: "Experiencia y Proyectos",
            btn_all: "Todo",
            btn_exp: "Experiencia",
            btn_proj: "Proyectos",
            btn_tools: "Herramientas Unity",
            btn_edu: "Formación",
            date_present: "Oct 2024 - Presente",
            job_cto: "CTO y Lead de Programación",
            proj_vr_rev: "Proyecto de Virtual Revolution",
            proj_personal: "Proyecto Personal",
            badge_tool: "Herramienta de Unity Asset Store",
            tech_native_pico: "Desarrollado de forma nativa para PICO 4 Ultra Enterprise.",
            tech_ported_pico: "Desarrollado originalmente para Quest 2; posteriormente portado y optimizado para PICO 4 Ultra Enterprise.",
            tech_quest2: "Lanzamiento original desarrollado nativamente para Meta Quest 2.",
            tech_mobile: "Juego casual para móvil desarrollado en Unity y C#.",
            tech_ue4: "Exploración temprana de mecánicas 3D y diseño de niveles usando UE4.",
            date_inv_pro: "Última actualización: Mayo 2026",
            date_groove: "Última actualización: Febrero 2026",
            date_inv_lite: "Última actualización: Febrero 2026",
            date_sniper: "Última actualización: Enero 2026",
            date_creature: "Última actualización: Noviembre 2025",
            desc_inv_pro: "Sistema de inventario modular avanzado diseñado para proyectos profesionales en Unity.",
            desc_groove: "Kit modular completo con shaders personalizados, mallas y físicas para circuitos de slot cars.",
            desc_inv_lite: "Arquitectura de inventario ligera y de alto rendimiento para una rápida integración en Unity.",
            desc_sniper: "Balística realista, mecánicas de ópticas de mira y plantilla de sistema de armas para Unity.",
            desc_creature: "Sistema avanzado de resolución IK y animación procedimental para criaturas multípedo en Unity.",
            btn_assetstore: "Ver en Asset Store \u2192",
            btn_details: "Más detalles \u2192",
            btn_google: "Ver en Google Play \u2192",
            date_uni: "2020 - 2025",
            edu_uni: "Universidad de Almería",
            edu_degree: "Grado en Ingeniería Informática",
            date_verajoker: "Abr 2019 - Sep 2019",
            job_tech: "Técnico Informático",
            date_esistemas: "Mar 2018 - Jun 2018",
            btn_youtube: "Ver en YouTube \u2192",
            edu_asir: "Administración de Sistemas Informáticos en Red",
            date_computerstore: "Mar 2015 - Jun 2015",
            edu_smr: "Sistemas Microinformáticos y Redes",
            ach_start: "Bienvenido a mi portafolio",
            ach_mid: "Revisando experiencia...",
            ach_end: "¡Gracias por leer!",
            ach_unlocked: ""
        }
    };

    let currentLang = localStorage.getItem('site-lang') || 'en';

    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('site-lang', lang);
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
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

    let typerTimeout;
    function startTypewriter() {
        const titleElement = safeGet('main-title');
        if (titleElement) {
            if (typerTimeout) clearTimeout(typerTimeout); 
            const titleText = translations[currentLang].main_title;
            titleElement.textContent = "";
            let ci = 0;
            (function type(){
                if (ci < titleText.length) {
                    titleElement.textContent += titleText.charAt(ci++);
                    typerTimeout = setTimeout(type, 100);
                }
            })();
        }
    }
    updateLanguage(currentLang);

    /* ---------------- SMOOTH LINKS ---------------- */
    document.querySelectorAll('.nav-link').forEach(link=>{
        link.addEventListener('click', function(e){
            e.preventDefault();
            const t = document.querySelector(this.getAttribute('href'));
            if (t) t.scrollIntoView({behavior:'smooth'});
        });
    });

    /* --------------- FILTER PORTFOLIO -------------- */
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

    /* ---------------------------------------------------- */
    /* BACKGROUND FRAME ANIMATION (CON CANVAS SILENCIOSO)   */
    /* ---------------------------------------------------- */
    const canvas = safeGet('bg-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;

    if (canvas) {
        canvas.width = 320;
        canvas.height = 180;
    }

    const totalFrames = 671; 
    const candidatePrefixes = ['backgrounds/frame_','backgrounds/bg_frame_','backgrounds/frames/frame_','frame_','bg_frame_','frames/frame_'];
    const candidateExts = ['png','jpg','webp'];
    const candidatePads = [3,4]; 

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
                    const url = `${prefix}${String(1).padStart(pad,'0')}.${ext}`;
                    try {
                        await loadImagePromise(url);
                        return { prefix, ext, pad };
                    } catch (err) { }
                }
            }
        }
        return null;
    }

    (async function initBackground() {
        const pattern = await detectFramePattern();
        if (!pattern) return;

        const { prefix, ext, pad } = pattern;
        const makeUrl = i => `${prefix}${String(i).padStart(pad,'0')}.${ext}`;

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
            } catch (err) { 
                // Silenciado intencionalmente
            }
        }

        async function preloadAllFrames() {
            const indices = Array.from({length: totalFrames}, (_,i)=>i+1);
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
    
    /* ------------- SCROLL PROGRESS + ACHIEVEMENTS ------------- */
    const xpBar = safeGet('xp-bar');
    function getScrollPercent() {
        const doc = document.documentElement;
        const scrollable = Math.max(doc.scrollHeight - window.innerHeight, 1);
        return (window.scrollY / scrollable) * 100;
    }

    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(()=>{
                ticking = false;
                const pct = getScrollPercent();
                if (xpBar) xpBar.style.width = `${Math.min(pct,100)}%`;
                if (typeof window.__updateAnimatedBackground === 'function') {
                    window.__updateAnimatedBackground(pct);
                }
                checkAchievements(pct);
            });
            ticking = true;
        }
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', onScroll);
    onScroll(); 

    /* ----------------- NOTIFICATIONS (Toasts) ----------------- */
    const achievementToastEl = safeGet('achievement-toast');
    const achievementList = {
        'inicio': {unlocked:false, threshold:0, keyName: "ach_start"},
        'mitad':  {unlocked:false, threshold:50, keyName: "ach_mid"},
        'final':  {unlocked:false, threshold:99, keyName: "ach_end"}
    };

    function showAchievementToast(keyName) {
        const msgPrefix = translations[currentLang].ach_unlocked;
        const msgBody = translations[currentLang][keyName];
        const text = `${msgPrefix}${msgBody}`;

        if (achievementToastEl) {
            achievementToastEl.textContent = text;
            achievementToastEl.classList.add('show');
            setTimeout(()=> achievementToastEl.classList.remove('show'), 3000);
        }
    }

    function unlockAchievement(key) {
        const a = achievementList[key];
        if (!a || a.unlocked) return;
        a.unlocked = true;
        showAchievementToast(a.keyName);
    }

    function checkAchievements(pct) {
        if (pct >= achievementList['inicio'].threshold) unlockAchievement('inicio');
        if (pct >= achievementList['mitad'].threshold) unlockAchievement('mitad');
        if (pct >= achievementList['final'].threshold) unlockAchievement('final');
    }
});