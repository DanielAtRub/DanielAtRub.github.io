document.addEventListener('DOMContentLoaded', () => {

    // --- SISTEMA DE ESCRITURA PARA EL TÍTULO ---
    const titleElement = document.getElementById('main-title');
    const titleText = "Daniel Atienza: El Portafolio";
    let charIndex = 0;
    
	function typeTitle() {
        if (charIndex < titleText.length) {
            titleElement.textContent += titleText.charAt(charIndex);
            charIndex++;
            setTimeout(typeTitle, 100);
        }
    }
    typeTitle();

    // --- SISTEMA DE NAVEGACIÓN POR MISIONES (SCROLL SUAVE) ---
    document.querySelectorAll('.quest-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- SISTEMA DE FILTRADO DE PORTFOLIO ---
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const portfolioCards = document.querySelectorAll('#portfolio-grid .card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Manejar clase activa del botón
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            // Mostrar u ocultar tarjetas
            portfolioCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- SISTEMA DE XP Y NIVELES ---
    const xpBar = document.getElementById('xp-bar');
    const maxLevel = 10;
    
    function updateXP() {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        // Evitar división por cero si el contenido no es scrolleable
        const xpPercentage = scrollableHeight > 0 ? (scrolled / scrollableHeight) * 100 : 0;
        
        xpBar.style.width = `${Math.min(xpPercentage, 100)}%`;

        const currentLevel = Math.floor((xpPercentage / 100) * maxLevel) + 1;
        const displayLevel = Math.min(currentLevel, maxLevel);
        document.title = `Daniel Atienza`;

		//document.title = `Daniel Atienza [Nivel ${displayLevel}]`;
        
        checkAchievements(xpPercentage);
    }
    window.addEventListener('scroll', updateXP);
    updateXP();

    // --- SISTEMA DE LOGROS ---
    const achievementToast = document.getElementById('achievement-toast');
    const achievementsContainer = document.getElementById('achievements-unlocked');
    const achievementList = {
        'aventurero': { unlocked: false, threshold: 25, name: "¡Aventurero!" },
        'explorador': { unlocked: false, threshold: 95, name: "¡Explorador!" }
    };
    
    function unlockAchievement(key) {
        if (!achievementList[key].unlocked) {
            achievementList[key].unlocked = true;

            achievementToast.textContent = `¡Logro Desbloqueado: ${achievementList[key].name}!`;
            achievementToast.classList.add('show');
            setTimeout(() => { achievementToast.classList.remove('show'); }, 3000);

            const lockedAchievement = achievementsContainer.querySelector('.achievement-locked');
            if(lockedAchievement) {
                lockedAchievement.textContent = achievementList[key].name;
                lockedAchievement.classList.remove('achievement-locked');
                lockedAchievement.classList.add('unlocked');
            }
        }
    }

    function checkAchievements(xp) {
        if (xp > achievementList['aventurero'].threshold) unlockAchievement('aventurero');
        if (xp > achievementList['explorador'].threshold) unlockAchievement('explorador');
    }
});