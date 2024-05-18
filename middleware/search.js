const axios = require('axios');

async function search (req, res) {
    const query = req.query.query; // Get query from URL parameter
  
    // Check if 'query' is not provided or empty
    if (!query) {
      return res.render("search", { results: null, message: "" });
    }
  
    const options = {
      method: "GET",
      url: "https://google-web-search1.p.rapidapi.com/",
      params: { query: query, limit: "20", related_keywords: "true" },
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "google-web-search1.p.rapidapi.com",
      },
    };
  
    try {
      const response = await axios.request(options);
      res.render("search", { results: response.data.results, message: null });
    } catch (error) {
      console.error(error);
      res.render("search", {
        results: null,
        message: "Failed to fetch results. Please try again.",
      });
    }
  };

module.exports = {
    search
}