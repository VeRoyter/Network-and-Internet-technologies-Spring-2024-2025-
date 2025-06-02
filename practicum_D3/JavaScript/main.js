// let draw = (dataForm) => {
// 	const svg = d3.select("svg")
//     let pict = drawSmile(svg)

//     const x = dataForm.cx.value;
//     const y = dataForm.cy.value;
//     const rotate = dataForm.rotate.value;
//     const scale = dataForm.scale.value;

//     pict.attr("transform", `
//         translate(${x}, ${y})
//         rotate(${rotate})
//         scale(${scale}, )
//     `);
// }

function interpolateImage(){

}

let draw = (dataForm) => {
	const svg = d3.select("svg")
    let pict = drawCat(svg)
    pict.attr("transform", 
             `translate(    ${dataForm.cx.value}, ${dataForm.cy.value}) 
             scale(         ${dataForm.mx.value}, ${dataForm.my.value})
             rotate(        ${dataForm.rotate.value})`
            );
}

function clearSVG() {
    const svg = d3.select("svg");
    svg.selectAll("*").remove();
}

document.addEventListener('DOMContentLoaded', function() {

    const element_setting = document.getElementById("setting");
    const element_improve = document.getElementById("improveSetting");
    const element_direction = document.getElementById("element_direction");
    const element_way = document.getElementById("element_way");

    const check_setting = document.getElementById("setting_animateCheckbox");
    const check_improve = document.getElementById("improveSetting_animateCheckbox");
    const check_way = document.getElementById("improveSetting_way");

    element_improve.style.display = 'none';
    element_way.style.display = 'none';

    check_setting.addEventListener('change', function() {
        if (this.checked) {
            element_setting.style.display = 'none';
            element_improve.style.display = 'block';
            check_improve.checked = !check_improve.checked;
        } else {
            element_setting.style.display = 'block';
            element_improve.style.display = 'none';
        }
    });

    check_improve.addEventListener('change', function() {
        if (!this.checked) {
            element_improve.style.display = 'none';
            element_setting.style.display = 'block';
            check_setting.checked = !check_setting.checked;

            if (check_way.checked ){
                check_way.checked = !check_way.checked;
            }
            element_way.style.display = 'none';
            element_direction.style.display = 'block';
            
        } else {
            element_improve.style.display = 'block';
            element_setting.style.display = 'none';
        }
    });

    check_way.addEventListener('change', function() {
        if (!this.checked) {
            element_way.style.display = 'none';
            element_direction.style.display = 'block';
        } else {
            element_way.style.display = 'block';
            element_direction.style.display = 'none';
        }
    });
    

});

let runAnimation = (dataForm) => {
    const check_way = document.getElementById("improveSetting_way");
    const easeType = document.getElementById("easeType").value;
    const easeFunction = {
        linear: d3.easeLinear,
        elastic: d3.easeElastic,
        bounce: d3.easeBounce
    }[easeType];

    // Очищаем предыдущие элементы
    // clearSVG();
    const svg = d3.select("svg");
    let pict = drawCat(svg);

    if (!check_way.checked) {
        // Стандартная анимация
        const startX = dataForm.cx.value;
        const startY = dataForm.cy.value;
        const endX = dataForm.cx_finish.value;
        const endY = dataForm.cy_finish.value;
        const startScaleX = dataForm.mx.value;
        const startScaleY = dataForm.my.value;
        const endScaleX = dataForm.mx_finish.value;
        const endScaleY = dataForm.my_finish.value;
        const startRotate = dataForm.start_rotate.value;
        const endRotate = dataForm.finish_rotate.value;

        pict.attr("transform", `
            translate(${startX}, ${startY})
            rotate(${startRotate})
            scale(${startScaleX}, ${startScaleY})
        `)
        .transition()
        .duration(6000)
        .ease(easeFunction)
        .attr("transform", `
            translate(${endX}, ${endY})
            rotate(${endRotate})
            scale(${endScaleX}, ${endScaleY})
        `);
    } else {
        // Анимация вдоль пути
        const pathType = document.querySelector("#element_way select").value;
        const path = drawPath(pathType);
        
        pict.attr("transform", `
            rotate(${dataForm.start_rotate.value})
            scale(${dataForm.mx.value}, ${dataForm.my.value})
        `)
        .transition()
        .duration(6000)
        .ease(easeFunction)
        .attrTween("transform", translateAlong(
            path.node(),
            +dataForm.start_rotate.value,
            +dataForm.finish_rotate.value,
            +dataForm.mx.value,
            +dataForm.mx_finish.value,
            +dataForm.my.value,
            +dataForm.my_finish.value
        ));
    }
};