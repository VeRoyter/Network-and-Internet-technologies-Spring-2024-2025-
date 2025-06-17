import './CSS/App.css';
import buildings from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';
import { useState } from 'react';

function App() {
  const [filteredData, setFilteredData] = useState(buildings);
  
  return (
    <div className="App">
       <h3>Города мира</h3>
       <Chart data={ filteredData } />
       <Table 
        data={buildings} amountRows="15" 
        showPagination={true} 
        onFilter={setFilteredData} 
        currentData={filteredData}
       />
    </div>
  );
}

export default App;