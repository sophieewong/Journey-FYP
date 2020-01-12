<script>
  import Router from "svelte-spa-router";

  import Home from "./Pages/Home.svelte";
  import Itineraries from "./Pages/Itineraries.svelte";
  import NotFound from "./Pages/NotFound.svelte";

  const routes = {
    "/": Home,
    "/itineraries": Itineraries,
    "*": NotFound
  };
</script>

<Router {routes} />
