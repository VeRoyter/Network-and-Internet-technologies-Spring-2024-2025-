document.addEventListener("DOMContentLoaded", function() {
    createTable(cities, 'list');
    setSortSelects(cities[0], document.getElementById('sort'));
});

let currentData = cities;

document.addEventListener("DOMContentLoaded", function() {
    let selects = document.getElementById('sort');
    
    setSortSelects(cities,selects);
    // createTable(cities, 'list');
    
    let filter = document.getElementById('filter');
    

    let startButton = document.getElementById("start");
    let sortButton = document.getElementById("sortirovka");

    let clearButton = document.getElementById("clear");
    let clearSortButton = document.getElementById("clearsort");


    startButton.addEventListener("click", function() {
       
        filterTable(cities,"list",filter);
    });
    clearButton.addEventListener("click", function() {
       clearFilter(cities, 'list');
       resetSort(selects);
        
    });
    sortButton.addEventListener("click", function() {
       sortTable('list',selects);
         
     });
     clearSortButton.addEventListener("click", function() {
        filterTable(cities,"list",filter);
          
      });

})



document.addEventListener("DOMContentLoaded", function() {
    // showTable('list', cities);
    // createTable(cities, 'list');
    // const toggleBtn = document.getElementById('toggleTableBtn');
    // const table = document.getElementById('list');
    document.getElementById('toggleTableBtn').addEventListener('click', function() {
        const table = document.getElementById('list');
        table.classList.toggle('hiddenTable');
        this.textContent = table.classList.contains('hiddenTable') ? 'Показать таблицу' : 'Скрыть таблицу';
    });

    // toggleBtn.addEventListener('click', function() {
    //     table.classList.toggle('hiddenTable');
    //     toggleBtn.textContent = table.classList.contains('hiddenTable') ? 'Показать таблицу' : 'Скрыть таблицу';
    // });
    
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

    // document.getElementById('toggleBuildTableBtn').addEventListener('click', function() {
    //     // updateGraph();
    //     let showMin = document.getElementById('min_OY').checked;
    //     let showMax = document.getElementById('max_OY').checked;
    //     const keyX = document.querySelector('input[name="axisX"]:checked').value;
    //     drawGraph(keyX, showMin, showMax);
    // });
    
    // document.getElementById('toggleBuildTableBtn').addEventListener('click', function() {
    //     drawGraph();
    // });

    document.getElementById('toggleBuildTableBtn').addEventListener('click', function() {
        const axisXSelected = document.querySelector('input[name="axisX"]:checked');
        if (!axisXSelected) {
            alert('Выберите значение для оси OX');
            return;
        }
        
        const keyX = axisXSelected.value;
        const showMin = document.getElementById('min_OY').checked;
        const showMax = document.getElementById('max_OY').checked;
        
        drawGraph(currentData, keyX, showMin, showMax);
    });

    // function updateGraph() {
    //     const axisXSelected = document.querySelector('input[name="axisX"]:checked');
    //     if (!axisXSelected) return;

    //     const keyX = axisXSelected.value;
    //     const showMin = document.getElementById('min_OY').checked;
    //     const showMax = document.getElementById('max_OY').checked;
    //     drawGraph(cities, keyX, showMin, showMax);
    // }
});

// формирование полей элемента списка с заданным текстом и значением

let createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

// формирование поля со списком 
// параметры – массив со значениями элементов списка и элемент select

let setSortSelect = (arr, sortSelect) => {
    sortSelect.innerHTML = '';
    // создаем OPTION Нет и добавляем ее в SELECT
    sortSelect.append(createOption('Нет', 0));
    
    // перебираем все ключи переданного элемента массива данных
    for (let i in arr) {
       // создаем OPTION из очередного ключа и добавляем в SELECT
       // значение атрибута VAL увеличиваем на 1, так как значение 0 имеет опция Нет
        sortSelect.append(createOption(arr[i], Number(i) + 1
    ));
    }
}

// //  формируем поля со списком для многоуровневой сортировки
// let setSortSelects = (data, dataForm) => { 

//     // выделяем ключи словаря в массив
//     let head = Object.keys(data);

//     // находим все SELECT в форме
//     let allSelect = dataForm.getElementsByTagName('select');
    
//     for(let j = 0; j < allSelect.length; j++) {
//         //формируем очередной SELECT+++
//         setSortSelect(head, allSelect[j]);
//         //САМОСТОЯТЕЛЬНО все SELECT, кроме первого, сделать неизменяемым
//         if (j > 0) {
//             allSelect[j].disabled = true;
//         }
//         allSelect[j].addEventListener('change', function() {
//             if (j < allSelect.length - 1) {
//                 changeNextSelect(allSelect[j + 1].id, this);
//             }
//         });
//     }
// }

// document.addEventListener("DOMContentLoaded", function() {
//     setSortSelects(buildings[0], document.getElementById('sort'));
// });

// document.getElementById('fieldsFirst').addEventListener('change', function() {
//     changeNextSelect('fieldsSecond', this);
// });

// // настраиваем поле для следующего уровня сортировки
// let changeNextSelect = (nextSelectId, curSelect) => {
    
//     let nextSelect = document.getElementById(nextSelectId);
    
//     nextSelect.disabled = false;
    
//     // в следующем SELECT выводим те же option, что и в текущем
//     nextSelect.innerHTML = curSelect.innerHTML;
    
//     // удаляем в следующем SELECT уже выбранную в текущем опцию
//     // если это не первая опция - отсутствие сортировки
//     if (curSelect.value != 0) {
//        nextSelect.remove(curSelect.value);
//     } else {
//         nextSelect.disabled = true;
//     }
// }


//  формируем поля со списком для многоуровневой сортировки
let setSortSelects = (data, dataForm) => {
    // выделяем ключи словаря в массив
    let head = Object.keys(data[0]);
    
    // находим все SELECT в форме
    let allSelects = dataForm.getElementsByTagName('select');
    
    // Инициализируем все селекты
    for(let j = 0; j < allSelects.length; j++) {
        // Заполняем селект доступными полями
        setSortSelect(head, allSelects[j]);
        
        // Все селекты, кроме первого, делаем неактивными
        if (j > 0) {
            allSelects[j].disabled = true;
        }
        
        // Добавляем обработчик изменения
        allSelects[j].addEventListener('change', function() {
            changeNextSelect(j, allSelects);
        });
    }
}

// Обработчик изменения значения в селекте
let changeNextSelect = (currentIndex, allSelects) => {
    // Сбрасываем все последующие селекты
    for (let i = currentIndex + 1; i < allSelects.length; i++) {
       // allSelects[i].innerHTML = '';
        allSelects[i].value = '0';
        allSelects[i].disabled = true;
    }
    
    // Если выбран "Нет сортировки" или это последний селект - выходим
    if (allSelects[currentIndex].value === '0' || currentIndex >= allSelects.length - 1) {
        return;
    }
    
    // Активируем следующий селект
    let nextSelect = allSelects[currentIndex + 1];
    nextSelect.disabled = false;
    
    // Копируем все options из текущего селекта
    nextSelect.innerHTML = allSelects[currentIndex].innerHTML;
    
    // Удаляем уже выбранные в предыдущих селектах значения
    for (let i = 0; i < currentIndex; i++) {
        if (allSelects[i].value !== '0') {
            nextSelect.remove(allSelects[i].value);
        }
    }
    
    // Удаляем текущее выбранное значение
    nextSelect.remove(allSelects[currentIndex].value);
    
    // Если остался только один вариант - выбираем его автоматически
    if (nextSelect.options.length === 2) { // 2 потому что есть option "Нет сортировки"
        nextSelect.value = nextSelect.options[1].value;
        changeNextSelect(currentIndex + 1, allSelects);
    }
}