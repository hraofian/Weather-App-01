import sunny from "../assets/images/sunny.png";
import rainy from "../assets/images/rainy.png";
import cloudy from "../assets/images/cloudy.png";
import snowy from "../assets/images/snowy.png";
import { useState, useEffect } from "react";

function WeatherApp() {
  const [data, setData] = useState<any>({});
  const [location, setLocation] = useState("");
  const api_key = "2f67b064f0bdae5b0706fbd8844961cf";
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      const defaultLocation = "bushehr";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${api_key}`;
      const res = await fetch(url);
      const defaultData = await res.json();
      setData(defaultData);
    };
    fetchDefaultWeather();
  }, []);

  const search = async () => {
    if (location.trim() !== "") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`;
      const res = await fetch(url);
      const searchData = await res.json();
      console.log(searchData);
      setData(searchData);
      setLocation("");
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      search();
    }
  };
  const weatherImages: any = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  };

  const weatherImage = data.weather
    ? weatherImages[data.weather[0].main]
    : null;

  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">
              {data.name}
              {data.sys ? ` - in (${data.sys.country})` : null}
            </div>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <i className="fa solid fa-magnifying-glass" onClick={search}></i>
          </div>
        </div>
        <div className="weather">
          <img src={weatherImage} alt="" />
          <div className="weather-type">
            {data.weather ? data.weather[0].main : null}
          </div>
          <div className="temp">
            {data.main ? `${Math.floor(data.main.temp)}°` : null}
          </div>
        </div>
        <div className="weather-date">
          <p>Fri, 3 May</p>
        </div>
        <div className="weather-data">
          <div className="humidity">
            <div className="data-name">Humidity</div>
            <i className="fa-solid fa-droplet"></i>
            <div className="data">
              {data.main ? `${data.main.humidity} %` : null}
            </div>
          </div>
          <div className="wind">
            <div className="data-name">Wind</div>
            <i className="fa-solid fa-wind"></i>
            <div className="data">
              {data.wind ? `${Math.floor(data.wind.speed)} km/h` : null}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;

// time 1:01
