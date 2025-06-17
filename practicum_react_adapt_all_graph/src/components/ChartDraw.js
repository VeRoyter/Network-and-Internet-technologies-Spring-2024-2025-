import * as d3 from "d3";
import { useEffect, useRef } from "react";

const ChartDraw = (props) => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (!props.data || props.data.length === 0) return;
    
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();
    
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 100, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Создаем контейнер для графика
    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // Шкала для оси X
    const xScale = d3
      .scaleBand()
      .domain(props.data.map(d => String(d.labelX)))
      .range([0, innerWidth])
      .padding(0.1);
    
    // Шкала для оси Y
    const allValues = props.data.reduce((acc, d) => {
      if (props.showMin) acc.push(d.min);
      if (props.showMax) acc.push(d.max);
      return acc;
    }, []);
    
    const yScale = d3
      .scaleLinear()
      .domain([d3.min(allValues) * 0.85, d3.max(allValues) * 1.1])
      .range([innerHeight, 0])
      .nice();
    
    // Ось X
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "0.15em");
    
    // Ось Y
    g.append("g")
      .call(d3.axisLeft(yScale));
    
    // Заголовок оси Y
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 15)
      .attr("x", -innerHeight / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(props.oyField); // Используем переданное название поля
    
    // Рисуем график в зависимости от типа
    if (props.chartType === "histogram") {
      // Гистограмма
      const barWidth = xScale.bandwidth() / (props.showMin && props.showMax ? 2 : 1);
      
      if (props.showMax) {
        g.selectAll(".max-bar")
          .data(props.data)
          .enter()
          .append("rect")
          .attr("class", "max-bar")
          .attr("x", d => xScale(String(d.labelX)))
          .attr("y", d => yScale(d.max))
          .attr("width", barWidth)
          .attr("height", d => innerHeight - yScale(d.max))
          .attr("fill", "#4CAF50");
      }
      
      if (props.showMin) {
        g.selectAll(".min-bar")
          .data(props.data)
          .enter()
          .append("rect")
          .attr("class", "min-bar")
          .attr("x", d => 
            props.showMax 
              ? xScale(String(d.labelX)) + barWidth 
              : xScale(String(d.labelX))
          )
          .attr("y", d => yScale(d.min))
          .attr("width", barWidth)
          .attr("height", d => innerHeight - yScale(d.min))
          .attr("fill", "#FF5722");
      }
    } else {
      // Точечная диаграмма
      if (props.showMax) {
        g.selectAll(".max-dot")
          .data(props.data)
          .enter()
          .append("circle")
          .attr("class", "max-dot")
          .attr("cx", d => xScale(String(d.labelX)) + xScale.bandwidth() / 2)
          .attr("cy", d => yScale(d.max))
          .attr("r", 5)
          .attr("fill", "red");
      }
      
      if (props.showMin) {
        g.selectAll(".min-dot")
          .data(props.data)
          .enter()
          .append("circle")
          .attr("class", "min-dot")
          .attr("cx", d => xScale(String(d.labelX)) + xScale.bandwidth() / 2)
          .attr("cy", d => yScale(d.min))
          .attr("r", 5)
          .attr("fill", "blue");
      }
    }
    
  }, [props.data, props.showMin, props.showMax, props.chartType, props.oyField]);

  return <svg ref={chartRef} width="800" height="400"></svg>;
};

export default ChartDraw;