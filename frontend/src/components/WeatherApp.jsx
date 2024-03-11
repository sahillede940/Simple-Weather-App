import React, { useState } from "react";
import Card from "./Card";
import axiosInstance from "../axiosInstance";
import { Navigate, useNavigate } from "react-router-dom";
import img1 from "./../images/116.png";
import { toast } from "react-toastify";

function WeatherApp() {
  const [locations, setLocations] = useState([]);
  const [temp, setTemp] = useState("");
  const [count, setCount] = useState(4);
  const [weatherData, setWeatherData] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = () => {
    toast.loading("Fetching data");
    axiosInstance.post("/weather/", { locations }).then((res) => {
      console.log(res.data);
      setWeatherData(res.data);
      toast.dismiss();
      toast.success("Data Fetched");
    });
  };

  return (
    <div
      className="container"
      style={{
        margin: "1rem",
      }}
    >
      <div className="flex items-center max-w-sm mx-auto">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                strokeLinecap="currentColor"
                strokeLinecap-linecap="round"
                strokeLinecap-linejoin="round"
                strokelinecap-width="2"
                d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
              />
            </svg>
          </div>
          {count > 0 && (
            <input
              type="text"
              id="simple-search"
              value={temp}
              onChange={(e) => setTemp(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={`Enter ${count} more locations`}
              required
            />
          )}
        </div>
        <button
          onClick={() => {
            setLocations([...locations, temp]);
            setTemp("");
            setCount(count - 1);
          }}
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/signin");
          }}
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Logout
        </button>
      </div>
      <div
        style={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
        }}
      >
        {weatherData.length < 4 && (
          <button
            onClick={handleSubmit}
            className="m-2 p-2.5 font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Get Weather
          </button>
        )}
        {weatherData.length !== 0 && (
          <button
            onClick={() => {
              setWeatherData([]);
              setLocations([]);
              setCount(4);
            }}
            className="m-2 p-2.5 font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Clear
          </button>
        )}
      </div>
      <div className="flex items-center max-w-sm mx-auto">
        {locations.map((location, idx) => (
          <p
            key={idx}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {location}
          </p>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "1rem",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {weatherData.map((location, idx) => (
          <Card key={idx} {...location} />
        ))}
      </div>
    </div>
  );
}

export default WeatherApp;
