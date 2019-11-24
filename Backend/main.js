const path = require('path');

const express = require("express");
const app = express(); //server

// when browser requests route, server returns entire application to the browser
app.use(express.static(path.resolve(__dirname, "../Frontend/dist/")))

app.listen(5000, () => console.log("server has started"));

