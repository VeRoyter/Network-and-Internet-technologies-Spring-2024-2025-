// import * as React from 'react';
// import { useEffect, useState } from 'react';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Navbar from "../components/Navbar";
// import GroupGrid from "./components/GroupGrid";
// import GroupChart from "./components/GroupChart";

// // Импортируем все новые наборы данных
// import { 
//     tGroupData,
//     populationByCountry,
//     salaryByCountry,
//     priceByCountry,
//     sizeByCountry
// } from "./groupdata";

// // Тип для выбора метрики
// type tSelectMetric = "Население" | "Средний заработок" | "Средняя цена квартиры" | "Размер города (км²)";

// function Chart() {
//     // Состояние для хранения выбранной метрики
//     const [metric, setMetric] = useState<tSelectMetric>("Население");
//     // Состояние для хранения активного набора данных для диаграмм
//     const [chartData, setChartData] = useState<tGroupData>(populationByCountry);

//     const handleChange = (event: SelectChangeEvent) => {
//         setMetric(event.target.value as tSelectMetric);
//     };

//     // Этот хук будет менять набор данных при изменении выбранной метрики
//     useEffect(() => {
//         switch (metric) {
//             case "Население":
//                 setChartData(populationByCountry);
//                 break;
//             case "Средний заработок":
//                 setChartData(salaryByCountry);
//                 break;
//             case "Средняя цена квартиры":
//                 setChartData(priceByCountry);
//                 break;
//             case "Размер города (км²)":
//                 setChartData(sizeByCountry);
//                 break;
//             default:
//                 setChartData(populationByCountry);
//         }
//     }, [metric]);

//     return (
//         <div>
//             <Navbar active="3"/>
//             <Box sx={{ width: "300px", m: "auto", mt: 4 }}>
//                 <FormControl fullWidth>
//                     <InputLabel>Показать данные по</InputLabel>
//                     <Select
//                         value={metric}
//                         label="Показать данные по"
//                         onChange={handleChange}
//                     >
//                         <MenuItem value={"Население"}>Населению</MenuItem>
//                         <MenuItem value={"Средний заработок"}>Среднему заработку</MenuItem>
//                         <MenuItem value={"Средняя цена квартиры"}>Средней цене квартиры</MenuItem>
//                         <MenuItem value={"Размер города (км²)"}>Размеру города (км²)</MenuItem>
//                     </Select>
//                 </FormControl>
//             </Box>
            
//             {/* Передаем универсальное название метрики в дочерние компоненты */}
//             <GroupChart data={chartData} metricName={metric} />
//             <GroupGrid data={chartData} />
//         </div>
//     );
// }

// export default Chart;


import Navbar from "../components/Navbar";
import GroupGrid from "./components/GroupGrid";
import GroupChart from "./components/GroupChart";


import {
    tGroup,
    populationByCountry,
    salaryByCountry,
    priceByCountry,
    sizeByCountry} from "./groupdata";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import * as React from 'react';
import { useEffect, useState } from 'react';
// type tSelect = "Страна" | "Год" | "Тип";
type tSelect = "Население" | "Средний заработок" | "Средняя цена квартиры" | "Размер города (км²)";

function Chart() {
    const [group, setGroup] = React.useState<tSelect>("Население");
    const [groupData, setGroupData] = React.useState(populationByCountry);

    const handleChange = (event: SelectChangeEvent) => {
       
        setGroup(event.target.value as tSelect);
        }
       
        useEffect(()=>{
            if(group=="Население")
                setGroupData(populationByCountry);
            if(group=="Средний заработок")
                setGroupData(salaryByCountry);
            if(group=="Средняя цена квартиры")
                setGroupData(priceByCountry);
            if(group=="Размер города (км²)")
                setGroupData(sizeByCountry);

        },[group]);
       

 return (
 <div>
 <Navbar active="3"/>
 <Box sx={{ width:"200px", m:"auto" }}>
 <FormControl fullWidth>
 <InputLabel> Группировать по </InputLabel>
 <Select
 id="select-group"
 value={ group }
 label="Группировать по"
 onChange={ handleChange }

 >
 <MenuItem value="Население"> Население </MenuItem>
 <MenuItem value="Средний заработок"> Средний заработок </MenuItem>
 <MenuItem value="Средняя цена квартиры"> Средняя цена квартиры </MenuItem>
 <MenuItem value="Размер города (км²)"> Размер города </MenuItem>
 </Select>
 </FormControl>
 </Box>
 <GroupChart data={groupData} />

 <GroupGrid data={groupData} />
 </div>
 );
}

// function Chart() {
//     // Состояние для хранения выбранной метрики
//     const [metric, setMetric] = useState<tSelectMetric>("Население");
//     // Состояние для хранения активного набора данных для диаграмм
//     const [chartData, setChartData] = useState<tGroup>(populationByCountry);

//     const handleChange = (event: SelectChangeEvent) => {
//         setMetric(event.target.value as tSelectMetric);
//     };

//       useEffect(() => {
//         switch (metric) {
//             case "Население":
//                 setChartData(populationByCountry);
//                 break;
//             case "Средний заработок":
//                 setChartData(salaryByCountry);
//                 break;
//             case "Средняя цена квартиры":
//                 setChartData(priceByCountry);
//                 break;
//             case "Размер города (км²)":
//                 setChartData(sizeByCountry);
//                 break;
//             default:
//                 setChartData(populationByCountry);
//         }
//     }, [metric]);

//     return (
//         <div>
//             <Navbar active="3"/>
//             <Box sx={{ width: "300px", m: "auto", mt: 4 }}>
//                 <FormControl fullWidth>
//                     <InputLabel>Показать данные по</InputLabel>
//                     <Select
//                         value={metric}
//                         label="Показать данные по"
//                         onChange={handleChange}
//                     >
//                         <MenuItem value={"Население"}>Населению</MenuItem>
//                         <MenuItem value={"Средний заработок"}>Среднему заработку</MenuItem>
//                         <MenuItem value={"Средняя цена квартиры"}>Средней цене квартиры</MenuItem>
//                         <MenuItem value={"Размер города (км²)"}>Размеру города (км²)</MenuItem>
//                     </Select>
//                 </FormControl>
//             </Box>
            
//             {/* 
//               Теперь мы передаем два свойства: 
//               1. data - сам набор данных для отрисовки
//               2. metricName - название метрики для подписи оси Y на диаграмме 
//             */}
//             <GroupChart data={chartData} metricName={metric} />
//             <GroupGrid data={chartData} />
//         </div>
//     );
// }


export default Chart;



// import Navbar from "../components/Navbar";
// import GroupGrid from "./components/GroupGrid";
// import GroupChart from "./components/GroupChart";

// import { 
//     tGroup,
//     populationByCountry,
//     salaryByCountry,
//     priceByCountry,
//     sizeByCountry
// } from "./groupdata";
// // import {countries,years,types} from "./groupdata";
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import * as React from 'react';
// import { useEffect, useState } from 'react';
// type tSelect = "Название страны" | "Год" | "Тип" | "Размер Города";



// function Chart() {
//     const [group, setGroup] = React.useState<tSelect>("Название страны");
//     const [groupData, setGroupData] = React.useState(populationByCountry);

//     const handleChange = (event: SelectChangeEvent) => {
       
//         setGroup(event.target.value as tSelect);
//         }
       
//         useEffect(()=>{
//             if(group=="Название страны")
//                 setGroupData(populationByCountry);
//             if(group=="Год")
//                 setGroupData(salaryByCountry);
//             if(group=="Тип")
//                 setGroupData(priceByCountry);
//             if(group=="Размер Города")
//                 setGroupData(sizeByCountry);

//         },[group]);
       

//  return (
//  <div>
//  <Navbar active="3"/>
//  <Box sx={{ width:"200px", m:"auto" }}>
//  <FormControl fullWidth>
//  <InputLabel> Группировать по </InputLabel>
//  <Select
//  id="select-group"
//  value={ group }
//  label="Группировать по"
//  onChange={ handleChange }

//  >
//  <MenuItem value="Страна"> Стране </MenuItem>
//  <MenuItem value="Год"> Году </MenuItem>
//  <MenuItem value="Тип"> Типу </MenuItem>
//  </Select>
//  </FormControl>
//  </Box>
//  <GroupChart data={groupData} />

//  <GroupGrid data={groupData} />
//  </div>
//  );
// }
// export default Chart;

