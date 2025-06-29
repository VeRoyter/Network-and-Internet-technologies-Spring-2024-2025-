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
           'Максимальная высота': true,
           'Средняя высота': false,
           'Минимальная высота': false,
           }); 
       

           let seriesY = Object.entries(series)
        .filter(item => item[1] == true)
        .map(item => {
        return {"dataKey": item[0], "label": item[0]}
        });

    function showLabel() {
        return (
            (series['Максимальная высота'] &&
                 !series['Средняя высота'] && !series['Минимальная высота']) ||

            (!series['Максимальная высота'] &&
                 series['Средняя высота'] && !series['Минимальная высота']) ||

            (!series['Максимальная высота'] &&
                 !series['Средняя высота'] && series['Минимальная высота'])
          );

        
    }



    const chartSetting = {
    yAxis: [{ label: 'Высота (м)' }],
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