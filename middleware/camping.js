const camping = require("../data/OregonSTCamping&biking.json");
const axios = require("axios");

async function camp (req, res) {
    let trailsWithWeather = await Promise.all(
      camping.camp.map(async (camp) => {
        if (camp.location) {
          const { latitude, longitude } = camp.location;
          const apiKey = process.env.OPENWEATHER_API_KEY;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}`;
  
          try {
            const weatherResponse = await axios.get(url);
            camp.weather = weatherResponse.data;
            camp.weather.temperatureF =
              ((camp.weather.main.temp - 273.15) * 9) / 5 + 32;
          } catch (error) {
            console.error("Failed to fetch weather data", error);
            camp.weather = null;
          }
        }
        return camp;
      })
    );
    res.render("camp.ejs", { camping: trailsWithWeather, camping: camping.camp });
};

module.exports = {
    camp
}