const express = require("express");
const app = express();
const port = 8000;
var cors = require("cors");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const api_key = "eec8c82bfa5fbb79909c50eadb9f5024";
const coord = `http://api.openweathermap.org/geo/1.0/direct?appid=${api_key}&`;

app.get("/gettemp/:name", (req, res) => {
  const city = req.params.name;
  const url = coord + `q=${city}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const lat = data[0].lat;
      const lon = data[0].lon;
      console.log(lat, lon);
      if (lat && lon) {
        const weather = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature`;
        fetch(weather)
          .then((response) => response.json())
          .then((data) => {
            res.send(data.current);
            console.log(data.current);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/getWeather", async (req, res) => {
  // ans format "weather": { "toronto": "24C", "mumbai": "34C", "london": "14C" } } 
  let ans = {};
  const cities = req.body.cities;
  
  try {
    for (const city of cities) {
      const url = coord + `q=${city}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;
        console.log(lat, lon);
        
        if (lat && lon) {
          const link = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature`;
          const response2 = await fetch(link);
          const data2 = await response2.json();
          ans[city] = data2.current.temperature + "C";
          console.log(data2.current.temperature);
        } else {
          ans.push("NA");
        }
      } else {
        ans.push("NA");
      }
    }
    
    res.send({ weather: ans });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "An error occurred" });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
