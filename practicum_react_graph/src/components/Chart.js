import { useState } from "react";
import ChartDraw from './ChartDraw.js';
import * as d3 from "d3";

const Chart = (props) => {
  const [ox, setOx] = useState("Страна");
  const [oy, setOy] = useState([true, false]);
  const [chartType, setChartType] = useState("scatter"); // Добавляем состояние для типа диаграммы

  const handleSubmit = (event) => {        
    event.preventDefault();
    
    // Проверяем, что выбрана хотя бы одна ось OY
    if (!event.target["oy"][0].checked && !event.target["oy"][1].checked) {
      alert("Пожалуйста, не ломайте программу больше :(");
      return;
    }
    
    setOx(event.target["ox"].value); 
    setOy([
      event.target["oy"][0].checked, 
      event.target["oy"][1].checked
    ]);
    setChartType(event.target["chartType"].value); // Сохраняем тип диаграммы
  }

  const createArrGraph = (data, key) => {   
    const groupObj = d3.group(data, d => d[key]);
    let arrGraph = [];
    
    for(let entry of groupObj) {
      const heights = entry[1].map(d => d['Высота']);
      const min = d3.min(heights);
      const max = d3.max(heights);
      arrGraph.push({
        labelX: entry[0], 
        min, 
        max
      });
    }
    
    // Сортируем по году если выбрана ось OX "Год"
    if (key === "Год") {
      arrGraph.sort((a, b) => a.labelX - b.labelX);
    }
    
    return arrGraph;
  }

  return (
    <>
      <h4>Визуализация</h4>
      <form onSubmit={handleSubmit}>
        <p> Значение по оси OX: </p>
        <div>
          <input 
            type="radio" 
            name="ox" 
            value="Страна" 
            defaultChecked={ox === "Страна"} 
          /> Страна
          <br/>		
          <input 
            type="radio" 
            name="ox" 
            value="Год" 
          /> Год
        </div>
        
        <p> Значение по оси OY </p>
        <div>
          <input 
            type="checkbox" 
            name="oy" 
            defaultChecked={oy[0] === true} 
          /> Максимальная высота
          <br/>
          <input 
            type="checkbox" 
            name="oy" 
          /> Минимальная высота
        </div>
        
        <p>Тип диаграммы</p>
        <select name="chartType" defaultValue="scatter">
          <option value="scatter">Точечная диаграмма</option>
          <option value="histogram">Гистограмма</option>
        </select>
        
        <p>  
          <button type="submit">Построить </button>
        </p>
      </form>    
      
      <ChartDraw 
        data={createArrGraph(props.data, ox)}
        showMin={oy[1]}
        showMax={oy[0]}
        chartType={chartType}
      />	
    </>
  )
}

export default Chart;