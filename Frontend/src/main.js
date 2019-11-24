// const attractionsContainer = document.getElementById("attractions");

// fetch("/api/get/attractions")
//     .then((response) => response.json())
//     .then(displayAttractions);

// /**
//  * 
//  * @param {{name: string, attractionType: string, category: string, hours: string, entryFee: number, rating: number}[]} attractions
//  */
// const displayAttractions = (attractions) => {
//     console.log(JSON.parse(attractions))
//     attractions.forEach(attraction => {
//         const attractionDiv = document.createElement("div");
//         attractionDiv.innerText = attraction.name;
//         attractionsContainer.appendChild(attractionDiv)
//     });
// }

import home from "./Pages/home";

document.getElementById("root").innerHTML = home();
