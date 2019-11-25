class TripPreview {
    constructor(name, date, duration) {
        this.name = name;
        this.date = date;
        this.duration = duration;
    }

    getHTMLElement() {
        const element = document.createElement('div');
        element.classList += "component-trip-preview";

        element.innerHTML = `
                <h3>${this.name}</h3>
                <p>${this.date}</p>
                <p>${this.duration}</p>
            `;

        return element;
    }
}

export default TripPreview;