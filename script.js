// script.js — detección automática de rutas + fondo por frames + toasts de logros
document.addEventListener('DOMContentLoaded', () => {

  const safeGet = id => {
    const el = document.getElementById(id);
    if (!el) console.warn(`[script.js] Elemento no encontrado: #${id}`);
    return el;
  };
  const clamp = (v,a,b) => Math.max(a, Math.min(b, v));

  /* ---------------- TYPER TITLE ---------------- */
  const titleElement = safeGet('main-title');
  if (titleElement) {
    const titleText = "Daniel Atienza: Portfolio";
    let ci = 0;
    (function type(){
      if (ci < titleText.length) {
        titleElement.textContent += titleText.charAt(ci++);
        setTimeout(type, 100);
      }
    })();
  }

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

  /* ---------- BACKGROUND FRAME ANIMATION ---------- */
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

  // si no hay div para el fondo, no rompemos; dejamos el fondo plano.
  if (!animatedBackgroundDiv) {
    console.warn('[script.js] #animated-background no existe — fondo animado desactivado.');
  }

  // Configurables iniciales (si quieres fijar manualmente, cámbialos aquí)
  const totalFrames = 671; // deja esto según tus recursos
  // CANDIDATOS que vamos a probar automáticamente (prefijos relativos)
  const candidatePrefixes = [
    'backgrounds/frame_',  // /backgrounds/frame_001.png
    'backgrounds/bg_frame_',
    'backgrounds/frames/frame_',
    'frame_',              // frame_001.png en la misma carpeta
    'bg_frame_',
    'frames/frame_'
  ];
  const candidateExts = ['png','jpg','webp'];
  const candidatePads = [3,4]; // 3 => 001 ; 4 => 0001

  // util carga imagen Promisificada
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

  // Intentaremos detectar la combinación válida probando frame 1
  async function detectFramePattern() {
    const tried = [];
    for (const prefix of candidatePrefixes) {
      for (const ext of candidateExts) {
        for (const pad of candidatePads) {
          const url = `${prefix}${String(1).padStart(pad,'0')}.${ext}`;
          tried.push(url);
          try {
            // no await forever: timeout dentro
            await loadImagePromise(url, 3000);
            console.info(`[script.js] patrón detectado: prefix='${prefix}', ext='${ext}', pad=${pad} (ejemplo: ${url})`);
            return { prefix, ext, pad };
          } catch (err) {
            // sigue probando
            // console.debug(`[script.js] fallo en ${url}: ${err.message}`);
          }
        }
      }
    }
    // nada encontrado
    console.warn('[script.js] No se detectó patrón de frames. URLs probadas:', tried.slice(0,30));
    return null;
  }

  // si detecta patrón, configuramos loader / updater
  (async function initBackground() {
    const pattern = await detectFramePattern();
    if (!pattern) {
      // fallback: si tienes un background estático opcional lo puedes poner aquí
      // animatedBackgroundDiv.style.backgroundColor = '#0c0c12';
      return;
    }

    const { prefix, ext, pad } = pattern;
    const makeUrl = i => `${prefix}${String(i).padStart(pad,'0')}.${ext}`;

    // preloader simple con cola
    const preloaded = {};
    const queue = [];
    const maxPar = 4;
    let cur = 0;

    const enqueue = idx => {
      idx = clamp(idx,1,totalFrames);
      if (preloaded[idx] || queue.includes(idx)) return;
      queue.push(idx); processQueue();
    };
    function processQueue(){
      if (cur >= maxPar) return;
      const idx = queue.shift();
      if (!idx) return;
      cur++;
      const url = makeUrl(idx);
      loadImagePromise(url,5000).then(img=>{
        preloaded[idx] = img;
        cur--; processQueue();
      }).catch(()=>{
        cur--; processQueue();
      });
    }

    // carga inicial frame 1 (rápido)
    enqueue(1);

    // function updateBackground similar a antes
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
        if (!curSrc.endsWith(url)) {
          if (preloaded[idx] && preloaded[idx].src) bgImg.src = preloaded[idx].src;
          else bgImg.src = url;
        }
      } else if (animatedBackgroundDiv) {
        const wanted = `url("${url}")`;
        if (animatedBackgroundDiv.style.backgroundImage !== wanted) animatedBackgroundDiv.style.backgroundImage = wanted;
      }
      // enqueue vecinos
      for (let o=-3;o<=3;o++) enqueue(idx+o);
    }

    // Exponemos updateByPercent a la parte de scroll (se asigna más abajo)
    window.__updateAnimatedBackground = updateByPercent;

    // si se precargó frame1, asignarlo
    if (preloaded[1] && preloaded[1].src && bgImg) bgImg.src = preloaded[1].src;

    console.info('[script.js] fondo por frames listo. Usando:', prefix, ext, 'pad=', pad);
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
        // Si la detección ya creó la función, la llamamos:
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
  onScroll(); // init

  /* ----------------- LOGROS (solo toasts) ----------------- */
  const achievementToastEl = safeGet('achievement-toast');
  const achievementList = {
    'inicio': {unlocked:false, threshold:0, name:"¡Comienzo del viaje"},
    'mitad':  {unlocked:false, threshold:50, name:"¡Mitad del camino"},
    'final':  {unlocked:false, threshold:99, name:"¡Meta alcanzada"}
  };

  function showAchievementToast(text) {
    if (achievementToastEl) {
      achievementToastEl.textContent = text;
      achievementToastEl.classList.add('show');
      setTimeout(()=> achievementToastEl.classList.remove('show'), 3000);
      return;
    }
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
    showAchievementToast(`¡Logro Desbloqueado: ${a.name}!`);
  }

  function checkAchievements(pct) {
    if (pct >= achievementList['inicio'].threshold) unlockAchievement('inicio');
    if (pct >= achievementList['mitad'].threshold) unlockAchievement('mitad');
    if (pct >= achievementList['final'].threshold) unlockAchievement('final');
  }
  // desbloqueo inicial
  unlockAchievement('inicio');

  console.info('[script.js] cargado. Iniciando detección de frames...');

});
