<script>
  import ItineraryCreatorHeader from "../../Components/ItineraryCreatorHeader.svelte";
  import TextInputField from "../../Components/TextInputField.svelte";
  import ItineraryCreatorButtons from "../../Components/ItineraryCreatorButtons.svelte";

  import getCategoryIcon from "../../utils/getCategoryIcon.js";

  export let categories;
  export let destination = "";
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

  .icon-container {
    border: 1px solid $blue;
    background-color: transparent;
    :global(path) {
      fill: $blue;
    }
  }

  .icon-container-selected {
    background-color: $blue;
    :global(path) {
      fill: $white;
    }
  }
</style>

<section class="itinerary-steps">
  <!-- Add itinerary steps component -->
</section>
<section class="itinerary-creator-content">
  <div class="itinerary-creator-field">
    <div class="itinerary-title-field">
      <p class="itinerary-step-title">Refine your itinerary.</p>
    </div>
  </div>
  <div>
    {#each categories as category}
      <h4>{category.name}</h4>
      <div
        class="icon-container"
        class:icon-container={!category.selected}
        class:icon-container-selected={category.selected}>
        {@html getCategoryIcon(category.name)}
      </div>
      <input
        type="checkbox"
        checked={category.selected}
        on:change={event => {
          category.selected = event.target.checked;
        }} />
    {/each}
  </div>
</section>
