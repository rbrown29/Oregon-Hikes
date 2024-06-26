const app = require("./app.js");
const http = require("http");
const { address } = require("address");
const { mongoConnect } = require("./services/mongoConnect.js");
require("dotenv").config();
// populate json data the Database the first time, then comment out. Go to services/populateData.js to do so
//const { data } = require("./services/populateData.js");
//const removeDuplicates = require("./services/duplicates.js");

// Environment Variables
const PORT = process.env.PORT || 3004;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect;
  //await removeDuplicates();
  server.listen(PORT, () => {
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