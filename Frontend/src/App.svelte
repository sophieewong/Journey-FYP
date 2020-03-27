<script>
  import Router from "svelte-spa-router";

  import Home from "./Pages/Home.svelte";
  import Itineraries from "./Pages/Itineraries.svelte";
  import NotFound from "./Pages/NotFound.svelte";
  import ItineraryCreator from "./Pages/ItineraryCreator.svelte";
  import Login from "./Pages/Login.svelte";

  const routes = {
    "/": Home,
    "/itineraries": Itineraries,
    "/new-itinerary": ItineraryCreator,
    "/login": Login,
    "/signup": Login,

    "*": NotFound
  };
</script>

<Router {routes} />
