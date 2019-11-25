import home from "../Home/Home";

class ItineraryPlanner {
    constructor() {
        this.element = document.getElementById('page-itinerary-planner');
        this.hide();

        const siteTitle = document.getElementById('page-itinerary-planner-site-title');

        siteTitle.addEventListener('click', () => {
            this.hide();
            home.show();
        });
    }

    show() {
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }
}

const itineraryPlanner = new ItineraryPlanner();

export default itineraryPlanner;