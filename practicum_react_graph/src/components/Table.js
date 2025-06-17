import { useState, useEffect } from 'react';
import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';

const Table = (props) => {
  const [activePage, setActivePage] = useState(1);
  const [dataTable, setDataTable] = useState(props.data);
  
  // Обновляем данные при изменении фильтрации
  const updateDataTable = (value) => {
    setDataTable(value);
    props.onFilter(value); // Передаем отфильтрованные данные в App
  };

  const changeActive = (event) => {
    setActivePage(event.target.innerHTML);
  };

  useEffect(() => { 
    setActivePage(1); 
  }, [dataTable]);

  useEffect(() => {
    // Синхронизируем с внешними данными
    setDataTable(props.currentData);
  }, [props.currentData]);

  const n = Math.ceil(dataTable.length / props.amountRows); 
  const arr = Array.from({ length: n }, (v, i) => i + 1);
  
  const pages = arr.map((item, index) =>  
    <span 
      key={index} 
      onClick={changeActive}
      className={item.toString() === activePage ? 'activePage' : ''}
    >
      {item} 
    </span>
  );

  return (
    <>
      <h4>Фильтры</h4>
      <Filter 
        filtering={updateDataTable} 
        fullData={props.data} 
      />
      <table>
        <TableHead head={Object.keys(props.data[0])} />
        <TableBody
          body={dataTable}
          amountRows={props.showPagination ? props.amountRows : dataTable.length} 
          numPage={props.showPagination ? activePage : 1}
        />
      </table>

      {props.showPagination && n > 1 && (
        <div>
          {pages}
        </div>
      )}
    </>
  );
}

export default Table;