<script>
  import Router from "svelte-spa-router";

  import Home from "./Pages/Home.svelte";
  import Itineraries from "./Pages/Itineraries.svelte";
  import NotFound from "./Pages/NotFound.svelte";
  import ItineraryCreator from "./Pages/ItineraryCreator.svelte";

  const routes = {
    "/": Home,
    "/itineraries": Itineraries,
    "/new-itinerary": ItineraryCreator,

    "*": NotFound
  };
</script>

<Router {routes} />
