import itineraryPlanner from "../ItineraryPlanner/ItineraryPlanner";
import MobileNavigation from "../../Components/MobileNavigation/MobileNavigation";
import DesktopNavigation from "../../Components/DesktopNavigation/DesktopNavigation";

import { togglePage } from "../../utils";

class Home {
    constructor() {
        this.element = document.getElementById("page-home");

        const header = document.getElementById('page-home-header');

        // create new instance of navs
        const mobileNavigation = new MobileNavigation();
        const desktopNavigation = new DesktopNavigation();

        // load navigation elements onto page
        header.appendChild(mobileNavigation.getHTMLElement());
        header.appendChild(desktopNavigation.getHTMLElement());


        // setup mobile nav events after the element has loaded
        mobileNavigation.setupEventListeners();

        const itineraryButton = document.getElementById('itinerary-btn');

        itineraryButton.addEventListener('click', () => {
            togglePage(this, itineraryPlanner);
        });

        document.getElementById('component-mobile-navigation-itinerary-planner').addEventListener('click', () => {
            this.hide();
            itineraryPlanner.show();
            mobileNavigation.reset();
        })

        document.getElementById('component-desktop-navigation-itinerary-planner').addEventListener('click', () => {
            this.hide();
            itineraryPlanner.show();
        })

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