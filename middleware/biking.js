const bikeTrails = require("../data/biking.json");
const axios = require("axios");

async function bike (req, res)  {
    let trailsWithWeather = await Promise.all(
      bikeTrails.BikingTrails.map(async (BikingTrail) => {
        if (BikingTrail.lat && BikingTrail.lon) {
          const latitude = BikingTrail.lat;
          const longitude = BikingTrail.lon;
          const apiKey = process.env.OPENWEATHER_API_KEY;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  
          try {
            const weatherResponse = await axios.get(url);
            const tempKelvin = weatherResponse.data.main.temp;
            BikingTrail.weather = weatherResponse.data;
            BikingTrail.weather.temperatureF =
              ((tempKelvin - 273.15) * 9) / 5 + 32;
          } catch (error) {
            console.error("Failed to fetch weather data", error);
            BikingTrail.weather = null;
          }
        }
        return BikingTrail;
      })
    );
    res.render("bikeShow.ejs", {
      BikeTrails: trailsWithWeather,
      bikeTrails: bikeTrails.BikingTrails,
    });
  };

module.exports = {
    bike
}