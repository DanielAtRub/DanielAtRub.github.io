document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.querySelector(".timeline");
    const timelineContainer = document.querySelector(".timeline-container");
    const items = Array.from(timeline.children);
    const filterButtons = document.querySelectorAll(".filter-buttons button");
    const itemHeight = items[0].offsetHeight + 20; // Altura del item + espacio entre ellos
    let currentIndex = 0;
    let activeFilter = "all";
    let touchStartY = 0;
    let touchMoveY = 0;
    let isTouchingTimeline = false;

    const hasMouse = window.matchMedia("(pointer: fine)").matches;

    function filterItems(filter) {
        activeFilter = filter;
        currentIndex = 0;
        
        items.forEach(item => {
            const category = item.getAttribute("data-category");
            if (filter === "all" || category === filter) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
        updateTimeline();
    }

    function updateTimeline() {
        const visibleItems = items.filter(item => !item.classList.contains("hidden"));
        if (visibleItems.length === 0) return;

        const containerHeight = timelineContainer.offsetHeight;

        visibleItems.forEach((item, index) => {
            const relativePosition = index - currentIndex;

            if (relativePosition === 0) {
                item.style.transform = `scale(1)`;
                item.style.opacity = 1;
                item.style.fontWeight = "bold";
            } else {
                item.style.transform = `scale(0.8)`;
                item.style.opacity = 0.5;
                item.style.fontWeight = "normal";
            }
        });

        const selectedItemOffset = currentIndex * itemHeight;
        const targetOffset = (containerHeight * 0.001 - itemHeight / 2) - 20;
        const translateY = targetOffset - selectedItemOffset;

        timeline.style.transform = `translateY(${translateY}px)`;
    }

    // Desplazamiento con el mouse (si está disponible)
    if (hasMouse) {
        window.addEventListener("wheel", (event) => {
            const visibleItems = items.filter(item => !item.classList.contains("hidden"));
            if (event.deltaY > 0 && currentIndex < visibleItems.length - 1) {
                currentIndex++;
            } else if (event.deltaY < 0 && currentIndex > 0) {
                currentIndex--;
            }
            updateTimeline();
            event.preventDefault();
        }, { passive: false });
    }

    // Desplazamiento con teclas
    window.addEventListener("keydown", (event) => {
        const visibleItems = items.filter(item => !item.classList.contains("hidden"));
        if (event.key === "ArrowDown" && currentIndex < visibleItems.length - 1) {
            currentIndex++;
            updateTimeline();
            event.preventDefault();
        } else if (event.key === "ArrowUp" && currentIndex > 0) {
            currentIndex--;
            updateTimeline();
            event.preventDefault();
        }
    });

    // Manejo de filtros
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            filterItems(filter);
        });
    });

    // 📱 **EVENTOS TÁCTILES**
    timeline.addEventListener("touchstart", (event) => {
        isTouchingTimeline = true; // Marcar que el usuario está tocando la lista
        touchStartY = event.touches[0].clientY;
    });

    timeline.addEventListener("touchmove", (event) => {
        if (!isTouchingTimeline) return;

        touchMoveY = event.touches[0].clientY;
        const deltaY = touchStartY - touchMoveY;

        const visibleItems = items.filter(item => !item.classList.contains("hidden"));

        if (deltaY > 10 && currentIndex < visibleItems.length - 1) {
            currentIndex++;
        } else if (deltaY < -10 && currentIndex > 0) {
            currentIndex--;
        }

        updateTimeline();
        touchStartY = touchMoveY; // Actualizar la posición inicial para suavizar el desplazamiento
        event.preventDefault(); // Evitar que la página haga scroll mientras se mueve la lista
    });

    timeline.addEventListener("touchend", () => {
        isTouchingTimeline = false; // Terminar la interacción con la lista
    });

    // Permitir desplazamiento en la página si el usuario toca fuera de la lista
    document.addEventListener("touchmove", (event) => {
        if (!isTouchingTimeline) {
            event.stopPropagation(); // Permitir scroll de la página
        }
    }, { passive: true });

    // Activar el primer filtro por defecto
    filterButtons[0].classList.add("active");
    filterItems("all");
});
