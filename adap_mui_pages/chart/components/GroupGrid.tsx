import { tGroup } from "../groupdata";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';

type GroupProps = {
 data: tGroup;
};

function GroupGrid({ data }: GroupProps) {
    const rows: GridRowsProp = data;
    const columns: GridColDef[] = [
        { field: 'Группа', headerName: 'Группа', flex: 1},
        { field: 'Минимум', flex: 0.5},
        { field: 'Максимум', flex: 0.5},
        { field: 'Среднее', flex: 0.5},   
        
     ];
     return (
        <Container maxWidth="lg" sx={{height: '700px', mt: '20px'}}>
    
     <DataGrid
     localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
     showToolbar={true}
    
     rows={rows}
     columns={columns}
     />
      </Container> 
    
     );
    }
    export default GroupGrid;

// "Минимум": number,
//     "Максимум": number,
//     "Среднее": number,

// import { tGroup } from "../groupdata";
// import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
// import { ruRU } from '@mui/x-data-grid/locales';
// import Container from '@mui/material/Container';


// type GroupProps = {
//  data: tGroup;
// };

// function GroupGrid({ data }: GroupProps) {
//     const rows: GridRowsProp = data;
//     const columns: GridColDef[] = [
//         { field: 'Группа', headerName: 'Страна', flex: 1 },
//         { field: 'Минимум', headerName: 'Минимум', flex: 0.5 },
//         { field: 'Среднее', headerName: 'Среднее', flex: 0.5 },
//         { field: 'Максимум', headerName: 'Максимум', flex: 0.5 },
        
//      ];
//      return (
//         <Container maxWidth="lg" sx={{height: '700px', mt: '20px'}}>
    
//      <DataGrid
//      localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
//      showToolbar={true}
    
//      rows={rows}
//      columns={columns}
//      />
//       </Container> 
    
//      );
//     }
//     export default GroupGrid;

// import { DataGrid, GridRowsProp, GridColDef, GridToolbar } from "@mui/x-data-grid";
// import { ruRU } from '@mui/x-data-grid/locales';
// import Container from '@mui/material/Container';
// import { tGroup } from "../groupdata"; 

// type GroupProps = {
//     data: tGroup;
// };

// function GroupGrid({ data }: GroupProps) {
//     const rows: GridRowsProp = data;
//     // ИСПРАВЛЕНИЕ: Колонки теперь используют универсальные ключи
//     const columns: GridColDef[] = [
//         { field: 'Группа', headerName: 'Страна', flex: 1 },
//         { field: 'Минимум', headerName: 'Минимум', flex: 0.5 },
//         { field: 'Среднее', headerName: 'Среднее', flex: 0.5 },
//         { field: 'Максимум', headerName: 'Максимум', flex: 0.5 },
//     ];

//     return (
//         <Container maxWidth="lg" sx={{ height: '400px', mt: '20px' }}>
//             <DataGrid
//                 localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
//                 rows={rows}
//                 columns={columns}
//                 getRowId={(row) => row.id}
//                 slots={{ toolbar: GridToolbar }}
//             />
//         </Container>
//     );
// }
// export default GroupGrid;
