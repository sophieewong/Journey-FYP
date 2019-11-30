class DesktopNavigation {
    constructor() {
        this.element = document.createElement('nav');
        this.element.classList += "component-desktop-navigation";

        this.element.innerHTML = `
                 <ul>
                    <li id="component-desktop-navigation-about-us">About Us</li>
                    <li id="component-desktop-navigation-itinerary-planner">Itinerary Planner</li>
                    <li id="component-desktop-navigation-discover-destination">Discover Destinations</li>
                    <li id="component-desktop-navigation-bucket-list">Bucket List</li>
                </ul>
            `;
    }

    getHTMLElement() {
        return this.element;
    }
}

export default DesktopNavigation;