<script>
  import {
    auth,
    currentItineraryName,
    currentItineraryDestination,
    currentItineraryCategories,
    currentItineraryStartDate,
    currentItineraryEndDate,
    currentItineraryNumberOfDays,
    currentItineraryChosenPlaces,
    currentItineraryBudget
  } from "../stores.js";

  import ItineraryCreatorHeader from "../Components/ItineraryCreatorHeader.svelte";
  import ItineraryCreatorButtons from "../Components/ItineraryCreatorButtons.svelte";
  import Tabs from "../Components/Tabs.svelte";

  import ItineraryCreatorName from "./CreateItinerary/ItineraryCreatorName.svelte";
  import ItineraryCreatorWhere from "./CreateItinerary/ItineraryCreatorWhere.svelte";
  import ItineraryCreatorWhen from "./CreateItinerary/ItineraryCreatorWhen.svelte";
  import ItineraryCreatorBudget from "./CreateItinerary/ItineraryCreatorBudget.svelte";
  import ItineraryCreatorRefine from "./CreateItinerary/ItineraryCreatorRefine.svelte";
  import ItineraryCreatorPOIs from "./CreateItinerary/ItineraryCreatorPOIs.svelte";

  $: categoryHasBeenSelected =
    $currentItineraryCategories.filter(category => {
      return category.selected;
    }).length > 0;

  console.log($currentItineraryStartDate);
  console.log(JSON.stringify($currentItineraryStartDate));
  console.log($currentItineraryStartDate.toString());

  let currentStep = 0;
  $: if (currentStep === 6) {
    //1 Ask backend to generate us an itinerary
    fetch("/api/itinerary/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: $currentItineraryName,
        destination: $currentItineraryDestination,
        startDate: $currentItineraryStartDate.toUTCString(),
        endDate: $currentItineraryEndDate.toUTCString(),
        duration: $currentItineraryNumberOfDays,
        places: $currentItineraryChosenPlaces,
        categories: $currentItineraryCategories,
        budget: currentItineraryBudget,
        userId: $auth.user.uid
      })
    })
      .then(res => res.json())
      .then(data => {
        location.replace(
          location.protocol +
            "//" +
            location.host +
            "/#/itinerary?id=" +
            data.id
        );
        // console.log(data);
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
  <ItineraryCreatorHeader itineraryTitle={$currentItineraryName} />
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
      currentItineraryName.set(itineraryName);
      currentStep++;
    }} />
{:else if currentStep === 1}
  <ItineraryCreatorWhere />
{:else if currentStep === 2}
  <ItineraryCreatorWhen />
{:else if currentStep === 3}
  <ItineraryCreatorBudget />
{:else if currentStep === 4}
  <ItineraryCreatorRefine />
{:else if currentStep === 5}
  <ItineraryCreatorPOIs />
{:else}
  <!-- Itinerary Generator -->
{/if}

{#if currentStep > 0}
  <ItineraryCreatorButtons
    disableNextButton={$currentItineraryDestination === '' || !categoryHasBeenSelected}
    nextButtonName={currentStep === 5 ? 'Generate Itinerary' : 'Next'}
    onPrevClick={() => currentStep--}
    onNextClick={() => currentStep++} />
{/if}
