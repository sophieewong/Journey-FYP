class TripPreview {
    constructor(name, date, duration) {
        // this - creates new instance and store the element to 'this', which is specific to the class.
        // or specific to its widest scope
        this.element = document.createElement('div');
        this.element.classList += "component-trip-preview";

        this.element.innerHTML = `
                <h3>${name}</h3>
                <p>${date}</p>
                <p class="itinerary-duration">${duration} days</p>
            `;
    }

    getHTMLElement() {
        return this.element;
    }
}

export default TripPreview;