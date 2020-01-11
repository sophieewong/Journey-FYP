import JourneyLogo from '../../img/JourneyLogo.png';
import DesktopNavigation from '../../Components/DesktopNavigation/DesktopNavigation';

class HeroBanner {
  constructor(pageClass, pageTitle) {
    this.element = document.createElement('div');
    this.element.classList += 'component-hero-banner hero-image-' + pageClass;

    const heroHeader = document.createElement('div');
    heroHeader.classList = 'hero-header';
    heroHeader.innerHTML = `
        <div class="logo-container">
            <img id="page-itinerary-planner-site-title" class="logo" src="${JourneyLogo}" alt="Journey Logo">
        </div>`;

    const desktopNavigation = new DesktopNavigation();
    heroHeader.appendChild(desktopNavigation.getHTMLElement());

    this.element.innerHTML = `
            <h1> ${pageTitle}</h1>
         `;

    this.element.prepend(heroHeader);
  }

  onLogoClicked(callback) {
    document
      .getElementById('page-itinerary-planner-site-title')
      .addEventListener('click', callback);
  }

  getHTMLElement() {
    return this.element;
  }
}

export default HeroBanner;
