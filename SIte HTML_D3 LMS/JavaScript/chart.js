// // chart.js (обновленная версия)
// function createArrGraph(data, key) {  
//     const groupObj = d3.group(data, d => d[key]);
//     let arrGraph = [];
    
//     for (const entry of groupObj) {
//         const heights = entry[1].map(d => d['Высота']);
//         const min = d3.min(heights);
//         const max = d3.max(heights);
//         arrGraph.push({ labelX: entry[0], min, max });
//     }

//     // Сортировка по году
//     if (key === 'Год') {
//         arrGraph.sort((a, b) => +a.labelX - +b.labelX);
//     }

//     return arrGraph;
// }

// function drawGraph(data, keyX = 'Страна', showMin = false, showMax = true) {
//     const arrGraph = createArrGraph(data, keyX);
//     const svg = d3.select("svg");
//     svg.selectAll('*').remove();

//     const attr_area = {
//         width: parseFloat(svg.style('width')),
//         height: parseFloat(svg.style('height')),
//         marginX: 50,
//         marginY: 50
//     };

//     const [scX, scY] = createAxis(svg, arrGraph, attr_area, keyX, showMin, showMax);
//     const graphType = document.getElementById('selectGraph').value;

//     if (graphType === 'histogram') {
//         createHistogram(svg, arrGraph, scX, scY, attr_area, showMin, showMax);
//     } else if (graphType === 'line') {
//         createLine(svg, arrGraph, scX, scY, attr_area, showMin, showMax);
//     } else {
//         createChart(svg, arrGraph, scX, scY, attr_area, showMin, showMax);
//     }
// }

// function createAxis(svg, data, attr_area, keyX, showMin, showMax) {
//     // Расчет min и max для оси Y
//     const allValues = [];
//     data.forEach(d => {
//         if (showMin) allValues.push(d.min);
//         if (showMax) allValues.push(d.max);
//     });
//     const [min, max] = d3.extent(allValues);

//     // Шкала X
//     const domainValues = data.map(d => String(d.labelX));

//     const scaleX = d3.scaleBand()
//         .domain(domainValues)
//         .range([0, attr_area.width - 2 * attr_area.marginX])
//         .padding(0.1);

//     // Шкала Y
//     const scaleY = d3.scaleLinear()
//         .domain([min * 0.85, max * 1.1])
//         .range([attr_area.height - 2 * attr_area.marginY, 0]);

//     // Оси
//     svg.append("g")
//         .attr("transform", `translate(${attr_area.marginX}, ${attr_area.height - attr_area.marginY})`)
//         .call(d3.axisBottom(scaleX))
//         .selectAll("text")
//         .style("text-anchor", "end")
//         .attr("dx", "-.8em")
//         .attr("dy", ".15em")
//         .attr("transform", "rotate(-45)");

//     svg.append("g")
//         .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
//         .call(d3.axisLeft(scaleY));

//     return [scaleX, scaleY];
// }

// function createHistogram(svg, data, scX, scY, attr, showMin, showMax) {
//     const barWidth = scX.bandwidth() * 0.6;

//     svg.selectAll(".max-bar").remove();
//     svg.selectAll(".min-bar").remove();

//     if (showMax) {
//         svg.selectAll(".max-bar")
//             .data(data)
//             .enter()
//             .append("rect")
//             .attr("class", "max-bar")
//             .attr("x", d => scX(String(d.labelX)) + (scX.bandwidth() - barWidth)/2)
//             .attr("y", d => scY(d.max))
//             .attr("width", barWidth)
//             .attr("height", d => attr.height - attr.marginY*2 - scY(d.max))
//             .attr("transform", `translate(${attr.marginX}, ${attr.marginY})`)
//             .style("fill", "#4CAF50");
//     }

//     if (showMin) {
//         svg.selectAll(".min-bar")
//             .data(data)
//             .enter()
//             .append("rect")
//             .attr("class", "min-bar")
//             .attr("x", d => scX(String(d.labelX)) + (scX.bandwidth() - barWidth)/2)
//             .attr("y", d => scY(d.min))
//             .attr("width", barWidth)
//             .attr("height", d => attr.height - attr.marginY*2 - scY(d.min))
//             .attr("transform", `translate(${attr.marginX}, ${attr.marginY})`)
//             .style("fill", "#FF5722");
//     }
// }

// function createChart(svg, data, scaleX, scaleY, attr_area, showMin, showMax) {
//     const r = 4;
//     svg.selectAll(".dot").remove();

//     if (showMax) {
//         svg.selectAll(".max-dot")
//             .data(data)
//             .enter()
//             .append("circle")
//             .attr("class", "max-dot")
//             .attr("cx", d => scaleX(String(d.labelX)) + scaleX.bandwidth() / 2)
//             .attr("cy", d => scaleY(d.max))
//             .attr("r", r)
//             .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
//             .style("fill", "red");
//     }

//     if (showMin) {
//         svg.selectAll(".min-dot")
//             .data(data)
//             .enter()
//             .append("circle")
//             .attr("class", "min-dot")
//             .attr("cx", d => scaleX(String(d.labelX)) + scaleX.bandwidth() / 2)
//             .attr("cy", d => scaleY(d.min))
//             .attr("r", r)
//             .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
//             .style("fill", "blue");
//     }
// }

// function createLine(svg, data, scaleX, scaleY, attr_area, showMin, showMax) {
//     // Удалим предыдущие линии и точки
//     svg.selectAll(".line").remove();
//     svg.selectAll(".line-point").remove();

//     // Функция генерации линии
//     const lineGen = d3.line()
//         .x(d => scaleX(String(d.labelX)) + scaleX.bandwidth() / 2)
//         .y(d => scaleY(d.value));

//     if (showMax) {
//         const maxData = data.map(d => ({ labelX: d.labelX, value: d.max }));
//         svg.append("path")
//             .datum(maxData)
//             .attr("class", "line max-line")
//             .attr("d", lineGen)
//             .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
//             .style("fill", "none")
//             .style("stroke", "red");
//         // Точки на линии
//         svg.selectAll(".max-point")
//             .data(maxData)
//             .enter()
//             .append("circle")
//             .attr("class", "line-point max-point")
//             .attr("cx", d => scaleX(String(d.labelX)) + scaleX.bandwidth() / 2 + attr_area.marginX)
//             .attr("cy", d => scaleY(d.value) + attr_area.marginY)
//             .attr("r", 3)
//             .style("fill", "red");
//     }

//     if (showMin) {
//         const minData = data.map(d => ({ labelX: d.labelX, value: d.min }));
//         svg.append("path")
//             .datum(minData)
//             .attr("class", "line min-line")
//             .attr("d", lineGen)
//             .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
//             .style("fill", "none")
//             .style("stroke", "blue");
//         svg.selectAll(".min-point")
//             .data(minData)
//             .enter()
//             .append("circle")
//             .attr("class", "line-point min-point")
//             .attr("cx", d => scaleX(String(d.labelX)) + scaleX.bandwidth() / 2 + attr_area.marginX)
//             .attr("cy", d => scaleY(d.value) + attr_area.marginY)
//             .attr("r", 3)
//             .style("fill", "blue");
//     }
// }


//////////////////////////////////////////////


// // chart.js (адаптированный под cities и группы по "Население" или "Страна")
// function createArrGraph(data, keyX) {
//     // Группируем данные по ключу X (Население или Страна)
//     const groupObj = d3.group(data, d => d[keyX]);
//     let arrGraph = [];

//     for (const [key, records] of groupObj) {
//         const salaries = records.map(d => d['Средний заработок']);
//         const min = d3.min(salaries);
//         const max = d3.max(salaries);
//         arrGraph.push({ labelX: key, min, max });
//     }

//     // Сортировка по числовому ключу при Населении
//     if (keyX === 'Население') {
//         arrGraph.sort((a, b) => +a.labelX - +b.labelX);
//     }

//     return arrGraph;
// }

// function drawGraph(data, keyX = 'Страна', showMin = false, showMax = true) {
//     const arrGraph = createArrGraph(data, keyX);
//     const svg = d3.select('svg');
//     svg.selectAll('*').remove();

//     const attr = {
//         width: parseFloat(svg.style('width')),
//         height: parseFloat(svg.style('height')),
//         marginX: 50,
//         marginY: 50
//     };

//     const [scaleX, scaleY] = createAxis(svg, arrGraph, attr);
//     const graphType = document.getElementById('selectGraph').value;

//     if (graphType === 'histogram') {
//         createHistogram(svg, arrGraph, scaleX, scaleY, attr);
//     } else if (graphType === 'line') {
//         createLine(svg, arrGraph, scaleX, scaleY, attr);
//     } else {
//         createChart(svg, arrGraph, scaleX, scaleY, attr);
//     }
// }

// function createAxis(svg, data, attr) {
//     // Собираем все значения min и max
//     const allValues = data.flatMap(d => [d.min, d.max]);
//     const [minY, maxY] = d3.extent(allValues);

//     // Ось X - категориальная
//     const domainX = data.map(d => String(d.labelX));
//     const scaleX = d3.scaleBand()
//         .domain(domainX)
//         .range([0, attr.width - 2 * attr.marginX])
//         .padding(0.1);

//     // Ось Y - линейная
//     const scaleY = d3.scaleLinear()
//         .domain([minY * 0.85, maxY * 1.1])
//         .range([attr.height - 2 * attr.marginY, 0]);

//     // Рисуем оси
//     svg.append('g')
//         .attr('transform', `translate(${attr.marginX}, ${attr.height - attr.marginY})`)
//         .call(d3.axisBottom(scaleX))
//         .selectAll('text')
//         .style('text-anchor', 'end')
//         .attr('dx', '-.8em')
//         .attr('dy', '.15em')
//         .attr('transform', 'rotate(-45)');

//     svg.append('g')
//         .attr('transform', `translate(${attr.marginX}, ${attr.marginY})`)
//         .call(d3.axisLeft(scaleY));

//     return [scaleX, scaleY];
// }

// function createHistogram(svg, data, scaleX, scaleY, attr) {
//     const barWidth = scaleX.bandwidth() * 0.6;
//     // Удаляем старые элементы
//     svg.selectAll('.max-bar, .min-bar').remove();

//     // Макс
//     svg.selectAll('.max-bar')
//         .data(data)
//         .enter()
//         .append('rect')
//         .attr('class', 'max-bar')
//         .attr('x', d => scaleX(String(d.labelX)) + (scaleX.bandwidth() - barWidth)/2 + attr.marginX)
//         .attr('y', d => scaleY(d.max) + attr.marginY)
//         .attr('width', barWidth)
//         .attr('height', d => attr.height - 2*attr.marginY - scaleY(d.max))
//         .style('fill', '#4CAF50');

//     // Мин
//     svg.selectAll('.min-bar')
//         .data(data)
//         .enter()
//         .append('rect')
//         .attr('class', 'min-bar')
//         .attr('x', d => scaleX(String(d.labelX)) + (scaleX.bandwidth() - barWidth)/2 + attr.marginX)
//         .attr('y', d => scaleY(d.min) + attr.marginY)
//         .attr('width', barWidth)
//         .attr('height', d => attr.height - 2*attr.marginY - scaleY(d.min))
//         .style('fill', '#FF5722');
// }

// function createChart(svg, data, scaleX, scaleY, attr) {
//     // Точечная диаграмма
//     svg.selectAll('.max-dot, .min-dot').remove();
//     const r = 4;

//     svg.selectAll('.max-dot')
//         .data(data)
//         .enter()
//         .append('circle')
//         .attr('class', 'max-dot')
//         .attr('cx', d => scaleX(String(d.labelX)) + scaleX.bandwidth()/2 + attr.marginX)
//         .attr('cy', d => scaleY(d.max) + attr.marginY)
//         .attr('r', r)
//         .style('fill', 'red');

//     svg.selectAll('.min-dot')
//         .data(data)
//         .enter()
//         .append('circle')
//         .attr('class', 'min-dot')
//         .attr('cx', d => scaleX(String(d.labelX)) + scaleX.bandwidth()/2 + attr.marginX)
//         .attr('cy', d => scaleY(d.min) + attr.marginY)
//         .attr('r', r)
//         .style('fill', 'blue');
// }

// function createLine(svg, data, scaleX, scaleY, attr) {
//     // Линейный график и точки
//     svg.selectAll('.line, .line-point').remove();
//     const lineGen = d3.line()
//         .x(d => scaleX(String(d.labelX)) + scaleX.bandwidth()/2)
//         .y(d => scaleY(d.value));

//     // Макс
//     const maxData = data.map(d => ({ labelX: d.labelX, value: d.max }));
//     svg.append('path')
//         .datum(maxData)
//         .attr('class', 'line max-line')
//         .attr('d', lineGen)
//         .attr('transform', `translate(${attr.marginX}, ${attr.marginY})`)
//         .style('fill', 'none')
//         .style('stroke', 'red');
//     svg.selectAll('.max-point')
//         .data(maxData)
//         .enter()
//         .append('circle')
//         .attr('class', 'line-point max-point')
//         .attr('cx', d => scaleX(String(d.labelX)) + scaleX.bandwidth()/2 + attr.marginX)
//         .attr('cy', d => scaleY(d.value) + attr.marginY)
//         .attr('r', 3)
//         .style('fill', 'red');

//     // Мин
//     const minData = data.map(d => ({ labelX: d.labelX, value: d.min }));
//     svg.append('path')
//         .datum(minData)
//         .attr('class', 'line min-line')
//         .attr('d', lineGen)
//         .attr('transform', `translate(${attr.marginX}, ${attr.marginY})`)
//         .style('fill', 'none')
//         .style('stroke', 'blue');
//     svg.selectAll('.min-point')
//         .data(minData)
//         .enter()
//         .append('circle')
//         .attr('class', 'line-point min-point')
//         .attr('cx', d => scaleX(String(d.labelX)) + scaleX.bandwidth()/2 + attr.marginX)
//         .attr('cy', d => scaleY(d.value) + attr.marginY)
//         .attr('r', 3)
//         .style('fill', 'blue');
// }

////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////





// chart.js (исправленная версия)
function createArrGraph(data, keyX) {
    const groupObj = d3.group(data, d => {
        // Для Населения группируем по диапазонам
        if (keyX === 'Население') {
            const range = Math.floor(d[keyX] / 5000000) * 5000000;
            return `${range / 1000000}-${(range + 5000000) / 1000000} млн`;
        }
        return d[keyX];
    });
    
    let arrGraph = [];

    for (const [key, records] of groupObj) {
        const salaries = records.map(d => d['Средний заработок']);
        const min = d3.min(salaries);
        const max = d3.max(salaries);
        arrGraph.push({ labelX: key, min, max });
    }

    // Сортировка для Населения по нижней границе диапазона
    if (keyX === 'Население') {
        arrGraph.sort((a, b) => {
            const aStart = parseFloat(a.labelX.split('-')[0]);
            const bStart = parseFloat(b.labelX.split('-')[0]);
            return aStart - bStart;
        });
    } 
    // Сортировка для Страны по алфавиту
    else if (keyX === 'Страна') {
        arrGraph.sort((a, b) => a.labelX.localeCompare(b.labelX));
    }

    return arrGraph;
}

function drawGraph(data, keyX = 'Страна', showMin = false, showMax = true) {
    if (!showMin && !showMax) {
        alert("Выберите min, max или оба значения для оси OY");
        return;
    }

    const arrGraph = createArrGraph(data, keyX);
    const svg = d3.select('svg');
    svg.selectAll('*').remove();

    const attr = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 50
    };

    const [scaleX, scaleY] = createAxis(svg, arrGraph, attr, showMin, showMax);
    const graphType = document.getElementById('selectGraph').value;

    if (graphType === 'histogram') {
        createHistogram(svg, arrGraph, scaleX, scaleY, attr, showMin, showMax);
    } else if (graphType === 'line') {
        createLine(svg, arrGraph, scaleX, scaleY, attr, showMin, showMax);
    } else {
        createChart(svg, arrGraph, scaleX, scaleY, attr, showMin, showMax);
    }
}

function createAxis(svg, data, attr, showMin, showMax) {
    const allValues = [];
    data.forEach(d => {
        if (showMin) allValues.push(d.min);
        if (showMax) allValues.push(d.max);
    });

    if (allValues.length === 0) allValues.push(0, 1);
    
    const [minY, maxY] = d3.extent(allValues);
    const domainX = data.map(d => String(d.labelX));
    
    const scaleX = d3.scaleBand()
        .domain(domainX)
        .range([0, attr.width - 2 * attr.marginX])
        .padding(0.1);

    const scaleY = d3.scaleLinear()
        .domain([minY * 0.85, maxY * 1.1])
        .range([attr.height - 2 * attr.marginY, 0]);

    svg.append('g')
        .attr('transform', `translate(${attr.marginX}, ${attr.height - attr.marginY})`)
        .call(d3.axisBottom(scaleX))
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', 'rotate(-45)');

    svg.append('g')
        .attr('transform', `translate(${attr.marginX}, ${attr.marginY})`)
        .call(d3.axisLeft(scaleY));

    return [scaleX, scaleY];
}

function createHistogram(svg, data, scaleX, scaleY, attr, showMin, showMax) {
    const barWidth = scaleX.bandwidth() * 0.6;
    svg.selectAll('.max-bar, .min-bar').remove();

    if (showMax) {
        svg.selectAll('.max-bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'max-bar')
            .attr('x', d => scaleX(String(d.labelX)) + (scaleX.bandwidth() - barWidth)/2 + attr.marginX)
            .attr('y', d => scaleY(d.max) + attr.marginY)
            .attr('width', barWidth)
            .attr('height', d => attr.height - 2*attr.marginY - scaleY(d.max))
            .style('fill', '#4CAF50');
    }

    if (showMin) {
        svg.selectAll('.min-bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'min-bar')
            .attr('x', d => scaleX(String(d.labelX)) + (scaleX.bandwidth() - barWidth)/2 + attr.marginX)
            .attr('y', d => scaleY(d.min) + attr.marginY)
            .attr('width', barWidth)
            .attr('height', d => attr.height - 2*attr.marginY - scaleY(d.min))
            .style('fill', '#FF5722');
    }
}

function createChart(svg, data, scaleX, scaleY, attr, showMin, showMax) {
    svg.selectAll('.max-dot, .min-dot').remove();
    const r = 4;

    if (showMax) {
        svg.selectAll('.max-dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'max-dot')
            .attr('cx', d => scaleX(String(d.labelX)) + scaleX.bandwidth()/2 + attr.marginX)
            .attr('cy', d => scaleY(d.max) + attr.marginY)
            .attr('r', r)
            .style('fill', 'red');
    }

    if (showMin) {
        svg.selectAll('.min-dot')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'min-dot')
            .attr('cx', d => scaleX(String(d.labelX)) + scaleX.bandwidth()/2 + attr.marginX)
            .attr('cy', d => scaleY(d.min) + attr.marginY)
            .attr('r', r)
            .style('fill', 'blue');
    }
}

function createLine(svg, data, scaleX, scaleY, attr, showMin, showMax) {
    svg.selectAll('.line, .line-point').remove();
    const lineGen = d3.line()
        .x(d => scaleX(String(d.labelX)) + scaleX.bandwidth()/2)
        .y(d => scaleY(d.value));

    if (showMax) {
        const maxData = data.map(d => ({ labelX: d.labelX, value: d.max }));
        svg.append('path')
            .datum(maxData)
            .attr('class', 'line max-line')
            .attr('d', lineGen)
            .attr('transform', `translate(${attr.marginX}, ${attr.marginY})`)
            .style('fill', 'none')
            .style('stroke', 'red');
        svg.selectAll('.max-point')
            .data(maxData)
            .enter()
            .append('circle')
            .attr('class', 'line-point max-point')
            .attr('cx', d => scaleX(String(d.labelX)) + scaleX.bandwidth()/2 + attr.marginX)
            .attr('cy', d => scaleY(d.value) + attr.marginY)
            .attr('r', 3)
            .style('fill', 'red');
    }

    if (showMin) {
        const minData = data.map(d => ({ labelX: d.labelX, value: d.min }));
        svg.append('path')
            .datum(minData)
            .attr('class', 'line min-line')
            .attr('d', lineGen)
            .attr('transform', `translate(${attr.marginX}, ${attr.marginY})`)
            .style('fill', 'none')
            .style('stroke', 'blue');
        svg.selectAll('.min-point')
            .data(minData)
            .enter()
            .append('circle')
            .attr('class', 'line-point min-point')
            .attr('cx', d => scaleX(String(d.labelX)) + scaleX.bandwidth()/2 + attr.marginX)
            .attr('cy', d => scaleY(d.value) + attr.marginY)
            .attr('r', 3)
            .style('fill', 'blue');
    }
}