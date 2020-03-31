function calculateDistance(p1, p2) {
  let rad = function(x) {
    return (x * Math.PI) / 180;
  };

  let R = 6378137; // Earth’s mean radius in meters
  let dLat = rad(p2.lat - p1.lat);
  let dLong = rad(p2.lng - p1.lng);

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) *
      Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);

  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return (d * 0.00062137119223733).toFixed(1); // returns the distance in miles to 2 decimal places.
}

module.exports = calculateDistance;
