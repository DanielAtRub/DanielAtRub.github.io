document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.querySelector(".timeline");
    const items = Array.from(timeline.children);
    const filterButtons = document.querySelectorAll(".filter-buttons button");
    const itemHeight = items[0].offsetHeight + 20; // Altura del item + espacio entre ellos
    let currentIndex = 0;
    let activeFilter = "all";

    // Función para filtrar elementos
    function filterItems(filter) {
        activeFilter = filter;
        currentIndex = 0; // Reiniciar índice al cambiar filtro
        
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

    // Función para actualizar la visualización de la línea de tiempo
    function updateTimeline() {
        const visibleItems = items.filter(item => !item.classList.contains("hidden"));
        
        if (visibleItems.length === 0) return;

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

        // Ajustar la posición general del timeline
        timeline.style.transform = `translateY(${-currentIndex * itemHeight}px)`;
    }

    // Manejo del desplazamiento con rueda del mouse
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

    // Soporte para navegación con teclado
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

    // Evento de filtro con botones
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            filterItems(filter);
        });
    });

    // Inicializar la línea de tiempo con "Todos" seleccionado
    filterButtons[0].classList.add("active");
    filterItems("all");
});