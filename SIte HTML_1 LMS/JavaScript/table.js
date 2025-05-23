//выводим таблицу на страницу
let createTable = (data, idTable) => {
	// находим таблицу
	let table = document.getElementById(idTable);
    // table.innerHTML = '';
	
	// формируем заголовочную строку из ключей нулевого элемента массива
	let tr = document.createElement('tr');

	for(key in data[0]) {
		let th = document.createElement('th');
		th.innerHTML = key;
		tr.append(th);
	}

	table.append(tr);
	
	// самостоятельно сформировать строки таблицы на основе массива data
	data.forEach(item => {
           // создать новую строку таблицы tr
        let strTr = document.createElement('tr');
           // перебрать ключи очередного элемента массива
           // создать элемент td
            // занести в него соответствующее значение из массива 
            // добавить элемент td к строке
           for(let key in item){
                let td = document.createElement('td');
                td.innerHTML = item[key];
                strTr.append(td);
           }
        // строку добавить в таблицу
        table.append(strTr);
	});	
}

let clearTable = (idTable) => {
    let table = document.getElementById(idTable);
    if(table){
        table.innerHTML = '';
    }
}