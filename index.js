
const apiKey = "8b8cea02bf2d7ac974bc762d397bf538";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°c';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' KM/H';

        // تحديث صورة الطقس بناءً على البيانات
        const weatherCondition = data.weather[0].main.toLowerCase();
        if (weatherCondition.includes("cloud")) {
            weatherIcon.src = "./images/clouds.png";
        } else if (weatherCondition.includes("rain")) {
            weatherIcon.src = "./images/rain.png";
        } else if (weatherCondition.includes("clear")) {
            weatherIcon.src = "./images/clear.png";
        } else if (weatherCondition.includes("snow")) {
            weatherIcon.src = "./images/snow.png";
        } else {
            weatherIcon.src = "./images/drizzle.png"; // صورة افتراضية
        }

    } catch (error) {
        alert("City not found! Please enter a valid city name.");
    }
}

checkWeather("Qina");
searchBox.value='';

// إضافة حدث عند النقر على زر البحث
searchBtn.addEventListener('click', function () {
    checkWeather(searchBox.value);
    searchBox.value='';
});

// إضافة دعم للضغط على "Enter" في خانة الإدخال
searchBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
        searchBox.value='';
    }
});

