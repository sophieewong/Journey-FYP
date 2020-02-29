let FoursquarePriceMap = new Map();

FoursquarePriceMap.set("All", [1, 2, 3, 4]);
FoursquarePriceMap.set("Low", [1, 2]);
FoursquarePriceMap.set("Medium", [3]);
FoursquarePriceMap.set("High", [4]);

const mapBudgetToFoursquareAPI = budget => {
  try {
    return FoursquarePriceMap.get(budget.replace(/"/g, "")).join(",");
  } catch (err) {
    console.error(err);
    return "1,2,3,4";
  }
};

module.exports = mapBudgetToFoursquareAPI;
