import home from "../Home/Home";
import TripPreview from "../../Components/TripPreview/TripPreview";
import HeroBanner from "../../Components/HeroBanner/HeroBanner";
import MobileNavigation from "../../Components/MobileNavigation/MobileNavigation";

import { togglePage } from "../../utils";

// import ItineraryPlannerHeroImage from "../../img/ItineraryPlanner.jpg"


class ItineraryPlanner {
    constructor() {
        this.element = document.getElementById('page-itinerary-planner');
        this.heroContainer = document.getElementById('page-itinerary-planner-hero-container');
        this.tripsContainer = document.getElementById('page-itinerary-planner-trips');

        this.hide();
        this.setupPageBanner();
        this.setupTrips();

        const mobileNavigation = new MobileNavigation();
        this.element.appendChild(mobileNavigation.getHTMLElement());
        mobileNavigation.setupEventListeners();
    }

    show() {
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }

    setupTrips() {
        //Call API to get trips
        const trips = [
            {
                name: "New York, USA",
                date: "25/11/2019 - 10/11/2019",
                duration: "14 Days"
            },
            {
                name: "My Winter Trip",
                date: "25/1/2019 - 10/122019",
                duration: "14 Days"
            },
            {
                name: "Lads Night Out, Magaluf",
                date: "25/11/2019 - 10/14/2019",
                duration: "14 Days"
            }
        ];

        trips.forEach(trip => {
            this.tripsContainer.appendChild(
                new TripPreview(trip.name, trip.date, trip.duration).getHTMLElement()
            );
        });
    }

    setupPageBanner() {
        // pass in variables to new instance, then load the element to create new instance
        const heroBanner = new HeroBanner("itinerary-planner", "Itinerary Planner");

        this.heroContainer.appendChild(heroBanner.getHTMLElement());

        heroBanner.onLogoClicked(() => {
            togglePage(this, home);
        });
    }
}

// Create new instance of a page in page file 
const itineraryPlanner = new ItineraryPlanner();

export default itineraryPlanner;