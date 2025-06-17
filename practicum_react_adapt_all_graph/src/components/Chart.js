import { useState } from "react";
import ChartDraw from './ChartDraw.js';
import * as d3 from "d3";

const Chart = (props) => {
  const [ox, setOx] = useState("Страна");
  const [oy, setOy] = useState([true, false]);
  const [chartType, setChartType] = useState("scatter");
  const [oyField, setOyField] = useState("Средний заработок");

  const handleSubmit = (event) => {        
    event.preventDefault();
    
    // // Проверяем, что выбрана хотя бы одна ось OY
    // if (!event.target["oy"][0].checked && !event.target["oy"][1].checked) {
    //   alert("Пожалуйста, выберите хотя бы одно значение для оси OY!");
    //   return;
    // }
    console.log(event.target["oy"])

            if (!event.target["oy"][0].checked && !event.target["oy"][1].checked){
            console.log("Чекбоксы не отмечены")
            console.log(event.target.childNodes)
            event.target.childNodes[3].className = "wrong"
        }
    
    setOx(event.target["ox"].value); 
    setOy([
      event.target["oy"][0].checked, 
      event.target["oy"][1].checked
    ]);
    setChartType(event.target["chartType"].value);
    setOyField(event.target["oyField"].value); // Сохраняем выбранное поле
  }

  const createArrGraph = (data, key) => {   
    const groupObj = d3.group(data, d => d[key]);
    let arrGraph = [];
    
    for(let entry of groupObj) {
      const values = entry[1].map(d => d[oyField]); // Используем выбранное поле
      const min = d3.min(values);
      const max = d3.max(values);
      arrGraph.push({
        labelX: entry[0], 
        min, 
        max
      });
    }
    
    // Сортируем по названию если выбрана ось OX "Страна"
    if (key === "Страна") {
      arrGraph.sort((a, b) => a.labelX.localeCompare(b.labelX));
    }
    
    return arrGraph;
  }

  // Доступные числовые поля для оси OY
  const numericFields = [
    "Средний заработок"
  ];

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
            value="Название города" 
          /> Название города
        </div>
        
        <input 
          type="hidden" 
          name="oyField" 
          value="Средний заработок" 
        />
        
        <p> Значение по оси OY </p>
        <div>
          <input 
            type="checkbox" 
            name="oy" 
            defaultChecked={oy[0] === true}
            onChange={event => event.target.parentElement.previousSibling.className = "correct"} 
          /> Максимальное значение
          <br/>
          <input 
            type="checkbox" 
            name="oy" 
            onChange={event => event.target.parentElement.previousSibling.className = "correct"} 
          /> Минимальное значение
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
        oyField={oyField} // Передаем выбранное поле в ChartDraw
      />	
    </>
  )
}

export default Chart;