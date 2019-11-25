import itineraryPlanner from "../ItineraryPlanner/ItineraryPlanner";

class Home {
    constructor() {
        this.element = document.getElementById("page-home");

        const itineraryButton = document.getElementById('itinerary-btn');

        itineraryButton.addEventListener('click', () => {
            this.hide();
            itineraryPlanner.show();
        });

        const discoveryButton = document.getElementById('discovery-btn');
    }

    show() {
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }
}

const home = new Home();

export default home;