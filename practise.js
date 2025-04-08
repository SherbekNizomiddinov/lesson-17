const elForm = document.querySelector(".js-weather-card");
const elInput = elForm.querySelector(".js-cityInput");
const elTemlate = document.querySelector(".js-template").content;
const elResult = document.querySelector(".js-weatherResult");

const URL = `https://api.openweathermap.org/data/2.5/weather?q=`;
const KEYINFO = `b95bc8965bafdc167a2fab4686e70674`;

// API dan ma`lumotlarni olish uchun
async function weatherInfo(city){
    try{
        const request = await fetch(URL + city + `&appid=${KEYINFO}&units=metric`);
    if(request.ok){
        const response = await request.json();
        console.log(response.weather);
        return {
            name: response.name,
            temp: response.main.temp,
            humidity: response.main.humidity,
            wind: response.wind.speed,
            sunrise: response.sys.sunrise,
            sunset: response.sys.sunset,
            icon: response.weather[0].icon,
            description: response.weather.description,
        }
    } else throw new Error("xatolik");
    } catch(error){
        console.log(error);
    }
}
function resultInfo(obj){
    const clone = elTemlate.cloneNode(true);
    elResult.innerHTML = "";

    clone.querySelector(".js-city").textContent = obj.name;
    clone.querySelector(".js-temp").textContent = obj.temp + `°`;
    clone.querySelector(".js-icon").src = `http://openweathermap.org/img/wn/${obj.icon}@2x.png`;
    clone.querySelector(".js-desc").textContent = obj.description;
    clone.querySelector(".js-temp1").textContent = ` ` + obj.temp + `°C`;
    clone.querySelector(".js-humidity").textContent = obj.humidity + `%`;
    clone.querySelector(".js-wind").textContent = `E` + obj.wind + `m/s`;
    clone.querySelector(".js-sunrise").textContent = new Date(obj.sunrise * 1000).toLocaleTimeString();
    clone.querySelector(".js-sunset").textContent = new Date(obj.sunset * 1000).toLocaleTimeString();

    elResult.append(clone);
} 
weatherInfo(`Samarqand`)
        .then(obj => resultInfo(obj));

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if(elInput.value){
        weatherInfo(elInput.value)
        .then(obj => resultInfo(obj));
    } else alert("iltimos shahar nomini kiriting");
})
  