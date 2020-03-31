const calculateDistance = require("./utils/calculateDistance.js");

// package that allows to get variables from the .env file
require("dotenv").config();

// a node package that resolves the specified paths into an absolute path
const path = require("path");

/*Express is a JavaScript package used to create a HTTP web server*/
const express = require("express");

//Controllers
const placesController = require("./controllers/placesController.js");

//Setup firebase
const admin = require("firebase-admin");

let serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNTS_KEY_PATH.toString());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

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
  const {
    name,
    destination,
    startDate,
    endDate,
    places,
    duration,
    userId
  } = req.body;

  let itinerary = {
    name,
    destination,
    startDate,
    endDate,
    duration
  };

  let sortedPlaces = [];

  let currentPlace = places[0];

  sortedPlaces.push(currentPlace);

  places.shift();

  let nextClosest = places[Math.floor(Math.random() * (places.length - 1 + 1))];

  //nextClosest = create a variable to store the next shortest distance place

  while (places.length > 0) {
    //loop over places array (excluding firstPlace)
    places.forEach(place => {
      let distBetweenCurrentAndThis = calculateDistance(
        currentPlace.latLng,
        place.latLng
      );
      let distBetweenCurrentAndNextClosest = calculateDistance(
        currentPlace.latLng,
        nextClosest.latLng
      );

      console.log(currentPlace.name);

      if (distBetweenCurrentAndThis < distBetweenCurrentAndNextClosest) {
        nextClosest = place;
      }
    });

    // for the last item in the places array...
    if (places.length === 1) {
      sortedPlaces.push(places[0]);
      places.pop();
    } else {
      sortedPlaces.push(nextClosest);
      currentPlace = nextClosest;

      //remove nextClosest place from places array
      places.splice(places.indexOf(nextClosest), 1);

      nextClosest = places[Math.floor(Math.random() * (places.length - 1 + 1))];
    }
  }

  //if the distance from the firstPlace to the current place in the loop is shorter than the distance between the firstPlace and the nextClosest, set the nextClosest to be the current place in the loop

  //at the end of the loop, push next closest to the sortedPlaces array

  //set firstPlace = next closest place

  //remove firstPlace from the places array

  //repeat until places.length == 0;

  // used to hold an obj with a property of day

  /** @type {{
   *  date: string;
   *  places: []
   * }[]} */
  let days = [];

  //loop thorugh sortedPlaces[], and divide sortedPlaces by number of days, floor it to roundup/down
  let placesPerDay = Math.round(sortedPlaces.length / duration); //5 places and 2 days (3 places per day)

  let currentDay = 0;

  //Loop through the places in blocks of placesPerDay (ie. blocks of 3)
  for (let i = 0; i < sortedPlaces.length; i += placesPerDay) {
    //Create a new array
    let day = [];

    //Push the place at the start of a block ([(place1), place2, place3])
    day.push(sortedPlaces[i]);

    //Loop through the rest of the block to complete a day
    for (let j = 1; j < placesPerDay; j++) {
      //so if placesPerDay was 3, each loop would produce
      //([place1, (place2), place3])
      //([place1, place2, (place3)])
      if (i + j < sortedPlaces.length) {
        day.push(sortedPlaces[i + j]);
      }
    }

    let currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + currentDay);

    days.push({
      date: currentDate.toString(),
      places: day
    });

    currentDay++;
  }

  //Next Steps:
  //* Write loads of pseudo code to figure out whatever is in your head

  //loop through

  //Create an itinerary using the chosen place ids...
  // const itinerary = {
  //   name: name,
  //   days: [
  //     {
  //       date: "18/12/2019",
  //       times: [
  //         {
  //           time: "11:00",
  //           place: places[0]
  //         },
  //         {
  //           time: "12:30",
  //           place: places[1]
  //         }
  //       ]
  //     }
  //   ]
  // };

  //Create this itinerary in firebase under the relevant userId probably using the authtoken

  let docRef = db.collection("users").doc(userId);

  docRef
    .get()
    .then(doc => {
      let itineraries = [];

      if (doc.get("itineraries")) itineraries = doc.get("itineraries");

      itineraries.push(JSON.stringify(itinerary));

      docRef
        .set({
          itineraries
        })
        .then(() => {
          res.json({ id: itineraries.length - 1 });
        });
    })
    .catch(err => console.error(err));
});

app.post("/api/itinerary/get", (req, res) => {
  const { userId, itineraryId } = req.body;

  let docRef = db.collection("users").doc(userId);

  docRef
    .get()
    .then(doc => {
      let itineraries = doc.get("itineraries");
      let itineraryIndex = parseInt(itineraryId);

      if (itineraries) {
        if (itineraries.length > itineraryIndex) {
          res.json(itineraries[itineraryIndex]);
        } else {
          res.status(400).json({
            error: "Itinerary with that ID doesn't exist!"
          });
        }
      } else {
        res.status(400).json({
          error: "This user doesn't have any itineraries!"
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        error: "ID parameter is invalid!"
      });
    });
});

app.listen(3000, () => console.log("server has started"));
