import buildings from "../table";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';


function BuildingsGrid() {
 const rows: GridRowsProp = buildings;
 const columns: GridColDef[] = [
    { field: 'Название города', headerName: 'Название города', flex: 1},
    { field: 'Страна', flex: 0.5},
    { field: 'Население', flex: 0.5},
    { field: 'Средний заработок', flex: 0.5},   
    { field: 'Средняя цена квартиры' },
    { field: 'Размер города (км²)'},
 ];

 return (
    <Container maxWidth="lg" sx={{height: '700px', mt: '20px'}}>

 <DataGrid
 localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
 showToolbar={true}
   getRowId={(row) => row['Название города']}
 rows={rows}
 columns={columns}
 />
  </Container> 

 );
}
export default BuildingsGrid;