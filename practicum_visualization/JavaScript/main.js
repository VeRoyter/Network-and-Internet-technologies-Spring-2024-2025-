document.addEventListener("DOMContentLoaded", function() {
    showTable('build', buildings);
    const toggleBtn = document.getElementById('toggleTableBtn');
    const table = document.getElementById('build');

    toggleBtn.addEventListener('click', function() {
        table.classList.toggle('hiddenTable');
        toggleBtn.textContent = table.classList.contains('hiddenTable') ? 'Показать таблицу' : 'Скрыть таблицу';
    });
    
    // Обработчики событий
    // document.getElementById('city').addEventListener('change', updateGraph);
    // document.getElementById('year').addEventListener('change', updateGraph);
    // document.getElementById('min_OY').addEventListener('change', updateGraph);
    // document.getElementById('max_OY').addEventListener('change', updateGraph);

    // Блокировка чекбоксов при загрузке
    document.getElementById('min_OY').disabled = true;
    document.getElementById('max_OY').disabled = true;

    // Обработчики для разблокировки чекбоксовzz
    document.querySelectorAll('input[name="axisX"]').forEach(radio => {
        radio.addEventListener('change', function() {
            document.getElementById('min_OY').disabled = false;
            document.getElementById('max_OY').disabled = false;
            // updateGraph();
        });
    });

    document.getElementById('toggleBuildTableBtn').addEventListener('click', function() {
        // updateGraph();
        let showMin = document.getElementById('min_OY').checked;
        let showMax = document.getElementById('max_OY').checked;
        let keyX = document.getElementById('year').checked ? 'Год' : 'Страна';
        drawGraph(buildings, keyX, showMin, showMax);
    });

    function updateGraph() {
        const axisXSelected = document.querySelector('input[name="axisX"]:checked');
        if (!axisXSelected) return;

        const keyX = axisXSelected.value;
        const showMin = document.getElementById('min_OY').checked;
        const showMax = document.getElementById('max_OY').checked;
        drawGraph(buildings, keyX, showMin, showMax);
    }
});