// устанавливаем соответствие между полями формы и столбцами таблицы
let correspond = {
    "Название": "structure",
    "Тип": "category",
    "Страна": "country",
    "Город": "city",
    "Год": ["yearFrom", "yearTo"],
    "Высота": ["heightFrom", "heightTo"]
}


let dataFilter = (dataForm) => {
    
    let dictFilter = {};
    // перебираем все элементы формы с фильтрами
    
    for(let j = 0; j < dataForm.elements.length; j++) {

        // выделяем очередной элемент формы
        let item = dataForm.elements[j];
        
        // получаем значение элемента
        let valInput = item.value;

        // если поле типа text - приводим его значение к нижнему регистру
        if (item.type === "text") {
            valInput = valInput.toLowerCase();
        }
        /* САМОСТОЯТЕЛЬНО обработать значения числовых полей:
        - если в поле занесено значение - преобразовать valInput к числу;
        - если поле пусто и его id включает From  - занести в valInput 
           -бесконечность
        - если поле пусто и его id включает To  - занести в valInput 
           +бесконечность
        */
        else if (item.type === "number") {
            if (valInput !== "") {
                valInput = Number(valInput);
            } else {
                if (item.id.includes("From")) {
                    valInput = -Infinity;
                } else if (item.id.includes("To")) {
                    valInput = Infinity;
                }
            }
        }


         // формируем очередной элемент ассоциативного массива
        dictFilter[item.id] = valInput;
    }       
    return dictFilter;
}

// фильтрация таблицы
let filterTable = (data, idTable, dataForm) =>{
    
    // получаем данные из полей формы
    let datafilter = dataFilter(dataForm);
    
    // выбираем данные соответствующие фильтру и формируем таблицу из них
    let tableFilter = data.filter(item => {
        let result = true;
        for (let header in correspond) {
            let formFields = correspond[header];
            let itemKey = Object.keys(item).find(key => correspond[key] === formFields || correspond[key]?.includes?.(formFields?.[0]));
            
            if (typeof item[itemKey] === 'string') {
                let filterVal = datafilter[formFields]?.toLowerCase() || '';
                result &&= item[itemKey].toLowerCase().includes(filterVal);
            } else if (typeof item[itemKey] === 'number') {
                if (Array.isArray(formFields)) {
                    let [from, to] = formFields.map(field => datafilter[field]);
                    result &&= item[itemKey] >= from && item[itemKey] <= to;
                } else {
                    let filterVal = datafilter[formFields];
                    result &&= filterVal === '' || item[itemKey] === filterVal;
                }
            }
        }
        return result;
    }); 

    // САМОСТОЯТЕЛЬНО вызвать функцию, которая удаляет все строки таблицы с id=idTable
    clearTable(idTable);

    // показать на странице таблицу с отфильтрованными строками
    createTable(tableFilter, idTable);  
};

let clearFilter = (idTable, data, form) => {
    Array.from(form.elements).forEach(element => {
        if(element.tagName === 'INPUT' && element.type !== 'button'){
            element.value = '';
        }
    });
    clearTable(idTable);
    createTable(data, idTable);
};