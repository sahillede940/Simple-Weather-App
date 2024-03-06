import React from "react";
import "./Card.css";

function WeatherCard({ location, temp_c, humidity, condition, icon }) {
  return (
    <div className="weather-card">
      <div className="weather-image">
        <img src={icon} alt={condition} className="weather-icon" />
      </div>
      <div className="weather-info">
        <div className="location">{location}</div>
        <div className="temperature">Temp: {temp_c}°C</div>
        <div className="condition">{condition}</div>
        <div className="humidity">Humidity: {humidity}%</div>
      </div>
    </div>
  );
}

export default WeatherCard;
