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
        // this.tripsContainer = document.getElementById('page-itinerary-planner-trips');
        this.tripsUpcomingContainer = document.getElementById('page-itinerary-planner-upcoming-trips');
        this.tripsPastContainer = document.getElementById('page-itinerary-planner-past-trips');

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
                date: "10/11/2019 - 25/11/2019",
                duration: 14,
                status: "past",
            },
            {
                name: "My Winter Trip",
                date: "25/10/2019 - 10/11/2019",
                duration: 16,
                status: "past"
            },
            {
                name: "Lads Night Out, Magaluf",
                date: "25/11/2020 - 10/14/2020",
                duration: 16,
                status: "upcoming"
            }
        ];

        trips.forEach(trip => {
            if (trip.status === "past") {
                this.tripsPastContainer.appendChild(
                    new TripPreview(trip.name, trip.date, trip.duration).getHTMLElement()
                );
            } else {
                this.tripsUpcomingContainer.appendChild(
                    new TripPreview(trip.name, trip.date, trip.duration).getHTMLElement()
                );
            }
        });

        this.upcomingTab = document.getElementById('upcoming-btn');
        this.upcomingTab.addEventListener('click', () => {
            this.tripsUpcomingContainer.style.display = 'flex';
            console.log("upcoming")
            this.tripsPastContainer.style.display = 'none';
            this.upcomingTab.classList += " active";
            this.pastTab.classList.remove("active");
        });

        this.pastTab = document.getElementById('past-btn');
        this.pastTab.addEventListener('click', () => {
            this.tripsPastContainer.style.display = 'flex';
            console.log("past")
            this.tripsUpcomingContainer.style.display = 'none';
            this.pastTab.classList += " active";
            this.upcomingTab.classList.remove("active");
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