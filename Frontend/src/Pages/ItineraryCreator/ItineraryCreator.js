class ItineraryCreator {
  constructor() {
    this.element = document.getElementById('page-itinerary-creator');
    this.title = document.getElementById('page-itinerary-creator-title');
    this.titleText = '';

    this.introductionPage = document.getElementById('page-itinerary-creator-introduction');
    this.wherePage = document.getElementById('page-itinerary-creator-where');
    this.whenPage = document.getElementById('page-itinerary-creator-when');
    this.budgetPage = document.getElementById('page-itinerary-creator-budget');
    this.refinePage = document.getElementById('page-itinerary-creator-refine');
    this.placesPage = document.getElementById('page-itinerary-creator-places');

    this.setupNextButton();
    this.setupIntroductionPage();
    this.setupWherePage();
    this.setupWhenPage();
  }

  setupNextButton() {
    this.nextButton = document.getElementById('page-itinerary-creator-next-btn');

    const pages = [
      this.introductionPage,
      this.wherePage,
      this.whenPage,
      this.budgetPage,
      this.refinePage,
      this.placesPage
    ];

    let currentPageIndex = 0;
    this.nextButton.addEventListener('click', () => {
      if (currentPageIndex < pages.length - 2) {
        pages[currentPageIndex].style.display = 'none';
        pages[currentPageIndex + 1].style.display = 'block';

        if (pages[currentPageIndex + 1] === this.wherePage || this.whenPage) {
          this.disableNextButton(true);
        }

        currentPageIndex++;
      }
    });
  }

  setupIntroductionPage() {
    this.introductionPage.innerHTML = `
    <h2>Build Your Own Holiday Itinerary</h2>
    <p>Create an itinerary personalised to your own wants & needs.</p>
    <label for="name">Name your Itinerary:</label>`;

    const itineraryNameField = document.createElement('input');
    itineraryNameField.type = 'text';
    itineraryNameField.name = 'name';

    itineraryNameField.addEventListener('input', () => {
      if (itineraryNameField.value.length > 0) {
        this.titleText = itineraryNameField.value;
        this.disableNextButton(false);
      } else {
        this.disableNextButton(true);
      }
    });
    this.introductionPage.appendChild(itineraryNameField);
  }

  setupWherePage() {
    this.wherePage.innerHTML = `
      <label for="destination">Where would you like to go?</p>`;

    const cityField = document.createElement('input');
    cityField.type = 'text';
    cityField.destination = 'destination';

    cityField.addEventListener('input', () => {
      if (cityField.value.length > 0) {
        this.placeField = cityField.value;
        this.disableNextButton(false);
      } else {
        this.disableNextButton(true);
      }
    });
    this.wherePage.appendChild(cityField);

    // button currently has no functionality
    const addCitiesButton = document.createElement('button');
    addCitiesButton.innerText = '+ Add Cities';
    this.wherePage.appendChild(addCitiesButton);
  }

  setupWhenPage() {
    this.whenPage.innerHTML = `
      <p>When is the trip?</p>
      <p>To London </p>
      <label for="from">From</label>`;

    const startDateField = document.createElement('input');
    startDateField.type = 'date';
    startDateField.date = Date();

    this.whenPage.appendChild(startDateField);

    const endDateLabel = document.createElement('label');
    endDateLabel.for = 'to';
    endDateLabel.innerText = 'To';
    this.whenPage.appendChild(endDateLabel);

    const endDateField = document.createElement('input');
    endDateField.type = 'date';
    endDateField.date = Date();
    // button is only enabled when start from 'From' then 'To', doesnt work when starts from 'To'
    endDateField.addEventListener('input', () => {
      if (startDateField.value.length && endDateField.value.length > 0) {
        // needs editing
        this.titleText = startDateField.value + endDateField.value;
        this.disableNextButton(false);
      } else {
        this.disableNextButton(true);
      }
    });
    this.whenPage.appendChild(endDateField);
  }

  setupBudgetPage() {}

  setupRefinePage() {}

  setupPlacesPage() {}

  disableNextButton(disable) {
    this.nextButton.toggleAttribute('disabled', disable);
  }

  show() {
    this.element.style.display = 'block';
  }

  hide() {
    this.element.style.display = 'none';
  }
}

const itineraryCreator = new ItineraryCreator();
export default itineraryCreator;
