// script.js — detección automática de rutas + fondo por frames + i18n + toasts de logros
document.addEventListener('DOMContentLoaded', () => {

    const safeGet = id => {
        const el = document.getElementById(id);
        if (!el) console.warn(`[script.js] Elemento no encontrado: #${id}`);
        return el;
    };
    const clamp = (v,a,b) => Math.max(a, Math.min(b, v));

    /* ---------------------------------------------------- */
    /* SISTEMA DE IDIOMAS (I18N)            */
    /* ---------------------------------------------------- */
    
    const translations = {
        en: {
            player: "Player: Daniel Atienza",
            main_title: "Daniel Atienza: Portfolio",
            role: "Software Developer | VR/AR Enthusiast",
            quest_log: "QUEST LOG",
            quest_1: "> QUEST 1: Meet the Hero",
            quest_2: "> QUEST 2: Check Arsenal",
            quest_3: "> QUEST 3: Explore Adventures",
            about_title: "> About Me",
            about_p1: "I am a Computer Engineering student passionate about new technologies and continuous learning.",
            about_p2: "Currently, I work as CTO and Lead Programmer, focusing on strategic decision-making and creating a healthy and productive work environment.",
            about_p3: "My experience covers development with Unity, Photon, and Virtual Reality projects.",
            skills_title: "> Skill Arsenal",
            skill_english: "English B2",
            portfolio_title: "> Adventure Log",
            btn_all: "ALL",
            btn_exp: "EXPERIENCE",
            btn_proj: "PROJECTS",
            btn_edu: "EDUCATION",
            date_present: "Oct 2024 - Present",
            job_cto: "CTO & Lead Programmer",
            proj_vr_rev: "Virtual Revolution Project",
            btn_details: "More details",
            proj_personal: "Personal Project",
            btn_google: "View on Google Play",
            date_2020_present: "2020 - Present",
            edu_uni: "University of Almería",
            edu_degree: "Computer Engineering Degree",
            date_verajoker: "Apr 2019 - Sep 2019",
            job_tech: "IT Technician",
            date_esistemas: "Mar 2018 - Jun 2018",
            btn_youtube: "Watch on YouTube",
            edu_asir: "Network Computer Systems Administration",
            date_computerstore: "Mar 2015 - Jun 2015",
            edu_smr: "Microcomputer Systems and Networks",
            ach_start: "Start of the journey!",
            ach_mid: "Halfway there!",
            ach_end: "Goal reached!",
            ach_unlocked: "Achievement Unlocked: "
        },
        es: {
            player: "Jugador: Daniel Atienza",
            main_title: "Daniel Atienza: Portafolio",
            role: "Desarrollador de Software | Apasionado por VR/AR",
            quest_log: "REGISTRO DE MISIONES",
            quest_1: "> MISIÓN 1: Conoce al Héroe",
            quest_2: "> MISIÓN 2: Revisa el Arsenal",
            quest_3: "> MISIÓN 3: Explora Aventuras",
            about_title: "> Sobre Mí",
            about_p1: "Soy un estudiante de Ingeniería Informática apasionado por las nuevas tecnologías y el aprendizaje continuo.",
            about_p2: "Actualmente, desempeño el rol de CTO y lead de programación, enfocándome en decisiones estratégicas y crear un ambiente de trabajo saludable.",
            about_p3: "Mi experiencia abarca el desarrollo con Unity, Photon y proyectos en Realidad Virtual.",
            skills_title: "> Arsenal de Habilidades",
            skill_english: "Inglés B2",
            portfolio_title: "> Registro de Aventuras",
            btn_all: "TODOS",
            btn_exp: "EXPERIENCIA",
            btn_proj: "PROYECTOS",
            btn_edu: "ESTUDIOS",
            date_present: "Oct 2024 - Presente",
            job_cto: "CTO y Lead de Programación",
            proj_vr_rev: "Proyecto de Virtual Revolution",
            btn_details: "Más detalles",
            proj_personal: "Proyecto Personal",
            btn_google: "Ver en Google Play",
            date_2020_present: "2020 - Presente",
            edu_uni: "Universidad de Almería",
            edu_degree: "Grado en Ingeniería Informática",
            date_verajoker: "Abr 2019 - Sep 2019",
            job_tech: "Técnico Informático",
            date_esistemas: "Mar 2018 - Jun 2018",
            btn_youtube: "Ver en YouTube",
            edu_asir: "Administración de Sistemas Informáticos en Red",
            date_computerstore: "Mar 2015 - Jun 2015",
            edu_smr: "Sistemas Microinformáticos y Redes",
            ach_start: "¡Comienzo del viaje!",
            ach_mid: "¡Mitad del camino!",
            ach_end: "¡Meta alcanzada!",
            ach_unlocked: "Logro Desbloqueado: "
        }
    };

    let currentLang = localStorage.getItem('site-lang') || 'en'; // Inglés por defecto

    function updateLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('site-lang', lang);
        document.documentElement.lang = lang;

        // Actualizar textos simples del DOM
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Actualizar texto del botón
        const btn = safeGet('lang-toggle');
        if (btn) btn.textContent = lang === 'en' ? 'ES' : 'EN';

        // Reiniciar efecto máquina de escribir
        startTypewriter();
    }

    // Listener para el botón de idioma
    const langBtn = safeGet('lang-toggle');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'es' : 'en';
            updateLanguage(newLang);
        });
    }

    /* ---------------- TYPER TITLE (Adaptado a Idioma) ---------------- */
    let typerTimeout;
    function startTypewriter() {
        const titleElement = safeGet('main-title');
        if (titleElement) {
            if (typerTimeout) clearTimeout(typerTimeout); // Limpiar anterior si existe
            
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

    // Inicializar idioma al cargar
    updateLanguage(currentLang);

    /* ---------------- SMOOTH LINKS ---------------- */
    document.querySelectorAll('.quest-link').forEach(link=>{
        link.addEventListener('click', function(e){
            e.preventDefault();
            const t = document.querySelector(this.getAttribute('href'));
            if (t) t.scrollIntoView({behavior:'smooth'});
        });
    });

    /* --------------- FILTER PORTFOLIO -------------- */
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const portfolioCards = document.querySelectorAll('#portfolio-grid .card');
    filterButtons.forEach(btn=>{
        btn.addEventListener('click', ()=>{
            filterButtons.forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            portfolioCards.forEach(card=>{
                card.style.display = (filter==='all' || card.dataset.category===filter) ? 'block' : 'none';
            });
        });
    });

    /* ---------------------------------------------------- */
    /* BACKGROUND FRAME ANIMATION (Tu código original) */
    /* ---------------------------------------------------- */
    const animatedBackgroundDiv = safeGet('animated-background');
    const useImgElement = true; // menos flicker
    let bgImg = null;
    
    if (animatedBackgroundDiv && useImgElement) {
        bgImg = animatedBackgroundDiv.querySelector('#bg-img');
        if (!bgImg) {
            bgImg = document.createElement('img');
            bgImg.id = 'bg-img';
            bgImg.alt = 'fondo animado';
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

    if (!animatedBackgroundDiv) {
        console.warn('[script.js] #animated-background no existe — fondo animado desactivado.');
    }

    const totalFrames = 671; 
    const candidatePrefixes = [
        'backgrounds/frame_', 
        'backgrounds/bg_frame_',
        'backgrounds/frames/frame_',
        'frame_',              
        'bg_frame_',
        'frames/frame_'
    ];
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
        const tried = [];
        for (const prefix of candidatePrefixes) {
            for (const ext of candidateExts) {
                for (const pad of candidatePads) {
                    const url = `${prefix}${String(1).padStart(pad,'0')}.${ext}`;
                    tried.push(url);
                    try {
                        await loadImagePromise(url, 3000);
                        console.info(`[script.js] patrón detectado: prefix='${prefix}', ext='${ext}', pad=${pad} (ejemplo: ${url})`);
                        return { prefix, ext, pad };
                    } catch (err) { }
                }
            }
        }
        console.warn('[script.js] No se detectó patrón de frames. URLs probadas:', tried.slice(0,30));
        return null;
    }

    // INICIO DEL PRELOADER Y ANIMACION
    (async function initBackground() {
        const pattern = await detectFramePattern();
        if (!pattern) return; // Fallback fondo plano

        const { prefix, ext, pad } = pattern;
        const makeUrl = i => `${prefix}${String(i).padStart(pad,'0')}.${ext}`;

        // ---------- PRELOAD: CARGAR TODOS LOS FRAMES ----------
        const preloaded = new Map();
        let failedCount = 0;
        const maxParallel = 8;
        const retryOnFail = 1;

        function downloadFrame(idx, attempt = 0) {
            return loadImagePromise(makeUrl(idx), 15000)
                .then(img => {
                    preloaded.set(idx, img);
                    return { idx, ok: true };
                })
                .catch(err => {
                    if (attempt < retryOnFail) return downloadFrame(idx, attempt + 1);
                    failedCount++;
                    console.warn(`[preload] fallo frame ${idx}: ${err.message}`);
                    return { idx, ok: false };
                });
        }

        async function preloadAllFrames() {
            console.info('[preload] iniciando precarga de todos los frames, total=', totalFrames);
            const indices = Array.from({length: totalFrames}, (_,i)=>i+1);
            const results = [];
            let cursor = 0;
            const workers = new Array(Math.min(maxParallel, totalFrames)).fill(0).map(async () => {
                while (cursor < indices.length) {
                    const idx = indices[cursor++];
                    const res = await downloadFrame(idx);
                    results.push(res);
                }
            });

            await Promise.all(workers);
            const okCount = results.filter(r=>r.ok).length;
            console.info(`[preload] terminado. ok=${okCount}, failed=${failedCount}`);
            if (preloaded.has(1) && bgImg) bgImg.src = preloaded.get(1).src;
            window.__preloadedFrames = preloaded;
        }

        // Lanzar preload
        preloadAllFrames().catch(e => console.error('[preload] error fatal:', e));

        // Función de actualización expuesta globalmente para el scroll
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
            } else if (animatedBackgroundDiv) {
                const wanted = `url("${url}")`;
                if (animatedBackgroundDiv.style.backgroundImage !== wanted) animatedBackgroundDiv.style.backgroundImage = wanted;
            }
        }
        window.__updateAnimatedBackground = updateByPercent;

        if (preloaded.get(1) && preloaded.get(1).src && bgImg) bgImg.src = preloaded.get(1).src;
        console.info('[script.js] fondo por frames listo.');
    })();

    /* ------------- XP BAR + SCROLL THROTTLING ------------- */
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
                
                // Actualizar fondo si la función existe
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

    /* ----------------- LOGROS (Adaptados a Idioma) ----------------- */
    const achievementToastEl = safeGet('achievement-toast');
    // Ahora achievementList guarda la CLAVE de traducción, no el texto directo
    const achievementList = {
        'inicio': {unlocked:false, threshold:0, keyName: "ach_start"},
        'mitad':  {unlocked:false, threshold:50, keyName: "ach_mid"},
        'final':  {unlocked:false, threshold:99, keyName: "ach_end"}
    };

    function showAchievementToast(keyName) {
        // Construimos el mensaje usando el diccionario actual
        const msgPrefix = translations[currentLang].ach_unlocked;
        const msgBody = translations[currentLang][keyName];
        const text = `${msgPrefix}${msgBody}`;

        if (achievementToastEl) {
            achievementToastEl.textContent = text;
            achievementToastEl.classList.add('show');
            setTimeout(()=> achievementToastEl.classList.remove('show'), 3000);
            return;
        }
        
        // Fallback si no hay elemento HTML para el toast
        const tmp = document.createElement('div');
        tmp.textContent = text;
        Object.assign(tmp.style, {
            position:'fixed', left:'50%', bottom:'24px', transform:'translateX(-50%)',
            background:'#00ff9d', color:'#001', padding:'10px 16px',
            borderRadius:'6px', zIndex:3000, fontFamily:'sans-serif', boxShadow:'0 6px 18px rgba(0,0,0,0.4)'
        });
        document.body.appendChild(tmp);
        setTimeout(()=> tmp.remove(), 2600);
    }

    function unlockAchievement(key) {
        const a = achievementList[key];
        if (!a || a.unlocked) return;
        a.unlocked = true;
        // Pasamos la clave (ej: "ach_start") para que se traduzca al mostrarse
        showAchievementToast(a.keyName);
    }

    function checkAchievements(pct) {
        if (pct >= achievementList['inicio'].threshold) unlockAchievement('inicio');
        if (pct >= achievementList['mitad'].threshold) unlockAchievement('mitad');
        if (pct >= achievementList['final'].threshold) unlockAchievement('final');
    }
    
    // Desbloqueo inicial
    unlockAchievement('inicio');

    console.info('[script.js] cargado. Iniciando detección de frames + i18n...');
});