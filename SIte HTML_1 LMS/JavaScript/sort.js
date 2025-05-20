/*формируем массив для сортировки по уровням вида 
  (в нашем случае в форме два уровня сортировки):
   [
    {column: номер столбца, по которому осуществляется сортировка, 
     order: порядок сортировки (true по убыванию, false по возрастанию)
    },
    {column: номер столбца, 
     order: порядок сортировки
    }
   ]
*/
let createSortArr = (data) => {
    let sortArr = [];
    
    let sortSelects = data.getElementsByTagName('select');
    
    for (let i = 0; i < sortSelects.length; i++) {   
       // получаем номер выбранной опции
        let keySort = sortSelects[i].value;
        // в случае, если выбрана опция Нет, заканчиваем формировать массив
        if (keySort == 0) {
            break;
        }
        // получаем номер значение флажка для порядка сортировки
        // имя флажка сформировано как имя поля SELECT и слова Desc
        let desc = document.getElementById(sortSelects[i].id + 'Desc').checked;
        sortArr.push(
          {column: keySort - 1, 
           order: desc}
        ); 
    }
    return sortArr; 
};

let resetSort = (data)=>{
    let sortSelects = data.getElementsByTagName('select');
    for (let i = 0; i < sortSelects.length; i++) {   
        sortSelects[i].selectedIndex = 0;
        if (i > 0) {
            sortSelects[i].disabled = true;
        }
     }
    // clearTable(idTable);
    // createTable(data, idTable);
}

let sortTable = (idTable, data) => {
    
    // формируем управляющий массив для сортировки
    let sortArr = createSortArr(data);
    
    // сортировать таблицу не нужно, во всех полях выбрана опция Нет
    if (sortArr.length === 0) {
        return false;
    }
    //находим нужную таблицу
    let table = document.getElementById(idTable);

    // преобразуем строки таблицы в массив 
    let rowData = Array.from(table.rows);
    let oldData = Array.from(table.rows);
    
    // удаляем элемент с заголовками таблицы
    let first = rowData[0];
    rowData.shift();
    
    rowData.sort((first, second) => {
        for(let i in sortArr) {
            let key = sortArr[i].column;
            let order = sortArr[i].order;

            let firstElem = first.cells[key].innerHTML;
            let secondElem = second.cells[key].innerHTML;

            let isFNumber = !isNaN(parseFloat(firstElem)) && isFinite(firstElem);
            let isSNumber = !isNaN(parseFloat(secondElem)) && isFinite(secondElem);
            
            if (isFNumber && isSNumber) {
                
                firstElem = parseFloat(firstElem);
                secondElem = parseFloat(secondElem);
            } 

            if (firstElem > secondElem) {
                return order ? -1 : 1;
            } else if (firstElem < secondElem){
                return order ? 1 : -1;
            }
        }
        return 0;
    });
    
    // обновить таблицу на страницу
    ///...
    clearTable(idTable);

    table.appendChild(first);

    // Добавляем отсортированные строки в таблицу
    rowData.forEach(row => {
        table.appendChild(row);
    });
 
}