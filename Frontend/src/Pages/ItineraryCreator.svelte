<script>
  import { auth } from "../stores.js";
  import ItineraryCreatorHeader from "../Components/ItineraryCreatorHeader.svelte";
  import ItineraryCreatorButtons from "../Components/ItineraryCreatorButtons.svelte";
  import Tabs from "../Components/Tabs.svelte";

  import ItineraryCreatorName from "./CreateItinerary/ItineraryCreatorName.svelte";
  import ItineraryCreatorWhere from "./CreateItinerary/ItineraryCreatorWhere.svelte";
  import ItineraryCreatorWhen from "./CreateItinerary/ItineraryCreatorWhen.svelte";
  import ItineraryCreatorBudget from "./CreateItinerary/ItineraryCreatorBudget.svelte";
  import ItineraryCreatorRefine from "./CreateItinerary/ItineraryCreatorRefine.svelte";
  import ItineraryCreatorPOIs from "./CreateItinerary/ItineraryCreatorPOIs.svelte";

  let name = "New Itinerary";
  let destination = "London"; // test data
  // let destination = "";

  let startDate = new Date();
  let endDate = new Date();
  let budget = "All";
  let categories = [
    { name: "Theme Parks", selected: false },
    { name: "Museums", selected: true },
    { name: "Nature & Wildlife", selected: false },
    { name: "Shopping & Markets", selected: false },
    { name: "Theatre & Movies", selected: false },
    { name: "Historical", selected: false },
    { name: "Food", selected: false },
    { name: "Arts & Culture", selected: false },
    { name: "Sports", selected: false },
    { name: "Landmarks", selected: false },
    { name: "Beaches, Coasts & Islands", selected: false },
    { name: "City Views", selected: false },
    { name: "Nightlife", selected: false },
    { name: "Entertainment & Events", selected: false }
  ];

  let chosenPlaces = [];

  $: categoryHasBeenSelected =
    categories.filter(category => {
      return category.selected;
    }).length > 0;

  let currentStep = 5; //test data

  /** @type {{
   *  name: string,
   *  places: {
   *    name: string,
   *    image: string,
   *    category: string
   * }[]
   * }} */

  $: if (currentStep === 6) {
    console.log(
      JSON.stringify({
        name: name,
        places: chosenPlaces
      })
    );
    //1 Ask backend to generate us an itinerary
    fetch("/api/itinerary/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        places: chosenPlaces,
        userId: $auth.userId,
        authToken: $auth.authToken
      })
    })
      .then(res => res.json())
      .then(({ id }) => {
        //3 Redirect to the /itinerary?{id}
      });
  }
</script>

<style type="text/scss">
  @import "../styles/shared";

  .itinerary-creator-tabs {
    padding-left: 6rem;
    padding-right: 6rem;

    @media screen and (max-width: $desktop-breakpoint) {
      padding: 0.25rem 0;
      margin-right: 3rem;
      margin-left: 3rem;
    }
  }
</style>

<section class="itinerary-creator-header">
  <ItineraryCreatorHeader itineraryTitle={name} />
</section>

<section class="itinerary-creator-tabs">
  <Tabs
    tabs={['Name', 'Where', 'When', 'Budget', 'Refine', 'Places']}
    activeTab={currentStep}
    onTabClicked={tab => (currentStep = tab)} />
</section>

{#if currentStep === 0}
  <ItineraryCreatorName
    onNextStep={itineraryName => {
      name = itineraryName;
      currentStep++;
    }} />
{:else if currentStep === 1}
  <ItineraryCreatorWhere bind:destination />
{:else if currentStep === 2}
  <ItineraryCreatorWhen {destination} />
{:else if currentStep === 3}
  <ItineraryCreatorBudget bind:budget {destination} />
{:else if currentStep === 4}
  <ItineraryCreatorRefine bind:categories {destination} />
{:else if currentStep === 5}
  <ItineraryCreatorPOIs {destination} {budget} {categories} bind:chosenPlaces />
{:else}
  <!-- Itinerary Generator -->
{/if}

{#if currentStep > 0}
  <ItineraryCreatorButtons
    disableNextButton={destination === '' || !categoryHasBeenSelected}
    nextButtonName={currentStep === 5 ? 'Generate Itinerary' : 'Next'}
    onPrevClick={() => currentStep--}
    onNextClick={() => currentStep++} />
{/if}
