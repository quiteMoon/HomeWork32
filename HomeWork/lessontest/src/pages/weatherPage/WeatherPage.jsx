import axios from "axios";
import { useState } from "react";
import './WeatherPage.css'; 

function WeatherPage() {
    const [city, setCity] = useState("Rivne");
    const [displayedCity, setDisplayedCity] = useState("Rivne");
    const [region, setRegion] = useState("");
    const [country, setCountry] = useState("");
    const [localTime, setLocalTime] = useState("");
    const [temp, setTemp] = useState(0);
    const [cloudiness, setCloudiness] = useState("");
    const [pressure, setPressure] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);
    const [windDir, setWindDir] = useState("");
    const [weatherIcon, setWeatherIcon] = useState("");

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const fetchWeather = () => {
        const url = `https://api.weatherapi.com/v1/current.json?key=9c8ba75b0a7544bf87d173654242904&q=${city}`;

        axios(url)
            .then((response) => {
                const data = response.data;
                setTemp(data.current.temp_c);
                setCloudiness(data.current.condition.text);
                setPressure(data.current.pressure_mb);
                setWindSpeed(data.current.wind_kph);
                setWindDir(data.current.wind_dir);
                setWeatherIcon(data.current.condition.icon); 
                setDisplayedCity(data.location.name);
                setRegion(data.location.region);
                setCountry(data.location.country);
                setLocalTime(data.location.localtime);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="weather-page">
            <h1>Weather</h1>
            <input
                type="text"
                value={city}
                onChange={handleCityChange}
                placeholder="Введіть назву міста"
                className="input-city"
            />
            <button onClick={fetchWeather} className="weather-button">
                Отримати погоду
            </button>

            <h2>Погода в {displayedCity}</h2>
            <p>Регіон: {region}</p>
            <p>Країна: {country}</p>
            <p>Час: {localTime}</p>

            <h3>Інформація про погоду</h3>

            <div className="cloudiness-container">
                <p>Хмарність: {cloudiness}</p>
                {weatherIcon && <img src={weatherIcon} alt="Weather icon" />}
            </div>

            <p>Температура: {temp}&#8451;</p>
            <p>Тиск: {pressure} мбар</p>
            <p>Швидкість вітру: {windSpeed} км/год</p>
            <p>Напрямок вітру: {windDir}</p>
        </div>
    );
}

export default WeatherPage;
