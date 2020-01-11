import mobileMenuImage from '../../img/MobileMenu.png';
import closeMenuImage from '../../img/CloseBtn.png';
import userAccountMobileImage from '../../img/UserAccountMobile.png';

class MobileNavigation {
  constructor() {
    this.element = document.createElement('div');
    this.element.classList += 'component-mobile-navigation';

    this.element.innerHTML = `
            <img id="component-mobile-navigation-open-menu-button" src="${mobileMenuImage}" alt="Mobile Menu Button">
            <nav class="component-mobile-navigation-closed">
                <ul>
                    <li id="component-mobile-navigation-about-us">About Us</li>
                    <li id="component-mobile-navigation-itinerary-planner">Itinerary Planner</li>
                    <li id="component-mobile-navigation-login-button"><img id="component-mobile-navigation-account-button" src="${userAccountMobileImage}" alt="Click to login">Login</li>
                </ul>
                <img id="component-mobile-navigation-close-menu-button" src="${closeMenuImage}" alt="Cross to Close Menu">
            </nav>
        `;
  }

  getHTMLElement() {
    return this.element;
  }

  setupEventListeners() {
    const openMobileMenuButton = document.getElementById(
      'component-mobile-navigation-open-menu-button'
    );
    const closeMobileMenuButton = document.getElementById(
      'component-mobile-navigation-close-menu-button'
    );

    openMobileMenuButton.addEventListener('click', () => {
      this.show();
    });

    closeMobileMenuButton.addEventListener('click', () => {
      this.hide();
    });
  }

  show() {
    this.element.querySelector('nav').classList.add('component-mobile-navigation-open');
  }

  hide() {
    this.element.querySelector('nav').classList.remove('component-mobile-navigation-open');
  }

  reset() {
    this.element.querySelector('nav').classList.remove('component-mobile-navigation-open');
  }
}

export default MobileNavigation;
