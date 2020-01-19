<script>
  import ItineraryCreatorHeader from "../Components/ItineraryCreatorHeader.svelte";
  import ItineraryCreatorButtons from "../Components/ItineraryCreatorButtons.svelte";

  import ItineraryCreatorName from "./CreateItinerary/Step1Intro.svelte";
  import ItineraryCreatorWhere from "./CreateItinerary/Step2Where.svelte";
  import ItineraryCreatorWhen from "./CreateItinerary/Step3When.svelte";
  import ItineraryCreatorBudget from "./CreateItinerary/Step4Budget.svelte";
  import ItineraryCreatorRefine from "./CreateItinerary/Step5Refine.svelte";
  import ItineraryCreatorPOIs from "./CreateItinerary/Step6POIs.svelte";

  let name = "New Itinerary";
  let destination = "";
  let startDate = new Date();
  let endDate = new Date();
  let budget = "Low";
  let categories = [
  { name: "Theme Parks", selected: false },
  { name: "Museums", selected: false},
  { name: "Shopping & Markets", selected: false }
];

  let currentStep = 0;

  /**
   * 1. Remove ItineraryCreatorHeader and ItineraryCreatorButtons from individual step pages
   * 2. Create a next step in this file that puts the Step3When onto the page, and binds startDate with the selected
   *    start date inside of the ItineraryCreatorWhen component. (tip: Look at how the destination variable is bound between this
   *    file and the ItineraryCreatorWhere component)
   * 3. Rename the actual step page files to be the same as the component name eg: Step2Where.svelte becomes ItineraryCreatorWhere.svelte
   * 4. Style this file
   * 5. Create Budget step, bind chosen budget (low, medium, high etc) to the budget variable in this file
   * 6. Create Refine step, bind selected categories to the array of categories in this file
   *
   * */
</script>

<section class="itinerary-creator-header">
  <ItineraryCreatorHeader itineraryTitle={name} />
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
  <ItineraryCreatorRefine bind:categories />
{/if}

{#if currentStep > 0}
  <ItineraryCreatorButtons
    onPrevClick={() => currentStep--}
    onNextClick={() => currentStep++} />
{/if}
