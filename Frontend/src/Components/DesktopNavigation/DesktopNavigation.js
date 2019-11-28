class DesktopNavigation {
    constructor() {

    }

    getHTMLElement() {
        const element = document.createElement('nav');
        element.classList += "component-desktop-navigation";

        element.innerHTML = `
                 <ul>
                    <li id="">About Us</li>
                    <li id="component-desktop-navigation-itinerary-planner">Itinerary Planner</li>
                    <li id="">Discover Destinations</li>
                    <li id="">Bucket List</li>
                </ul>
            `;

        return element;
    }
}

export default DesktopNavigation;