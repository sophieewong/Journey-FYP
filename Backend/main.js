const path = require('path');

const express = require("express");
const app = express();
app.use(express.static(path.resolve(__dirname, "../Frontend/dist/")))

// browser requests route, server returns 
app.get("/", (req, res) => {

});

app.listen(5000, () => console.log("server has started"));

