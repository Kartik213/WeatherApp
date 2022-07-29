// Declaring the variables
let lon;
let lat;
const kelvin = 273;

window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            
            // API ID
            const api = "0c2d3bb3b8706729d8f07156bc4c2901";

            // API URL
            const base =
                `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
                `lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df`;

            // Calling the API
            fetch(base)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    const { name } = data;
                    const { icon, description } = data.weather[0];
                    const { temp, humidity } = data.main;
                    const { speed } = data.wind;
                    document.querySelector(".city").innerText = "Weather in " + name;
                    document.querySelector(".icon").src =
                        "https://openweathermap.org/img/wn/" + icon + ".png";
                    document.querySelector(".description").innerText = description;
                    document.querySelector(".temp").innerText = (temp-kelvin).toFixed(2) + "°C";
                    document.querySelector(".humidity").innerText =
                        "Humidity: " + humidity + "%";
                    document.querySelector(".wind").innerText =
                        "Wind speed: " + speed + " km/h";
                    document.querySelector(".weather").classList.remove("loading");
                });
        });
    }
});
