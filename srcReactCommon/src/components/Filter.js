/*
   компонент, для фильтрации таблицы
   пропсы:
      fullData - полные данные, по которым формировалась таблица при загрузке страницы
      data - данные для фильтрации
	  filtering - функция обновления данных для фильтрации
*/

const Filter = (props) => {
			
    const handleSubmit= (event) => {        
        event.preventDefault();		

		// создаем словарь со значениями полей формы
		const filterField = {
            "Название": event.target["structure"].value.toLowerCase(),
            "Тип": event.target["type"].value.toLowerCase(),
            "Страна": event.target["country"].value.toLowerCase(),
            "Город": event.target["city"].value.toLowerCase(),
        };

        const rangeFilters = {
            "Год": {
                min: event.target["yearFrom"].value
                ? parseInt(event.target["yearFrom"].value)
                : null,
                max: event.target["yearTo"].value
                ? parseInt(event.target["yearTo"].value)
                : null,
            },
            "Высота": {
                min: event.target["heightFrom"].value
                ? parseFloat(event.target["heightFrom"].value)
                : null,
                max: event.target["heightTo"].value
                ? parseFloat(event.target["heightTo"].value)
                : null,
            },
        };
                
        //фильтруем данные по значениям всех полей формы
        let arr = props.fullData;
        // for(const key in  filterField) {
		// 	arr = arr.filter(item => 
		// 	    item[key].toLowerCase().includes(filterField[key]));  
        // }  
        for (const key in filterField) {
            if (filterField[key]) {
                arr = arr.filter((item) =>
                item[key].toLowerCase().includes(filterField[key])
                );
            }
        }

        for (const key in rangeFilters) {
            if (rangeFilters[key].min !== null) {
                arr = arr.filter((item) => item[key] >= rangeFilters[key].min);
            }
            if (rangeFilters[key].max !== null) {
                arr = arr.filter((item) => item[key] <= rangeFilters[key].max);
            }
        }
                
        //передаем родительскому компоненту новое состояние - отфильтрованный массив
        props.filtering(arr);
	}
   return (
       <form onSubmit={ handleSubmit }>
        <p>
        <label>Название:</label>
        <input name="structure" type="text" />
        </p>
        <p>
            <label>Тип:</label>
            <input name="type" type="text" />
        </p>
        <p>
            <label>Страна:</label>
            <input name="country" type="text" />
        </p>
        <p>
            <label>Город:</label>
            <input name="city" type="text" />
        </p>
        <p>
            <label>Год от:</label>
            <input name="yearFrom" type="number" />
            <label>Год до:</label>
            <input name="yearTo" type="number" />
        </p>
        <p>
            <label>Высота от:</label>
            <input name="heightFrom" type="number" />
            <label>Высота до:</label>
            <input name="heightTo" type="number" />
        </p>
        <p>
            <button type="submit">Фильтровать</button>
            <button 
                type="reset"
                onClick={() => props.filtering(props.fullData)}
            >Очистить фильтр</button>
        </p>
      </form> 
    )
}

export default Filter;