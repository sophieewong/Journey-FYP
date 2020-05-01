// allows to make HTTP request (like fetch)
const request = require("request");

const fs = require("fs");

const mapCategoriesToFoursquareAPI = require("../FoursquareAPICategories.js");
const mapBudgetToFoursquareAPI = require("../FoursquareBudgetMap.js");

const getFoursquareVenues = (destination, categories, budget) => {
  return new Promise((resolve, reject) => {
    console.log(mapBudgetToFoursquareAPI(budget));
    request(
      {
        url: "https://api.foursquare.com/v2/venues/explore",
        method: "GET",
        qs: {
          client_id: process.env.FOURSQUARE_CLIENT_ID,
          client_secret: process.env.FOURSQUARE_CLIENT_SECRET,
          v: "20180323",
          categoryId: mapCategoriesToFoursquareAPI(categories),
          limit: 15,
          near: destination,
          sortByPopularity: 1,
          day: "any",
          time: "any",
          price: mapBudgetToFoursquareAPI(budget),
        },
      },
      function (err, resFromApi, body) {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          const placesFromFoursquare = JSON.parse(body); // converts string from body to JS objects

          if (placesFromFoursquare.meta.code === 200) {
            let placeIds = [];

            placesFromFoursquare.response.groups[0].items.forEach((item) => {
              placeIds.push(item.venue.id);
            });

            resolve(placeIds);
          } else {
            reject("HTTP Response is not 200 (OK): " + body);
          }
        }
      }
    );
  });
};

const getFoursquareVenueDetails = (id) => {
  //Use the ID and make a call to Foursquare asking for details of given ID

  return new Promise((resolve, reject) => {
    request(
      {
        url: `https://api.foursquare.com/v2/venues/${id}`,
        method: "GET",
        qs: {
          client_id: process.env.FOURSQUARE_CLIENT_ID,
          client_secret: process.env.FOURSQUARE_CLIENT_SECRET,
          v: "20180323",
        },
      },
      function (err, resFromApi, body) {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          const details = JSON.parse(body);

          if (details.meta.code === 200) {
            resolve(details);
          } else {
            reject("HTTP Response is not 200 (OK): " + body);
          }
        }
      }
    );
  });
};

const getTestData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./TestData/NYCData.json", (err, data) => {
      if (err) reject(err);

      resolve(JSON.parse(data));
    });
  });
};

const placesController = (req, resFromBackend) => {
  /*
    1. get real data from foursquare api
    2. transform returned data from foursquare into something FE expects
    3. send final data to FE as json
    */
  // getFoursquareVenues(
  //   req.params.destination,
  //   req.params.categories,
  //   req.params.budget
  // )
  //   .then((placeIds) => {
  //     let placeDetailPromises = [];
  //     placeIds.forEach((id) => {
  //       placeDetailPromises.push(getFoursquareVenueDetails(id));
  //     });
  //     Promise.all(placeDetailPromises).then((detailedFoursquareVenues) => {
  //       let places = [];
  //       detailedFoursquareVenues.forEach((response) => {
  //         const venue = response.response.venue;
  //         let openingTimes = "No opening times found";
  //         if (
  //           venue.hours &&
  //           venue.hours.timeframes &&
  //           venue.hours.timeframes.length > 0
  //         ) {
  //           if (
  //             venue.hours.timeframes[0].days &&
  //             venue.hours.timeframes[0].open &&
  //             venue.hours.timeframes[0].open.length > 0
  //           ) {
  //             if (venue.hours.timeframes[0].open[0].renderedTime) {
  //               openingTimes = venue.hours.timeframes[0].open[0].renderedTime;
  //             }
  //           }
  //         }
  //         const venueImageObj =
  //           venue.photos.groups.length > 0
  //             ? venue.photos.groups[0].items[0]
  //             : undefined;
  //         places.push({
  //           id: venue.id,
  //           name: venue.name,
  //           category:
  //             venue.categories.length > 0
  //               ? venue.categories[0].name
  //               : "No Category",
  //           image: venueImageObj
  //             ? `${venueImageObj.prefix}${venueImageObj.width}x${venueImageObj.height}${venueImageObj.suffix}`
  //             : "./placeholder.png",
  //           description: venue.description
  //             ? venue.description
  //             : "No Description",
  //           latLng: {
  //             lat: venue.location.lat,
  //             lng: venue.location.lng,
  //           },
  //           openingTimes,
  //         });
  //       });
  //       resFromBackend.json(places); // and sends response back with json data to FE
  //     });
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     //If there's an error, let the Frontend know about it.
  //     //   resFromBackend.json({
  //     //     error
  //     //   });
  //   });

  getTestData()
    .then((testData) => {
      resFromBackend.json(testData);
    })
    .catch((error) => console.error(error));
};

module.exports = placesController;
