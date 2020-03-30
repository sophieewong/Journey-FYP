<script>
  import { auth } from "../stores.js";
  import getQueryParams from "../utils/getQueryParams.js";

  const id = getQueryParams("id", location.href);

  let itineraryData;

  $: if (!$auth.isAuthenticated) {
    location.replace(location.protocol + "//" + location.host + "/#/about");
  } else {
    //Make a request to the backend for the relevant itinerary
    fetch("/api/itinerary/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: $auth.user.uid,
        itineraryId: id
      })
    })
      .then(res => {
        console.log(res);
        if (res.status === 400) {
          location.replace(location.protocol + "//" + location.host + "/#/404");
        } else {
          return res.json();
        }
      })
      .then(data => {
        itineraryData = JSON.parse(data);
      })
      .catch(err => {
        console.error(err);
      });
  }
</script>

{#if itineraryData}
  <h1>{itineraryData.name}</h1>
  {#each itineraryData.days as day}
    <h2>{day.date}</h2>
  {/each}
{:else}...Loading{/if}
