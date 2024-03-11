import React from "react";
// import "./Card.css";

function WeatherCard({
  location,
  temp_c,
  humidity,
  condition,
  icon,
  localtime,
}) {
  return (
    <article
      className="widget"
      style={{
        margin: "1rem",
      }}
    >
      <img className="weatherIcon" src={icon} alt="" />
      <div className="weatherInfo">
        <div className="temperature">
          <span>{temp_c}&deg;</span>
        </div>
        <div className="description">
          <div className="weatherCondition">{condition}</div>
          <div className="place">{location}</div>
          <div className="place">{humidity}</div>
        </div>
      </div>
      <div className="date">{localtime.substring(0, 10)}</div>
    </article>
  );
}

export default WeatherCard;
