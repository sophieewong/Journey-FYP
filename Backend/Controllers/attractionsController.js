// const request = require('request');

const attractionsController = (req, res) => {
    // const apiClientID = `client_id=${process.env.FOURSQUARE_CLIENT_ID}`;
    // const apiClientSecret = `client_secret=${process.env.FOURSQUARE_CLIENT_SECRET}`;
    // const apiVersion = `v=20180323`;

    // const apiRequestURL = `https://api.foursquare.com/v2/venues/explore?ll=51.5074,0.1278&query="attractions"&limit=10&${apiClientID}&${apiClientSecret}&${apiVersion}`

    res.json([
        {
            name: "Big Ben",
            attractionType: "...",
            category: "Historic Landmark",
            hours: "9:00 - 17:00",
            entryFee: 0.00,
            rating: 5,
        },
        {
            name: "Big Ben",
            attractionType: "...",
            category: "Historic Landmark",
            hours: "9:00 - 17:00",
            entryFee: 0.00,
            rating: 5,
        },
        {
            name: "Big Ben",
            attractionType: "...",
            category: "Historic Landmark",
            hours: "9:00 - 17:00",
            entryFee: 0.00,
            rating: 5,
        },
    ]);
}

module.exports = attractionsController