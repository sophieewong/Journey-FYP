require("dotenv").config();

const path = require('path');

const express = require("express");
const app = express(); //server

const attractionsController = require("./Controllers/attractionsController")

// when browser requests route, server returns entire application to the browser
app.use(express.static(path.resolve(__dirname, "../Frontend/dist/")))

app.get("/api/get/attractions", attractionsController);

app.listen(5000, () => console.log("server has started"));

