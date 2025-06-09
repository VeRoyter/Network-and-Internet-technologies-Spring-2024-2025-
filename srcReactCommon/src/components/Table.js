import { useState, useEffect } from 'react';
import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';

/*
   компонент, выводящий на страницу таблицу с пагинацией
   пропсы:
      data - данные для таблицы в виде массива объектов
*/


const Table = (props) => {
	
  const [activePage, setActivePage] = useState(1);
  const [dataTable, setDataTable] = useState(props.data);
  const updateDataTable = (value) => setDataTable(value);
  const changeActive = (event) => {
       setActivePage(event.target.innerHTML);
  };

  useEffect(() => { setActivePage(1); }, [dataTable]);

	//количество страниц разбиения таблицы
    const n = Math.ceil(dataTable.length / props.amountRows); 
    
    // массив с номерами страниц
    const arr = Array.from({ length: n }, (v, i) => i + 1);
    
     //формируем совокупность span с номерами страниц
    const pages = arr.map((item, index) =>  
          <span 
            key={ index } 
            onClick={ changeActive }
            className={item.toString() === activePage ? 'activePage' : ''}
          >
            { item } 
          </span>
    );

    return( 
    //   <>
    //    <h4>Фильтры</h4>
    //     <Filter filtering={ updateDataTable } data={ dataTable } fullData={ props.data }/>
	   
    //     <table>
    //         <TableHead head={ Object.keys(props.data[0]) } />
    //         <TableBody body={ dataTable } amountRows={props.amountRows} numPage={activePage} />
    //     </table>

	  //     <div>
    //       {pages}
    //     </div>
	  // </>   
    <>
        <h4>Фильтры</h4>
        <Filter filtering={ updateDataTable } data={ dataTable } fullData={ props.data }/>
            <table>
                <TableHead head={Object.keys(props.data[0])} />
                <TableBody
                    body={dataTable}
                    amountRows={props.showPagination ? props.amountRows : dataTable.length} 
                    numPage={props.showPagination ? activePage : 1} // Текущая страница или 1
                />
            </table>

            {props.showPagination && n > 1 && (
                <div>
                    {pages}
                </div>
            )}
        </>
    )   
}

export default Table;