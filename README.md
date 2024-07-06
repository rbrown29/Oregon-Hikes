# Oregon Hikes

![oregon](https://user-images.githubusercontent.com/53094729/233315729-34413be8-15cb-46d1-84fc-2b97a2f54a9c.gif)

### Author and Code design by Richard Brown

### Links To Gitub project and live Site.
https://oregon-hikes.onrender.com/


https://github.com/rbrown29/Oregon-Hikes

### This app lists hikes in Oregon.
* This is new look based on my other project Oregon Hikes. 
* https://github.com/rbrown29/sturdy-octo-computing-machine

#### Users can--- 
* View, Click hike name to see more details, videos, and a map of hike.
* Sign up
* Login
* Know the difficulty of the trail
* Know the distance of the trail
* view the json data at localhost:3001/hikesData
* view the json data at localhost:3001/trailsData
* view the json data at localhost:3001/bikingData
* Internet search for more information on the hike, or the area.
* View a 3D Terrain Elevation map of the hike.
* View a Data map of the hike.
* View a 2D and 3D google earth map of the hike.
* View a video of the hike.

### Maps, links, and Videos on the site
* YouTube
* All Trails
* OregonHikers.org
* Travel Oregon
* Vist Oregon
* Leaflet Open Street Maps
* data.oregon.gov (Oregon State Data api)
* Google Earth
* Google Maps
* Mapbox

### 3D Terrain Elevation Map was derived from the following articles and added custom code.
* https://docs.mapbox.com/mapbox-gl-js/example/query-terrain-elevation/
* https://www.mapbox.com/blog/building-cinematic-route-animations-with-mapboxgl

### View my 3D Terrain Elevation Map repository here.
* https://github.com/rbrown29/TrailMapReact

### This app is a full stack app that uses the following technologies:

* ![HTML](https://img.shields.io/badge/HTML-HyperText%20Markup%20Language-red)
* ![CSS](https://img.shields.io/badge/CSS-Cascade%20Style%20Sheets-blue)
* ![JAVASCRIPT](https://img.shields.io/badge/JAVASCRIPT-JS-yellow)
* ![JQUERY](https://img.shields.io/badge/JQUERY-JS-blue)

* ![Express](https://img.shields.io/badge/EXPRESS-Middleware-orange)
* ![Node](https://img.shields.io/badge/NODE-JS-brightgreen)
* ![Mongo DB](https://img.shields.io/badge/MONGO-DB-green)
* ![EJS](https://img.shields.io/badge/EJS-EMBEDDED%20JAVASCRIPT-yellow)
* ![Mongoose](https://img.shields.io/badge/MONGOOSE-JS-yellowgreen)
* ![Bcrypt](https://img.shields.io/badge/BCRYPT-JS-blue)

* ![MATERIALIZE](https://img.shields.io/badge/MATERIALIZE-CSS-yellow)
* ![GOOGLE FONTS](https://img.shields.io/badge/GOOGLE%20FONTS-GOOGLE-red)
* ![My Custom CSS](https://img.shields.io/badge/MY%20CUSTOM%20CSS-CSS-lightgrey)

## Getting Started

1. Ensure you have Node.js installed.
2. Create a free [Mongo Atlas](https://www.mongodb.com/atlas/database) database online or start a local MongoDB database.
3. Create a `server/.env` file with a `MONGO_URL` property set to your MongoDB connection string.
4. In the terminal, run: `npm install`

## Running the Project

1. In the terminal, run: `npm start` or `node sever.js` or `nodemon sever.js`
2. Browse to frontend at [localhost:3001](http://localhost:3001).
3. Sign up and login to add, edit, or delete hikes.
