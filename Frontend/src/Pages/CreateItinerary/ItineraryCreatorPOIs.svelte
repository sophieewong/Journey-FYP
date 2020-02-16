<script>
  import ItineraryCreatorHeader from "../../Components/ItineraryCreatorHeader.svelte";
  import TextInputField from "../../Components/TextInputField.svelte";
  import ItineraryCreatorButtons from "../../Components/ItineraryCreatorButtons.svelte";

  export let destination = "";
  export let budget;
  export let categories;

  let chosenCategories = [];

  categories.forEach(category => {
    if (category.selected === true) {
      chosenCategories.push(category.name);
    }
  });

  let places = [];

  // asks BE for data, returns a promise
  fetch(`/api/places/${destination}&categories=${chosenCategories.toString()}`)
    // once promise is resolved
    .then(response => {
      // return the promised data and converts to json
      return response.json();
    })
    .then(data => {
      places = data.places;
    });
</script>

<style type="text/scss">
  @import "../../styles/shared";

  section {
    margin-right: 6rem;
    margin-left: 6rem;
    @media screen and (max-width: $desktop-breakpoint) {
      margin-right: 3rem;
      margin-left: 3rem;
    }
  }

  .itinerary-step-title {
    font-style: normal;
    font-weight: normal;
    font-size: 1.5rem;
    line-height: 27px;
    letter-spacing: 0.1em;
    font-family: $body-text;
  }
</style>

<section class="itinerary-steps">
  <!-- Add itinerary steps component -->
</section>
<section class="itinerary-creator-content">
  <div class="itinerary-creator-field">
    <div class="itinerary-title-field">
      <p class="itinerary-step-title">
        Add the places you'd like to visit in {destination} to build your
        itinerary.
      </p>
      {#each places as { name, category, image }}
        <h2>{name}</h2>
        <h4>{category}</h4>
        <img src={image} alt={name} />
      {:else}No places found :({/each}
    </div>
  </div>
</section>
