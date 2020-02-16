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

//
let APICategoriesMap = new Map();

APICategoriesMap.set("Theme Parks", [
  "4bf58dd8d48988d182941735",
  "4bf58dd8d48988d193941735"
]);
APICategoriesMap.set("Museums", ["4bf58dd8d48988d181941735"]);
APICategoriesMap.set("Nature & Wildlife", [
  "4bf58dd8d48988d182941735",
  "4bf58dd8d48988d193941735",
  "4bf58dd8d48988d17b941735"
]);
APICategoriesMap.set("Shopping & Markets", [
  "4bf58dd8d48988d182941735",
  "4bf58dd8d48988d193941735",
  "4bf58dd8d48988d17b941735"
]);
APICategoriesMap.set("Theatre & Entertainment", [
  "4bf58dd8d48988d182941735",
  "4bf58dd8d48988d193941735",
  "4bf58dd8d48988d17b941735"
]);
APICategoriesMap.set("Historical", [
  "4bf58dd8d48988d182941735",
  "4bf58dd8d48988d193941735",
  "4bf58dd8d48988d17b941735"
]);
APICategoriesMap.set("Food", [
  "4bf58dd8d48988d182941735",
  "4bf58dd8d48988d193941735",
  "4bf58dd8d48988d17b941735"
]);
APICategoriesMap.set("Arts & Culture", [
  "4bf58dd8d48988d182941735",
  "4bf58dd8d48988d193941735",
  "4bf58dd8d48988d17b941735"
]);
APICategoriesMap.set("Sports", [
  "4bf58dd8d48988d182941735",
  "4bf58dd8d48988d193941735",
  "4bf58dd8d48988d17b941735"
]);
APICategoriesMap.set("Landmarks", [
  "4bf58dd8d48988d182941735",
  "4bf58dd8d48988d193941735",
  "4bf58dd8d48988d17b941735"
]);
APICategoriesMap.set("Beaches, Coasts & Islands", [
  "4bf58dd8d48988d182941735",
  "4bf58dd8d48988d193941735",
  "4bf58dd8d48988d17b941735"
]);
APICategoriesMap.set("City Views", [
  "4bf58dd8d48988d182941735",
  "4bf58dd8d48988d193941735",
  "4bf58dd8d48988d17b941735"
]);
APICategoriesMap.set("Nightlife", [
  "4bf58dd8d48988d1e5931735",
  "4bf58dd8d48988d193941735",
  "4bf58dd8d48988d17b941735"
]);

const mapCategoriesToAPI = categoriesAsString => {
  try {
    //categories = "Theme Parks,Museums,Sports"

    //split categories by comma into an array becomes >
    //new categories = ["Theme Parks", "Museums", "Sports"]

    const categories = categoriesAsString.split(",");

    //foreach category in the categories array >
    //fourSquareIds = []

    let fourSquareCategoryIds = [];
    categories.forEach(category => {
      const APICategories = APICategoriesMap.get(category.replace(/"/g, "")); //["123","4789"]

      APICategories.forEach(id => {
        fourSquareCategoryIds.push(id);
      });
    });

    //Give me the foursqaure ids map.get("CURRENT_CATEGRY")
    //eg: map.get("Sports").forEach(id => fourSquareIds.push(id))

    return fourSquareCategoryIds.toString();
  } catch (error) {
    console.error(error);
    return "";
  }
};

//server picks up when route's been hit,
app.get(
  "/api/places/:destination&categories=:categories",
  (req, resFromBackend) => {
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
          categoryId: mapCategoriesToAPI(req.params.categories),
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
  }
);

// app.get("/api/get/attractions", attractionsController);

app.listen(5000, () => console.log("server has started"));
