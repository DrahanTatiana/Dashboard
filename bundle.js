(function () {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c) return c(i, !0);
                    if (u) return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND", a
                }
                var p = n[i] = {
                    exports: {}
                };
                e[i][0].call(p.exports, function (r) {
                    var n = e[i][1][r];
                    return o(n || r)
                }, p, p.exports, r, e, n, t)
            }
            return n[i].exports
        }
        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
        return o
    }
    return r
})()({
    1: [function (require, module, exports) {


    }, {}],
    2: [function (require, module, exports) {
        let array = [];

        const saveInfo = () => {
            let chartInfo = JSON.stringify(array);
            localStorage.setItem("graph", chartInfo);
        }

        array = localStorage.getItem('graph') ?
            JSON.parse(localStorage.getItem('graph')) :
            array;

        function buildBar() {
            let inputs = document.getElementsByClassName("stepsInput");
            for (let i = 0; i < inputs.length; i++) {
                array[array.length] = inputs[i].value;
            };
        }

        const config = {
            data: {
                labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
                datasets: [{
                        data: array,
                        type: 'bar',
                        label: "Графік кроків",
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
                        data: array,
                        type: 'line',
                        backgroundColor: ['rgba(255, 165, 0, 0.5)'],
                        borderColor: ['rgba(255, 165, 0, 0.7)'],
                    }

                ]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Графік зроблених кроків',
                        font: '100px, Verdana',
                    },
                    legend: {
                        display: false,
                    }
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
            array.length = 0;
            myChart = new Chart(
                document.getElementById('myChart'),
                config,
                buildBar(),
            )
            saveInfo();
        }

        function destroy() {
            myChart.destroy();
            array.length = 0;
            console.log(array);
            myChart = new Chart(
                document.getElementById('myChart'),
                config);
            saveInfo();
            let inputs = document.querySelectorAll('input[type=number]');
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].value = 0;
            };
        }

        function drawChart() {
            myChart = new Chart(
                document.getElementById('myChart'),
                config);
        }

        document.addEventListener("DOMContentLoaded",
            function () {
                drawChart();
            })




    }, {}],
    3: [function (require, module, exports) {
        document.addEventListener("DOMContentLoaded", function (event) {
            getWeather('Kyiv');
        });




        function getWeather(city) {
            fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '22e50a48f79d633286f564b3f2cc9f7f&units=metric&lang=UA"')
                .then(response => response.json())
                .then(weather => {
                    console.log(weather);

                    const now = new Date();
                    const date = document.querySelector('.date');
                    date.innerText = currentDate(now);
                    document.querySelector('.city').innerHTML = weather.name;
                    document.querySelector('.temp').innerHTML = Math.round(weather.main.temp) + ' °C';
                    document.querySelector('.high-low').innerHTML = Math.round(weather.main.temp_max) + ' °C' + " / " + Math.round(weather.main.temp_min) + ' °C';
                    document.querySelector('.weather__description').innerText = weather.weather[0].description;
                    document.querySelector('.wind').innerHTML = weather.wind.speed + ' км/г';
                    document.querySelector('.humidity').innerHTML = Math.round(weather.main.humidity) + ' %';
                    //http://openweathermap.org/img/wn/04d@2x.png
                    document.querySelector('.weather__icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png">`;
                })

                .catch(err => console.log(err));

        }

        function currentDate(d) {
            const months = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
            const days = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];

            const day = days[d.getDay()];
            const date = d.getDate();
            const month = months[d.getMonth()];
            const year = d.getFullYear();

            return `${day}, ${date} ${month} ${year}`;
        }



        if (navigator.geolocation) {
            window.onload = function () {


                function getCurrentLocation(position) {
                    const currentPosition = position;
                    const lat = currentPosition.coords.latitude;
                    const lon = currentPosition.coords.longitude;
                    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=22e50a48f79d633286f564b3f2cc9f7f&units=metric&lang=UA"`)
                        .then(response => response.json())
                        .then(weather => {
                            console.log(weather);

                            const now = new Date();
                            const date = document.querySelector('.date');
                            date.innerText = currentDate(now);
                            document.querySelector('.city').innerText = weather.name;
                            document.querySelector('.temp').innerHTML = Math.round(weather.main.temp) + ' °C';
                            document.querySelector('.high-low').innerText = Math.round(weather.main.temp_max) + ' °C' + " / " + Math.round(weather.main.temp_min) + ' °C';
                            document.querySelector('.weather__description').innerText = weather.weather[0].description;
                            document.querySelector('.wind').innerText = weather.wind.speed + ' км/г';
                            document.querySelector('.humidity').innerText = Math.round(weather.main.humidity) + ' %';
                            //http://openweathermap.org/img/wn/04d@2x.png
                            document.querySelector('.weather__icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png">`;
                        })

                        .catch(err => console.log(err));

                };

                navigator.geolocation.getCurrentPosition(getCurrentLocation);
            };

        }

        function currentDate(d) {
            const months = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
            const days = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];

            const day = days[d.getDay()];
            const date = d.getDate();
            const month = months[d.getMonth()];
            const year = d.getFullYear();

            return `${day}, ${date}${month},${year}`;

        }


    }, {}],
    4: [function (require, module, exports) {
        const nameFromStorage = localStorage.getItem('name');

        if (nameFromStorage === null) {
            const name = prompt('Доброго вечора, ми з України! Як до вас звертатися?');
            if (name === '') {
                document.querySelector('#hi').innerHTML = `<b>Гость</b>, ласкаво просимо!`;
            } else {
                document.querySelector('#hi').innerHTML = `<b>${name}</b>, ласкаво просимо!`;
                localStorage.setItem('name', name);
            }

        } else {
            document.querySelector('#hi').innerHTML = `<b>${nameFromStorage}</b>, ласкаво просимо!`;
        }

    }, {}],
    5: [function (require, module, exports) {
        const generateNotes = (notes) => {
            console.log(notes)
            if (notes && notes.length) {
                let notesInnerHtml = ''
                notes.forEach((note, index) => {
                    notesInnerHtml += `<div class = "list-group-item d-flex justify-content-between align-items-center"> 
            <div class="card-header"> Note: ${index + 1}</div> 
            <div class="card-body">${note}</div>
            <div><button id=${index} class='btn btn-sm btn-secondary btn-remove'>Удалить</button></div>
            </div>`

                })
                document.querySelector('#notes').innerHTML = notesInnerHtml;

                const removeBtns = document.querySelectorAll('.btn-remove')
                removeBtns.forEach((btn) => {
                    btn.addEventListener('click', function removeTask(event) {
                        notes.splice(event.target.id, 1)
                        localStorage.setItem('notes', JSON.stringify(notes))
                        if (notes.length === 0) {
                            document.querySelector('#notes').innerHTML = '';
                        } else {
                            generateNotes(notes);
                        }
                    })
                })
            }
        }

        const addNote = () => {
            const newTextNote = document.querySelector('#exampleTextarea')

            if (!newTextNote.value) {
                document.querySelector('.text-danger').innerHTML = "No note"
                return
            }

            const storedNotes = localStorage.getItem('notes')

            let notes = storedNotes ?
                JSON.parse(storedNotes) : []

            notes.push(newTextNote.value)
            newTextNote.value = '';

            localStorage.setItem('notes', JSON.stringify(notes))

            generateNotes(notes)


        }

        document.addEventListener('DOMContentLoaded', () => {
            let notes = localStorage.getItem('notes')
            if (notes !== 0) {
                generateNotes(JSON.parse(notes))
            }

        })


    }, {}],
    6: [function (require, module, exports) {
        require('./assets/js/greeting');
        require('./assets/js/forecast');
        require('./assets/js/calendar');
        require('./assets/js/tasks');
        require('./assets/js/chart');






    }, {
        "./assets/js/calendar": 1,
        "./assets/js/chart": 2,
        "./assets/js/forecast": 3,
        "./assets/js/greeting": 4,
        "./assets/js/tasks": 5
    }]
}, {}, [6]);
