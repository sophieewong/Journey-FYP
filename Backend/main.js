// package that allows to get variables from the .env file
require("dotenv").config();

// a node package that resolves the specified paths into an absolute path
const path = require("path");

/*Express is a JavaScript package used to create a HTTP web server*/
const express = require("express");

// allows to make HTTP request (like fetch)
const request = require("request");

//Create new express server
const app = express();

// When browser requests route, server returns entire application to the browser
// which is just the files that Svelte builded when running `npm run build` in the Frontend folder.
app.use(express.static(path.resolve(__dirname, "../Frontend/public/")));

//server picks up when route's been hit,
app.get("/api/places/:destination", (req, resFromBackend) => {
  //TODO
  /*
    ! 1. get real data from foursquare api
    2. transform returned data from foursquare into something FE expects
    3. send final data to FE as json
    */

  request(
    {
      url: "https://api.foursquare.com/v2/venues/search",
      method: "GET",
      qs: {
        client_id: process.env.FOURSQUARE_CLIENT_ID,
        client_secret: process.env.FOURSQUARE_CLIENT_SECRET,
        v: "20180323",
        limit: 10,
        near: req.params.destination
      }
    },
    function(err, resFromApi, body) {
      if (err) {
        console.error(err);
      } else {
        const placesFromFoursquare = JSON.parse(body); // converts string from body to JS objects

        let places = {
          places: []
        };

        placesFromFoursquare.response.venues.forEach(venue => {
          places.places.push({
            id: venue.id,
            name: venue.name,
            category:
              venue.categories.length > 0
                ? venue.categories[0].name
                : "No Category",
            image:
              "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/dc23cd051d2249a5903d25faf8eeee4c/BFV36537_CC2017_2IngredintDough4Ways-FB.jpg"
          });
        });

        resFromBackend.json(places); // and sends response back with json data to FE
      }
    }
  );
});

// app.get("/api/get/attractions", attractionsController);

app.listen(5000, () => console.log("server has started"));
