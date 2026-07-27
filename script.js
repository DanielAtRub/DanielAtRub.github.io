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
    let currentTheme = localStorage.getItem('site-theme') || 'dark'; // Oscuro por defecto

    function updateTheme(theme) {
        currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('site-theme', theme);
        if (themeToggleBtn) {
            themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
    
    updateTheme(currentTheme); // Inicializar

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
            about_p3: "My experience covers development with Unity, Photon, and Virtual Reality projects.",
            skills_title: "Skills & Technologies",
            skill_english: "English B2",
            portfolio_title: "Experience & Projects",
            btn_all: "All",
            btn_exp: "Experience",
            btn_proj: "Projects",
            btn_edu: "Education",
            date_present: "Oct 2024 - Present",
            job_cto: "CTO & Lead Programmer",
            proj_vr_rev: "Virtual Revolution Project",
            btn_details: "More details \u2192",
            proj_personal: "Personal Project",
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
            about_p3: "Mi experiencia abarca el desarrollo con Unity, Photon y proyectos en Realidad Virtual.",
            skills_title: "Habilidades y Tecnologías",
            skill_english: "Inglés B2",
            portfolio_title: "Experiencia y Proyectos",
            btn_all: "Todo",
            btn_exp: "Experiencia",
            btn_proj: "Proyectos",
            btn_edu: "Formación",
            date_present: "Oct 2024 - Presente",
            job_cto: "CTO y Lead de Programación",
            proj_vr_rev: "Proyecto de Virtual Revolution",
            btn_details: "Más detalles \u2192",
            proj_personal: "Proyecto Personal",
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

    // Función para aplicar el filtro visualmente
    function applyFilter(filter) {
        portfolioCards.forEach(card => {
            card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'flex' : 'none';
        });
    }

    // Eventos de click para los botones
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilter(btn.dataset.filter);
        });
    });

    // Ejecutar el filtro activo por defecto al cargar la página
    const defaultActiveBtn = document.querySelector('.filter-btn.active');
    if (defaultActiveBtn) {
        applyFilter(defaultActiveBtn.dataset.filter);
    }

    /* ---------------------------------------------------- */
    /* BACKGROUND FRAME ANIMATION (Intacto)                 */
    /* ---------------------------------------------------- */
    const animatedBackgroundDiv = safeGet('animated-background');
    const useImgElement = true;
    let bgImg = null;
    
    if (animatedBackgroundDiv && useImgElement) {
        bgImg = animatedBackgroundDiv.querySelector('#bg-img');
        if (!bgImg) {
            bgImg = document.createElement('img');
            bgImg.id = 'bg-img';
            bgImg.alt = '';
            bgImg.draggable = false;
            bgImg.style.width = '100vw';
            bgImg.style.height = '100vh';
            bgImg.style.objectFit = 'cover';
            bgImg.style.display = 'block';
            bgImg.style.pointerEvents = 'none';
            bgImg.style.userSelect = 'none';
            animatedBackgroundDiv.appendChild(bgImg);
        }
    }

    const totalFrames = 671; 
    const candidatePrefixes = ['backgrounds/frame_','backgrounds/bg_frame_','backgrounds/frames/frame_','frame_','bg_frame_','frames/frame_'];
    const candidateExts = ['png','jpg','webp'];
    const candidatePads = [3,4]; 

    function loadImagePromise(url, timeoutMs=5000) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            let done = false;
            const onSuccess = () => { if(done) return; done = true; img.onload = img.onerror = null; resolve(img); };
            const onError = () => { if(done) return; done = true; img.onload = img.onerror = null; reject(new Error('load error')); };
            img.onload = onSuccess;
            img.onerror = onError;
            img.src = url;
            if (timeoutMs) setTimeout(()=> { if(!done) { done = true; img.onload = img.onerror = null; reject(new Error('timeout')); } }, timeoutMs);
        });
    }

    async function detectFramePattern() {
        for (const prefix of candidatePrefixes) {
            for (const ext of candidateExts) {
                for (const pad of candidatePads) {
                    const url = `${prefix}${String(1).padStart(pad,'0')}.${ext}`;
                    try {
                        await loadImagePromise(url, 3000);
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
        const maxParallel = 8;

        function downloadFrame(idx, attempt = 0) {
            return loadImagePromise(makeUrl(idx), 15000)
                .then(img => { preloaded.set(idx, img); return { idx, ok: true }; })
                .catch(err => {
                    if (attempt < 1) return downloadFrame(idx, attempt + 1);
                    return { idx, ok: false };
                });
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
            if (preloaded.has(1) && bgImg) bgImg.src = preloaded.get(1).src;
        }

        preloadAllFrames().catch(e => console.error(e));

        let lastIndex = -1;
        function updateByPercent(pct) {
            if (!animatedBackgroundDiv) return;
            const clamped = clamp(pct,0,100);
            let idx = Math.ceil((clamped/100)*(totalFrames-1))+1;
            idx = clamp(idx,1,totalFrames);
            if (idx === lastIndex) return;
            lastIndex = idx;
            const url = makeUrl(idx);

            if (bgImg) {
                const curSrc = bgImg.src || '';
                const pre = preloaded.get(idx);
                if (pre && pre.src && !curSrc.endsWith(pre.src)) {
                    bgImg.src = pre.src;
                } else if (!curSrc.endsWith(url)) {
                    bgImg.src = url;
                }
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