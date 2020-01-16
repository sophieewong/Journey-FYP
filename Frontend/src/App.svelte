<script>
  import Router from "svelte-spa-router";

  import Home from "./Pages/Home.svelte";
  import Itineraries from "./Pages/Itineraries.svelte";
  import NotFound from "./Pages/NotFound.svelte";
  import ItineraryCreator from "./Pages/CreateItinerary/Step1Intro.svelte";
  import ItineraryCreatorWhere from "./Pages/CreateItinerary/Step2Where.svelte";
  import ItineraryCreatorWhen from "./Pages/CreateItinerary/Step3When.svelte";
  import ItineraryCreatorBudget from "./Pages/CreateItinerary/Step4Budget.svelte";
  import ItineraryCreatorRefine from "./Pages/CreateItinerary/Step5Refine.svelte";
  import ItineraryCreatorPOIs from "./Pages/CreateItinerary/Step6POIs.svelte";

  const routes = {
    "/": Home,
    "/itineraries": Itineraries,
    "/new-itinerary": ItineraryCreator,
    "/new-itinerary/where": ItineraryCreatorWhere,
    "/new-itinerary/when": ItineraryCreatorWhen,
    "/new-itinerary/budget": ItineraryCreatorBudget,
    "/new-itinerary/refine": ItineraryCreatorRefine,
    "/new-itinerary/places": ItineraryCreatorPOIs,

    "*": NotFound
  };
</script>

<Router {routes} />
