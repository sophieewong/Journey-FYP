import { readable, writable, derived } from "svelte/store";
import { firebase } from "@firebase/app";
import "@firebase/auth";

export const auth = readable(
  {
    isAuthenticated: sessionStorage.getItem("isAuthenticated")
      ? sessionStorage.getItem("isAuthenticated")
      : false,
    user: sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : null,
  },
  (set) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.

        sessionStorage.setItem("isAuthenticated", true);
        sessionStorage.setItem("user", JSON.stringify(user));

        set({
          isAuthenticated: true,
          user,
        });
      } else {
        // No user is signed in.

        sessionStorage.clear();

        set({
          isAuthenticated: false,
          user: null,
        });
      }
    });
  }
);

export const currentItineraryName = writable("");
export const currentItineraryDestination = writable("");
export const currentItineraryStartDate = writable(new Date());
export const currentItineraryEndDate = writable(new Date());
export const currentItineraryNumberOfDays = derived(
  [currentItineraryStartDate, currentItineraryEndDate],
  ([$currentItineraryStartDate, $currentItineraryEndDate]) => {
    $currentItineraryStartDate.setHours(0, 0, 0, 0);
    $currentItineraryEndDate.setHours(0, 0, 0, 0);

    return (
      ($currentItineraryEndDate.getTime() -
        $currentItineraryStartDate.getTime()) /
        (1000 * 3600 * 24) +
      1
    );
  }
);
export const currentItineraryBudget = writable("All");
export const currentItineraryCategories = writable([
  { name: "Theme Parks", selected: false },
  { name: "Museums", selected: false },
  { name: "Nature & Wildlife", selected: false },
  { name: "Shopping & Markets", selected: false },
  { name: "Theatre & Movies", selected: false },
  { name: "Historical", selected: false },
  { name: "Food", selected: false },
  { name: "Arts & Culture", selected: false },
  { name: "Sports", selected: false },
  { name: "Landmarks", selected: false },
  { name: "Beaches, Coasts & Islands", selected: false },
  { name: "City Views", selected: false },
  { name: "Nightlife", selected: false },
  { name: "Entertainment & Events", selected: false },
]);
export const currentItineraryChosenPlaces = writable([]);
