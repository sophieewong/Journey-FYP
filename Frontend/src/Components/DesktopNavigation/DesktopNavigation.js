import userAccountImage from '../../img/UserAccount.png';

class DesktopNavigation {
  constructor() {
    this.element = document.createElement('nav');
    this.element.classList += 'component-desktop-navigation';

    this.element.innerHTML = `
                 <ul>
                    <li id="component-desktop-navigation-about-us">About Us</li>
                    <li id="component-desktop-navigation-itinerary-planner">Itinerary Planner</li>
                    <li id="component-desktop-navigation-login-button"><img id="component-desktop-navigation-account-button" src="${userAccountImage}" alt="Click to login"></li>
                </ul>
            `;
  }

  getHTMLElement() {
    return this.element;
  }
}

export default DesktopNavigation;
