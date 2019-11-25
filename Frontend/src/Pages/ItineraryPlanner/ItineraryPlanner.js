import home from "../Home/Home";
import TripPreview from "../../Components/TripPreview/TripPreview";

class ItineraryPlanner {
    constructor() {
        this.element = document.getElementById('page-itinerary-planner');
        this.tripsContainer = document.getElementById('page-itinerary-planner-trips');

        this.hide();

        const siteTitle = document.getElementById('page-itinerary-planner-site-title');

        siteTitle.addEventListener('click', () => {
            this.hide();
            home.show();
        });

        this.setupTrips();
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
}

const itineraryPlanner = new ItineraryPlanner();

export default itineraryPlanner;