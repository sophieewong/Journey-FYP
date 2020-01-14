<script>
  import Router from "svelte-spa-router";

  import Home from "./Pages/Home.svelte";
  import Itineraries from "./Pages/Itineraries.svelte";
  import NotFound from "./Pages/NotFound.svelte";
  import ItineraryCreator from "./Pages/CreateItinerary/Step1Intro.svelte";
  import ItineraryCreatorWhere from "./Pages/CreateItinerary/Step2Where.svelte";

  const routes = {
    "/": Home,
    "/itineraries": Itineraries,
    "/new-itinerary": ItineraryCreator,
    "/new-itinerary/where": ItineraryCreatorWhere,
    "*": NotFound
  };
</script>

<Router {routes} />
