const json = require("../data/trails.json");
const axios = require("axios");

async function hike(req, res) {
    let trailsWithWeather = await Promise.all(
      json.items.map(async (trail) => {
        if (trail.locations && trail.locations.trailStart) {
          const { latitude, longitude } = trail.locations.trailStart;
          const apiKey = process.env.OPENWEATHER_API_KEY;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}`;
  
          try {
            const weatherResponse = await axios.get(url);
            trail.weather = weatherResponse.data;
            trail.weather.temperatureF =
              ((trail.weather.main.temp - 273.15) * 9) / 5 + 32;
          } catch (error) {
            console.error("Failed to fetch weather data", error);
            trail.weather = null;
          }
        }
        return trail;
      })
    );
  
    res.render("show.ejs", { trails: trailsWithWeather, json: json.items });
  };

module.exports = {
    hike
}