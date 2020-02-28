// allows to make HTTP request (like fetch)
const request = require("request");

const FoursquareAPICategories = require("../FoursquareAPICategories.js");

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
      const APICategories = FoursquareAPICategories.get(
        category.replace(/"/g, "")
      ); //["123","4789"]

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

const getFoursquareVenues = (destination, categories) => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: "https://api.foursquare.com/v2/venues/explore",
        method: "GET",
        qs: {
          client_id: process.env.FOURSQUARE_CLIENT_ID,
          client_secret: process.env.FOURSQUARE_CLIENT_SECRET,
          v: "20180323",
          categoryId: mapCategoriesToAPI(categories),
          limit: 5,
          near: destination,
          sortByPopularity: 1
        }
      },
      function(err, resFromApi, body) {
        if (err) {
          reject(err);
        } else {
          const placesFromFoursquare = JSON.parse(body); // converts string from body to JS objects
          let placeIds = [];

          placesFromFoursquare.response.groups[0].items.forEach(item => {
            placeIds.push(item.venue.id);
          });

          resolve(placeIds);
        }
      }
    );
  });
};

const getFoursquareVenueDetails = id => {
  //Use the ID and make a call to Foursquare asking for details of given ID

  return new Promise((resolve, reject) => {
    request(
      {
        url: `https://api.foursquare.com/v2/venues/${id}`,
        method: "GET",
        qs: {
          client_id: process.env.FOURSQUARE_CLIENT_ID,
          client_secret: process.env.FOURSQUARE_CLIENT_SECRET,
          v: "20180323"
        }
      },
      function(err, resFromApi, body) {
        if (err) {
          reject(err);
        } else {
          const details = JSON.parse(body);

          resolve(details);
        }
      }
    );
  });
};

const placesController = (req, resFromBackend) => {
  /*
    1. get real data from foursquare api
    2. transform returned data from foursquare into something FE expects
    3. send final data to FE as json
    */

  getFoursquareVenues(req.params.destination, req.params.categories)
    .then(placeIds => {
      let placeDetailPromises = [];

      placeIds.forEach(id => {
        placeDetailPromises.push(getFoursquareVenueDetails(id));
      });

      Promise.all(placeDetailPromises).then(detailedFoursquareVenues => {
        let places = [];

        detailedFoursquareVenues.forEach(response => {
          const venue = response.response.venue;
          const venueImageObj = venue.photos.groups[0].items[0];

          places.push({
            id: venue.id,
            name: venue.name,
            category:
              venue.categories.length > 0
                ? venue.categories[0].name
                : "No Category",
            image: `${venueImageObj.prefix}${venueImageObj.width}x${venueImageObj.height}${venueImageObj.suffix}`,
            description: venue.description
              ? venue.description
              : "No Description"
          });
        });

        resFromBackend.json(places); // and sends response back with json data to FE
      });
    })
    .catch(error => console.error(error));
};

module.exports = placesController;
