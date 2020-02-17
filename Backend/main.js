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
  "5744ccdfe4b0c0459246b4b5",
  "4eb1daf44b900d56c88a4600"
]);
APICategoriesMap.set("Museums", [
  "4bf58dd8d48988d181941735",
  "4bf58dd8d48988d193941735"
]);
APICategoriesMap.set("Nature & Wildlife", [
  "4fceea171983d5d06c3e9823",
  "4bf58dd8d48988d17b941735",
  "56aa371be4b08b9a8d57355e",
  "52e81612bcbc57f1066b7a22",
  "4bf58dd8d48988d1df941735",
  "56aa371be4b08b9a8d57353b",
  "56aa371be4b08b9a8d573562",
  "56aa371be4b08b9a8d573511",
  "4bf58dd8d48988d15b941735",
  "4bf58dd8d48988d15f941735",
  "52e81612bcbc57f1066b7a23",
  "56aa371be4b08b9a8d573547",
  "4bf58dd8d48988d15a941735",
  "5bae9231bedf3950379f89cd",
  "4bf58dd8d48988d160941735",
  "4bf58dd8d48988d161941735",
  "55a5a1ebe4b013909087cb77",
  "4eb1d4d54b900d56c88a45fc",
  "52e81612bcbc57f1066b7a21",
  "52e81612bcbc57f1066b7a13",
  "4bf58dd8d48988d162941735",
  "4bf58dd8d48988d163941735",
  "52e81612bcbc57f1066b7a25",
  "4bf58dd8d48988d164941735",
  "52e81612bcbc57f1066b7a29",
  "56aa371be4b08b9a8d573541",
  "4eb1d4dd4b900d56c88a45fd",
  "4bf58dd8d48988d165941735",
  "4bf58dd8d48988d133951735",
  "4bf58dd8d48988d166941735",
  "4bf58dd8d48988d1e9941735",
  "5bae9231bedf3950379f89d0",
  "4bf58dd8d48988d159941735",
  "52e81612bcbc57f1066b7a24",
  "4bf58dd8d48988d1de941735",
  "5032848691d4c4b30a586d61",
  "56aa371be4b08b9a8d573560",
  "56aa371be4b08b9a8d5734c3",
  "4fbc1be21983fc883593e321",
  "5bae9231bedf3950379f89c7",
  "5744ccdfe4b0c0459246b4d9"
]);
APICategoriesMap.set("Shopping & Markets", [
  "52f2ab2ebcbc57f1066b8b3b",
  "5267e4d8e4b0ec79466e48c5",
  "53e510b7498ebcb1801b55d4",
  "52e81612bcbc57f1066b7a25",
  "4bf58dd8d48988d164941735",
  "4bf58dd8d48988d1fa941735",
  "4bf58dd8d48988d10e951735",
  "58daa1558bbb0b01f18ec1e5",
  "58daa1558bbb0b01f18ec1e8",
  "50be8ee891d4fa8dcc7199a7",
  "5744ccdfe4b0c0459246b4df",
  "4bf58dd8d48988d1fd941735",
  "5744ccdfe4b0c0459246b4dc",
  "4bf58dd8d48988d101951735"
]);
APICategoriesMap.set("Theatre & Movies", [
  "56aa371be4b08b9a8d5734db",
  "4bf58dd8d48988d17f941735",
  "4bf58dd8d48988d135941735",
  "4bf58dd8d48988d136941735",
  "4bf58dd8d48988d137941735",
  "56aa371be4b08b9a8d573523"
]);
APICategoriesMap.set("Historical", [
  "4deefb944765f83613cdba6e",
  "5642206c498e4bfca532186c",
  "50aaa49e4b90af0d42d5de11",
  "52e81612bcbc57f1066b7a14"
]);
APICategoriesMap.set("Food", [
  "52f2ab2ebcbc57f1066b8b3b",
  "50327c8591d4c4b30a586d5d",
  "4bf58dd8d48988d121941735",
  "53e510b7498ebcb1801b55d4",
  "4bf58dd8d48988d1de941735",
  "5e189fd6eee47d000759bbfd",
  "4e0e22f5a56208c4ea9a85a0",
  "4bf58dd8d48988d14b941735",
  "56aa371be4b08b9a8d573505",
  "4bf58dd8d48988d1fa941735",
  "4bf58dd8d48988d10e951735",
  "58daa1558bbb0b01f18ec1e8",
  "53e0feef498e5aac066fd8a9",
  "58daa1558bbb0b01f18ec1e5",
  "50be8ee891d4fa8dcc7199a7"
]);
APICategoriesMap.set("Arts & Culture", [
  "4bf58dd8d48988d1e2931735",
  "507c8c4091d498d9fc8c67a9",
  "4bf58dd8d48988d18f941735"
]);
APICategoriesMap.set("Sports", [
  "56aa371be4b08b9a8d573514",
  "4bf58dd8d48988d1f4931735",
  "4bf58dd8d48988d184941735",
  "52e81612bcbc57f1066b7a29",
  "50328a4b91d4c4b30a586d6b",
  "4bf58dd8d48988d1e9941735"
]);
APICategoriesMap.set("Landmarks", [
  "4bf58dd8d48988d1ae941735",
  "52e81612bcbc57f1066b7a14",
  "4bf58dd8d48988d12a941735",
  "4bf58dd8d48988d129941735",
  "4bf58dd8d48988d12c951735",
  "4bf58dd8d48988d12d941735",
  "52e81612bcbc57f1066b7a38",
  "4bf58dd8d48988d131941735"
]);
APICategoriesMap.set("Beaches, Coasts & Islands", [
  "4bf58dd8d48988d1e2941735",
  "56aa371be4b08b9a8d573544",
  "52e81612bcbc57f1066b7a12",
  "52e81612bcbc57f1066b7a0f",
  "4bf58dd8d48988d1e0941735",
  "50aaa4314b90af0d42d5de10",
  "4bf58dd8d48988d15d941735",
  "5744ccdfe4b0c0459246b4c1",
  "4bf58dd8d48988d12d951735",
  "55077a22498e5e9248869ba2",
  "4e74f6cabd41c4836eac4c31",
  "56aa371be4b08b9a8d57353e"
]);
APICategoriesMap.set("City Views", [
  "4bf58dd8d48988d133951735",
  "4bf58dd8d48988d165941735",
  "52f2ab2ebcbc57f1066b8b50",
  "56aa371ce4b08b9a8d57356e"
]);
APICategoriesMap.set("Nightlife", [
  "4bf58dd8d48988d1e5931735",
  "4d4b7105d754a06376d81259",
  "4bf58dd8d48988d121941735",
  "4bf58dd8d48988d11f941735",
  "4bf58dd8d48988d11a941735",
  "4bf58dd8d48988d1d6941735"
]);
APICategoriesMap.set("Entertainment & Events", [
  "4bf58dd8d48988d1e1931735",
  "4bf58dd8d48988d1e4931735",
  "4bf58dd8d48988d17c941735",
  "52e81612bcbc57f1066b79e7",
  "4bf58dd8d48988d18e941735",
  "56aa371be4b08b9a8d573532",
  "4bf58dd8d48988d1f1931735",
  "52e81612bcbc57f1066b79ea",
  "5744ccdfe4b0c0459246b4bb",
  "52e81612bcbc57f1066b79e6",
  "5744ccdfe4b0c0459246b4b8",
  "4bf58dd8d48988d1e3931735",
  "52e81612bcbc57f1066b79e9",
  "4d4b7105d754a06373d81259",
  "4bf58dd8d48988d1e6941735",
  "52e81612bcbc57f1066b7a0f",
  "5744ccdfe4b0c0459246b4b5",
  "52e81612bcbc57f1066b7a29",
  "50328a4b91d4c4b30a586d6b",
  "4bf58dd8d48988d1e9941735",
  "58daa1558bbb0b01f18ec1b9",
  "4bf58dd8d48988d171941735",
  "4eb1daf44b900d56c88a4600",
  "56aa371be4b08b9a8d5734cb",
  "4bf58dd8d48988d1f1941735",
  "56aa371be4b08b9a8d573523",
  "52f2ab2ebcbc57f1066b8b3a",
  "4bf58dd8d48988d1f7941735",
  "56aa371be4b08b9a8d573505",
  "52f2ab2ebcbc57f1066b8b3d"
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
        url: "https://api.foursquare.com/v2/venues/explore",
        method: "GET",
        qs: {
          client_id: process.env.FOURSQUARE_CLIENT_ID,
          client_secret: process.env.FOURSQUARE_CLIENT_SECRET,
          v: "20180323",
          categoryId: mapCategoriesToAPI(req.params.categories),
          limit: 10,
          near: req.params.destination,
          sortByPopularity: 1
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

          placesFromFoursquare.response.groups[0].items.forEach(item => {
            places.places.push({
              id: item.venue.id,
              name: item.venue.name,
              category:
                item.venue.categories.length > 0
                  ? item.venue.categories[0].name
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
