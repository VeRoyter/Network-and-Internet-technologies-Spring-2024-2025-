// import { BarChart} from '@mui/x-charts/BarChart';
// import Container from '@mui/material/Container';
// import { tGroup } from "../groupdata";
// import * as React from 'react';
// import SettingChart from "./SettingChart";
// import { LineChart} from '@mui/x-charts/LineChart';
// import Box from '@mui/material/Box';

// type GroupProps = {
//     data: tGroup;
//     metricName: string; 
//    };

// function GroupChart({ data}: GroupProps) {
//     const [isBar, setIsBar] = React.useState(true);

//        const [series, setSeries] = React.useState({
//            'Максимальная высота': true,
//            'Средняя высота': false,
//            'Минимальная высота': false,
//            }); 
       

//            let seriesY = Object.entries(series)
//         .filter(item => item[1] == true)
//         .map(item => {
//         return {"dataKey": item[0], "label": item[0]}
//         });

//     function showLabel() {
//         return (
//             (series['Максимальная высота'] &&
//                  !series['Средняя высота'] && !series['Минимальная высота']) ||

//             (!series['Максимальная высота'] &&
//                  series['Средняя высота'] && !series['Минимальная высота']) ||

//             (!series['Максимальная высота'] &&
//                  !series['Средняя высота'] && series['Минимальная высота'])
//           );

        
//     }



//     const chartSetting = {
//     yAxis: [{ label: metricName  }],
//     height: 400,
//     };
    
//     return(
//     <Container maxWidth="lg">
//         <Box sx={{
//        display:  isBar ==false ? 'flex' :'none'
//         }}>
//         <LineChart
//  dataset={ data }
//  xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
//  series={ seriesY}
//  slotProps={{
//  legend: {
//  position: { vertical: 'bottom', horizontal: 'center' },
//  },
//  }}
//  {...chartSetting}
//  />
//  </Box>
//  <Box sx={{
//        display:  isBar ==true ? 'flex' :'none'
//         }}>
//     <BarChart
//     dataset={data}
//     xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
//      series={ seriesY }
//     barLabel={showLabel() ? "value" :undefined}
//     slotProps={{
//         legend: {
//         position: { vertical: 'bottom', horizontal: 'center' },
//         },
//         }}
       
//     {...chartSetting}
//     />
//     </Box>
//     <SettingChart isBar={isBar} setIsBar={setIsBar} series={ series } setSeries={ setSeries }/>

//     </Container>
//     )
//    }
//    export default GroupChart;


// import { BarChart} from '@mui/x-charts/BarChart';
// import Container from '@mui/material/Container';
// import { tGroup } from "../groupdata";
// import * as React from 'react';
// import SettingChart from "./SettingChart";
// import { LineChart} from '@mui/x-charts/LineChart';
// import Box from '@mui/material/Box';

// type GroupProps = {
//     data: tGroup;
//     metricName: string; 
//    };

// function GroupChart({ data, metricName  }: GroupProps) {
//     const [isBar, setIsBar] = React.useState(true);

//        const [series, setSeries] = React.useState({
//            'Максимальная высота': true,
//            'Средняя высота': false,
//            'Минимальная высота': false,
//            }); 
       

//            let seriesY = Object.entries(series)
//         .filter(item => item[1] == true)
//         .map(item => {
//         return {"dataKey": item[0], "label": item[0]}
//         });

//     function showLabel() {
//         return (
//             (series['Максимальная высота'] &&
//                  !series['Средняя высота'] && !series['Минимальная высота']) ||

//             (!series['Максимальная высота'] &&
//                  series['Средняя высота'] && !series['Минимальная высота']) ||

//             (!series['Максимальная высота'] &&
//                  !series['Средняя высота'] && series['Минимальная высота'])
//           );

        
//     }



//     const chartSetting = {
//     yAxis: [{ label: metricName  }],
//     height: 400,
//     };
    
//     return(
//     <Container maxWidth="lg">
//         <Box sx={{
//        display:  isBar ==false ? 'flex' :'none'
//         }}>
//         <LineChart
//  dataset={ data }
//  xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
//  series={ seriesY}
//  slotProps={{
//  legend: {
//  position: { vertical: 'bottom', horizontal: 'center' },
//  },
//  }}
//  {...chartSetting}
//  />
//  </Box>
//  <Box sx={{
//        display:  isBar ==true ? 'flex' :'none'
//         }}>
//     <BarChart
//     dataset={data}
//     xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
//      series={ seriesY }
//     barLabel={showLabel() ? "value" :undefined}
//     slotProps={{
//         legend: {
//         position: { vertical: 'bottom', horizontal: 'center' },
//         },
//         }}
       
//     {...chartSetting}
//     />
//     </Box>
//     <SettingChart isBar={isBar} setIsBar={setIsBar} series={ series } setSeries={ setSeries }/>

//     </Container>
//     )
//    }
//    export default GroupChart;



// import * as React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { LineChart } from '@mui/x-charts/LineChart';
// import Container from '@mui/material/Container';
// import Box from '@mui/material/Box';
// import SettingChart from "./SettingChart";
// import { tGroup } from "../groupdata"; 

// // ИСПРАВЛЕНИЕ: Добавляем metricName в тип Props
// type GroupProps = {
//     data: tGroup;
//     metricName: string; 
// };

// function GroupChart({ data, metricName }: GroupProps) {
//     const [isBar, setIsBar] = React.useState(true);
//     // ИСПРАВЛЕНИЕ: Используем универсальные ключи
//     const [series, setSeries] = React.useState({
//         'Максимум': true,
//         'Среднее': false,
//         'Минимум': false,
//     });

//     const seriesY = Object.entries(series)
//         .filter(([, value]) => value === true)
//         .map(([key]) => ({ dataKey: key, label: key }));

//     const chartSetting = {
//         // ИСПРАВЛЕНИЕ: Используем metricName для динамической подписи оси Y
//         yAxis: [{ label: metricName }], 
//         height: 400,
//     };

//     return (
//         <Container maxWidth="lg" sx={{ mt: 4 }}>
            
//             <Box>
//                 {isBar ? (
//                     <BarChart dataset={data} xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]} series={seriesY} {...chartSetting} />
//                 ) : (
//                     <LineChart dataset={data} xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]} series={seriesY} {...chartSetting} />
//                 )}
//             </Box>
//             <SettingChart series={series} setSeries={setSeries} isBar={isBar} setIsBar={setIsBar} />
//         </Container>
//     );
// }
// export default GroupChart;



import { BarChart} from '@mui/x-charts/BarChart';
import Container from '@mui/material/Container';
import { tGroup } from "../groupdata";
import * as React from 'react';
import SettingChart from "./SettingChart";
import { LineChart} from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box';

type GroupProps = {
    data: tGroup;
   };

function GroupChart({ data }: GroupProps) {
    const [isBar, setIsBar] = React.useState(true);

       const [series, setSeries] = React.useState({
           'Минимум': true,
           'Максимум': false,
           'Среднее': false,
           }); 
       

           let seriesY = Object.entries(series)
        .filter(item => item[1] == true)
        .map(item => {
        return {"dataKey": item[0], "label": item[0]}
        });

    function showLabel() {
        return (
            (series['Минимум'] &&
                 !series['Максимум'] && !series['Среднее']) ||

            (!series['Минимум'] &&
                 series['Максимум'] && !series['Среднее']) ||

            (!series['Минимум'] &&
                 !series['Максимум'] && series['Среднее'])
          );

        
    }

//     export type tGroup = {
//     "id": number,
//     "Группа": string,
//     "Минимум": number,
//     "Максимум": number,
//     "Среднее": number,
// }[];



    const chartSetting = {
    yAxis: [{ label: '' }],
    height: 400,
    };
    
    return(
    <Container maxWidth="lg">
        <Box sx={{
       display:  isBar ==false ? 'flex' :'none'
        }}>
        <LineChart
 dataset={ data }
 xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
 series={ seriesY}
 slotProps={{
 legend: {
 position: { vertical: 'bottom', horizontal: 'center' },
 },
 }}
 {...chartSetting}
 />
 </Box>
 <Box sx={{
       display:  isBar ==true ? 'flex' :'none'
        }}>
    <BarChart
    dataset={data}
    xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
     series={ seriesY }
    barLabel={showLabel() ? "value" :undefined}
    slotProps={{
        legend: {
        position: { vertical: 'bottom', horizontal: 'center' },
        },
        }}
       
    {...chartSetting}
    />
    </Box>
    <SettingChart isBar={isBar} setIsBar={setIsBar} series={ series } setSeries={ setSeries }/>

    </Container>
    )
   }
   export default GroupChart;


//    { field: 'Группа', headerName: 'Группа', flex: 1},
//         { field: 'Минимальная продолжительность жизни', flex: 0.5},
//         { field: 'Максимальная продолжительность жизни', flex: 0.5},
//         { field: 'Средняя продолжительность жизни', flex: 0.5},   