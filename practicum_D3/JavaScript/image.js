// создаем изображение смайлик
// рисуем его относительно точки (0, 0)
function drawSmile(svg) {
    let smile = svg.append("g")
        .style("stroke", "brown")
        .style("stroke-width", 2)
        .style("fill", "brown");
    //лицо
    smile.append("circle") 
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 50)
        .style("fill", "yellow");
    //левый глаз   
    smile.append("circle") 
        .attr("cx", -20)
        .attr("cy", -10)
        .attr("r", 5);
    //правый глаз
    smile.append("circle") 
        .attr("cx", 20)
        .attr("cy", -10)
        .attr("r", 5);
    // улыбка
    let arc = d3.arc()
       .innerRadius(35)
       .outerRadius(35);    
    smile.append("path")
       .attr("d", arc({startAngle: Math.PI /3 * 2, endAngle: Math.PI/3 * 4}))
       .style("stroke", "brown")

     return smile  
}   

function drawCat(svg) {
    const cat = svg.append("g")
        .style("stroke", "#000")
        .style("stroke-width", 2)
        .style("fill", "#808080");

    // Голова
    cat.append("circle")
        .attr("r", 60)
        .attr("cy", -50);

    const earPath = "M -25 -40 L 0 -100 L 25 -40 Z"; // Уменьшено в 2 раза
    cat.append("path")
        .attr("d", earPath)
        .attr("transform", "translate(-35, -60)");  // Новая позиция левого уха

    cat.append("path")
        .attr("d", earPath)
        .attr("transform", "translate(35, -60)");   // Новая позиция правого уха

    // Глаза
    cat.append("circle")
        .attr("r", 8)
        .attr("cx", -30)
        .attr("cy", -70);

    cat.append("circle")
        .attr("r", 8)
        .attr("cx", 30)
        .attr("cy", -70);

    // Нос
    cat.append("path")
        .attr("d", "M -10 -40 L 10 -40 L 0 -30 Z")
        .style("fill", "pink");

    // Усы
    const whiskers = [
        "M -40 -40 Q -120 -30 -140 -20",
        "M -40 -40 Q -120 -50 -140 -60",
        "M 40 -40 Q 120 -30 140 -20",
        "M 40 -40 Q 120 -50 140 -60"
    ];
    
    whiskers.forEach(d => {
        cat.append("path")
            .attr("d", d)
            .style("fill", "none");
    });
    return cat;
}