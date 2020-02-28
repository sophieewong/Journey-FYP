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

//server picks up when route's been hit,call places Controller function
app.get("/api/places/:destination&categories=:categories", placesController);

app.listen(5000, () => console.log("server has started"));
