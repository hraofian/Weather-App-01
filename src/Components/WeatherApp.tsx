import sunny from "../assets/images/sunny.png";
import rainy from "../assets/images/rainy.png";
import cloud from "../assets/images/cloud.png";
import snowy from "../assets/images/snowy.png";
import { useState } from "react";

function WeatherApp() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const api_key = "2f67b064f0bdae5b0706fbd8844961cf";
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement >) => {
    setLocation(e.target.value);
  };

  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`;
    const res = await fetch(url);
    const searchData = await res.json();
    console.log(searchData);
    setData(searchData);
    setLocation("");
  };

  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">London</div>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={handleInputChange}
            />
            <i className="fa solid fa-magnifying-glass" onClick={search}></i>
          </div>
        </div>
        <div className="weather">
          <img src={sunny} alt="" />
          <div className="weather-type">Clear</div>
          <div className="temp">28°</div>
        </div>
        <div className="weather-date">
          <p>Fri, 3 May</p>
        </div>
        <div className="weather-data">
          <div className="humidity">
            <div className="data-name">Humidity</div>
            <i className="fa-solid fa-droplet"></i>
            <div className="data">35%</div>
          </div>
          <div className="wind">
            <div className="data-name">Wind</div>
            <i className="fa-solid fa-wind"></i>
            <div className="data">3 km/h</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
