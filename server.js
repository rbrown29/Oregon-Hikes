const app = require("./app.js");
const http = require("http");
const { address } = require("address");
const { mongoConnect } = require("./services/mongoConnect.js");
require("dotenv").config();
// populate json data on server start the first time, then comment out
// const { data } = require("./services/populateData.js");
//const { data } = require("./services/populateData.js");

// Environment Variables
const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect;
  app.listen(PORT, () => {
    console.log("Server is listening at http://localhost:" + PORT);
    address((err, addr) => {
      console.log(
        " IPv4 = " + addr.ip + "\n",
        "IPv6 = " + addr.ipv6 + "\n",
        "MAC = " + addr.mac
      );
    });
  });
}

startServer();