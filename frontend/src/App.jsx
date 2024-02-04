import React, { useState } from "react";

function App() {
  const [temperature, setTemperature] = useState("");
  const [city, setCity] = useState("");
  const [loader, setLoader] = useState(false);

  const getWeather = async () => {
    setLoader(true);
    const response = await fetch(`http://localhost:8000/gettemp/${city}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTemperature(data.temperature);
        setLoader(false);
      });
    setLoader(false);
  };

  return (
    <div class="container">
      <h2>Weather App</h2>
      <div id="weather-form">
        <input
          type="text"
          class="input-box"
          id="city-input"
          placeholder="Enter city name"
          required
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") getWeather();
          }}
        />
        <button onClick={getWeather} class="submit-btn">
          Get Weather
        </button>
        <div>
          {loader ? (
            <p class="loader"></p>
          ) : (
            <p>
              Temprature: <span>{temperature}°C</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
