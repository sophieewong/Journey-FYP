<script>
  import { Router, Link, Route } from "svelte-routing";

  //Pages
  import Home from "./Pages/Home.svelte";
</script>

<main class="app">
  <Router>
    <Route path="/" component={Home} />
  </Router>
</main>
