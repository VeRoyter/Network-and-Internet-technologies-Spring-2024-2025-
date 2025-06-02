/* массив точек пути будет иметь следующий вид:
  [
    {x: координата, y: координата},
    {x: координата, y: координата},
    ...
  ]
*/
// создаем массив точек, расположенных буквой "Г"
function createPathG() {
    const svg = d3.select("svg")
	const width = svg.attr("width")
	const height = svg.attr("height")

    let data = [];
    const padding = 100;
    //начальное положение рисунка
    let posX = padding;
    let posY = height - padding;
    const h = 5;
    // координаты y - уменьшаются, x - постоянны
    while (posY > padding) {
        data.push( {x: posX, y: posY});
        posY -= h;
    }
    // координаты y - постоянны, x - увеличиваются
    while (posX < width - padding) {
        data.push( {x: posX, y: posY});
        posX += h;
    }
    return data
}

// создаем массив точек, расположенных по кругу
function createPathCircle() {
    const svg = d3.select("svg")
	const width = svg.attr("width")
	const height = svg.attr("height")
    let data = [];
    // используем параметрическую форму описания круга
    // центр расположен в центре svg-элемента, а радиус равен трети высоты/ширины
    for (let t = 0 ; t <= Math.PI * 2; t += 0.1) {
        data.push(
            {x: width / 2 + width / 3 * Math.sin(t),
             y: height / 2 + height / 3 * Math.cos(t)}
        );
    }
    return data
}

// // path.js
// function createPathEight() {
//     const svg = d3.select("svg");
//     const width = parseInt(svg.attr("width"));
//     const height = parseInt(svg.attr("height"));
//     let data = [];
//     const centerX = width / 2;
//     const centerY = height / 2;
//     const radius = 150; // Радиус восьмёрки

//     // Параметрическое уравнение восьмёрки: 
//     // x = centerX + radius * sin(t)
//     // y = centerY + radius * sin(2t) / 2
//     for (let t = 0; t <= Math.PI * 2; t += 0.01) {
//         const x = centerX + radius * Math.sin(t);
//         const y = centerY + (radius / 2) * Math.sin(2 * t);
//         data.push({x, y});
//     }

//     return data;
// }
// function createPathEight() {
//     const svg = d3.select("svg");
//     const width = parseInt(svg.attr("width"));
//     const height = parseInt(svg.attr("height"));
//     let data = [];
//     const centerX = width / 2;
//     const centerY = height / 2;
//     const a = 150; // Параметр "a" из уравнения

//     // Параметризация лемнискаты Бернулли:
//     // x = a * cos(t) / (1 + sin²(t))
//     // y = a * sin(t) * cos(t) / (1 + sin²(t))
//     for (let t = 0; t <= Math.PI * 2; t += 0.02) {
//         const denominator = 1 + Math.pow(Math.sin(t), 2);
//         const x = centerX + a * Math.cos(t) / denominator;
//         const y = centerY + a * Math.sin(t) * Math.cos(t) / denominator;
//         data.push({x, y});
//     }

//     return data;
// }

function createPathEight() {
    const svg     = d3.select("svg");
    const width   = parseInt(svg.attr("width"))  || 800;
    const height  = parseInt(svg.attr("height")) || 600;
    const centerX = width  / 2;
    const centerY = height / 2;
    const a       = 150;     // масштаб лемнискаты
    const data    = [];

    // исходная лемниската:
    // x0 = a * cos(t) / (1 + sin²(t))
    // y0 = a * sin(t) * cos(t) / (1 + sin²(t))
    //
    // для вертикальной ориентации меняем местами x0 и y0:
    // x = centerX + y0
    // y = centerY + x0
    for (let t = 0; t <= Math.PI * 2; t += 0.02) {
        const s = Math.sin(t);
        const c = Math.cos(t);
        const denom = 1 + s * s;

        // исходное
        const x0 = a * c / denom;
        const y0 = a * s * c / denom;

        // «повёрнутое» (swap)
        const x = centerX + y0;
        const y = centerY + x0;

        data.push({ x, y });
    }

    return data;
}


let drawPath =(typePath) => {
	    const dataPoints = 
        typePath == 0 ? createPathG() : 
        typePath == 1 ? createPathCircle() : 
        createPathEight();

	const line = d3.line()
		.x((d) => d.x)
		.y((d) => d.y);
    const svg = d3.select("svg")
	// создаем путь на основе массива точек	  
	const path = svg.append('path')
		.attr('d', line(dataPoints))
		.attr('none', 'black')
		.attr('fill', 'none');

	if (typePath === 3) {
        path.attr('transform', `rotate(90, ${centerX}, ${centerY})`);
    }

	return path;	
}

// function translateAlong(path) {
//     const length = path.getTotalLength();
//     return function() {
//         return function(t) {
//             const {x, y} = path.getPointAtLength(t * length);
//             return `translate(${x},${y})`;
//         }
//     }
// }


// ОНО РАБОТАЕТ!!!!!
function interpolateImage(start, end, t) {
    const a = Number(start);
    const b = Number(end);
    let c = Number(t);

    // if (isNaN(a) || isNaN(b) || isNaN(c)) {
    //     console.error("Invalid input: start, end, and t must be numbers || Ошибка ввода: начало, конец и параметр t должны иметь числовой тип");
    //     return 0;
    // }

    c = Math.max(0, Math.min(1, c));

    return a + (b - a) * c;
}


function translateAlong(path, startRotate, endRotate, startScaleX, endScaleX, startScaleY, endScaleY) {
    const length = path.getTotalLength();

    return function() {
        return function(t) {
            const {x, y} = path.getPointAtLength(t * length);
            return `
                translate(${x}, ${y})
                rotate(${interpolateImage(startRotate, endRotate, t)})
                scale( ${interpolateImage(startScaleX, endScaleX, t)}, ${interpolateImage(startScaleY, endScaleY, t)}
                )
            `;
        };
    };

    // const rotateInterpolate = d3.interpolateNumber(startRotate, endRotate);
    // const scaleXInterpolate = d3.interpolateNumber(startScaleX, endScaleX);
    // const scaleYInterpolate = d3.interpolateNumber(startScaleY, endScaleY);

    // return function() {
    //     return function(t) {
    //         const {x, y} = path.getPointAtLength(t * length);
    //         const currentRotate = rotateInterpolate(t);
    //         const currentScaleX = scaleXInterpolate(t);
    //         const currentScaleY = scaleYInterpolate(t);
            
    //         return `
    //             translate(${x}, ${y})
    //             rotate(${currentRotate})
    //             scale(${currentScaleX}, ${currentScaleY})
    //         `;
    //     };
    // };
}