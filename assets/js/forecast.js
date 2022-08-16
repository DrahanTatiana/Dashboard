document.addEventListener("DOMContentLoaded", function (event) {
  getWeather('Kyiv');
});




function getWeather(city) {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=c59d5c3213ca1b62229ef062537fe346&units=metric&lang=ru')
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
  const months = ["Счень", "Лютий", "Березень", "Квтень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
  const days = ["Недля", "Понедлок", "rhtnrf", "Середа", "Четвер", "П'ятниця", "Субота"];

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
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=22e50a48f79d633286f564b3f2cc9f7f`)
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

  return `${day}, ${date} ${month} ${year}`;

}