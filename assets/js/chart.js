let array = []; 

const saveInfo=()=>{
    let chartInfo=JSON.stringify(array);
localStorage.setItem("graph", chartInfo);
}

array=localStorage.getItem('graph')
    ? JSON.parse(localStorage.getItem('graph'))
    : array;

function buildBar() {
let inputs = document.getElementsByClassName("stepsInput");
for(let i = 0; i < inputs.length; i++){
array[array.length] = inputs[i].value;
};
}

const config = {
    data: {
        labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        datasets: [{
            data:array,
            type: 'bar',
            label: "Количество пройденных шагов",
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                ],
            borderWidth: 1
        },
        {
            data:array,
            type:'line',
            backgroundColor: ['rgba(255, 165, 0, 0.5)'],
            borderColor: ['rgba(255, 165, 0, 0.7)'],
        }

        ]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Количество пройденных шагов',
                font: '100px, Verdana',
           },
            legend:{
                display:false,}
        },
        scales: {
            y: {
                beginAtZero: true,
                },
        },
    },
responsive: true,
};

function render() {
myChart.destroy();
array.length=0; 
myChart=new Chart (
     document.getElementById('myChart'),
     config,
     buildBar(),
)
saveInfo();
}

function destroy() {
    myChart.destroy();
    array.length=0;
    console.log(array);
    myChart=new Chart (
        document.getElementById('myChart'),
        config);
        saveInfo();
       let inputs = document.querySelectorAll('input[type=number]');
        for (let i = 0;  i < inputs.length; i++) {
          inputs[i].value = 0;
};
}

function drawChart(){
    myChart=new Chart (
        document.getElementById('myChart'),
        config);
}

document.addEventListener("DOMContentLoaded",
    function () {
        drawChart();
})



