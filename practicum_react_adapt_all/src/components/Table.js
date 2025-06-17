import { useState, useEffect } from 'react';
import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import SortControls from './SortControls.js';

const Table = (props) => {
    const [activePage, setActivePage] = useState("1");
    const [dataTable, setDataTable] = useState(props.data);
    const [sortConfig, setSortConfig] = useState([]);

    const updateDataTable = (value) => setDataTable(value);

    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    const handleSortChange = (newSortConfig) => {
        setSortConfig(newSortConfig);
    };

    // Функция сортировки данных
    const sortData = (data, config) => {
        if (config.length === 0) return data;

        return [...data].sort((a, b) => {
            for (let i = 0; i < config.length; i++) {
                const { column, order } = config[i];
                const aValue = a[column];
                const bValue = b[column];

                // Проверяем, являются ли значения числами
                const isNumeric = !isNaN(aValue) && !isNaN(bValue);
                const comparison = isNumeric
                    ? parseFloat(aValue) - parseFloat(bValue)
                    : aValue.toString().localeCompare(bValue.toString());

                if (comparison !== 0) {
                    return order ? -comparison : comparison;
                }
            }
            return 0;
        });
    };

    useEffect(() => { setActivePage(1); }, [dataTable]);

    // Применяем сортировку к отфильтрованным данным
    const sortedData = sortData(dataTable, sortConfig);

    // Количество страниц для пагинации
    const n = Math.ceil(sortedData.length / props.amountRows);
    const arr = Array.from({ length: n }, (v, i) => i + 1);

    const pages = arr.map((item, index) => (
        <span
            key={index}
            onClick={changeActive}
            className={item.toString() === activePage ? 'activePage' : ''}
        >
            {item}
        </span>
    ));

    return (
        <>
            <h4>Фильтры</h4>
            <Filter
                filtering={updateDataTable}
                data={dataTable}
                fullData={props.data}
            />
            <SortControls
                onSortChange={handleSortChange}
                fields={Object.keys(props.data[0])}
            />
            <table>
                <TableHead head={Object.keys(props.data[0])} />
                <TableBody
                    body={sortedData}
                    amountRows={props.showPagination ? props.amountRows : dataTable.length}
                    numPage={props.showPagination ? activePage : 1}
                />
            </table>
            {/* <table>
                <TableHead head={Object.keys(props.data[0])} />
                <TableBody
                    body={dataTable}
                    amountRows={props.showPagination ? props.amountRows : dataTable.length} 
                    numPage={props.showPagination ? activePage : 1} // Текущая страница или 1
                />
            </table>

            {props.showPagination && (
                <div>
                    {pages}
                </div>
            )} */}
            {props.showPagination && n > 1 && (
                <div>
                    {pages}
                </div>
            )}
        </>
    );
};

export default Table;