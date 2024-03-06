import React, { useState } from "react";
import Card from "./Card";
import axiosInstance from "../axiosInstance";
import { Navigate, useNavigate } from "react-router-dom";

function WeatherApp() {
  const [locations, setLocations] = useState([]);
  const [temp, setTemp] = useState("");
  const [count, setCount] = useState(4);
  const [weatherData, setWeatherData] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = () => {
    axiosInstance.post("/weather/", { locations }).then((res) => {
      console.log(res.data);
      setWeatherData(res.data);
    });
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/signin");
        }}
      >
        Log Out
      </button>
      {locations.map((location) => (
        <p>{location}</p>
      ))}
      <div>
        {count > 0 && (
          <>
            <input
              type="text"
              placeholder={`Enter ${count} more locations`}
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
            />
            <button
              onClick={() => {
                setLocations([...locations, temp]);
                setTemp("");
                setCount(count - 1);
              }}
            >
              Add
            </button>
          </>
        )}
      </div>
      {weatherData.length < 4 && (
        <button onClick={handleSubmit}>Get Weather</button>
      )}
      {weatherData.length !== 0 && (
        <button
          onClick={() => {
            setWeatherData([]);
            setLocations([]);
            setCount(4);
          }}
        >
          Clear
        </button>
      )}
      <div>
        {weatherData.map((location) => (
          <Card {...location} />
        ))}
      </div>
    </div>
  );
}

export default WeatherApp;
