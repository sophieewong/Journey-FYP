// package that allows to get variables from the .env file
require("dotenv").config();

// a node package that resolves the specified paths into an absolute path
const path = require("path");

/*Express is a JavaScript package used to create a HTTP web server*/
const express = require("express");

//Controllers
const placesController = require("./controllers/placesController.js");

//Create new express server
const app = express();

// When browser requests route, server returns entire application to the browser
// which is just the files that Svelte builded when running `npm run build` in the Frontend folder.
app.use(express.static(path.resolve(__dirname, "../Frontend/public/")));

app.use(express.json());

//server picks up when route's been hit,call places Controller function
app.get(
  "/api/places/:destination&categories=:categories&budget=:budget",
  placesController
);

app.post("/api/itinerary/create", (req, res) => {
  const { name, places, userId, authToken } = req.body;

  //Create an itinerary using the chosen place ids...
  const itinerary = {
    name: name,
    days: [
      {
        date: "18/12/2019",
        times: [
          {
            time: "11:00",
            place: places[0]
          },
          {
            time: "12:30",
            place: places[1]
          }
        ]
      }
    ]
  };

  //Create this itinerary in firebase under the relevant userId probably using the authtoken

  //Send it back to the user
  res.json({ id: "abc123" });
});

app.listen(3000, () => console.log("server has started"));
