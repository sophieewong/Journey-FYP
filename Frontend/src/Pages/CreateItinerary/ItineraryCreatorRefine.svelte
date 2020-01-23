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
    border: 7px solid $blue;
    background-color: transparent;
    border-radius: 7px;
    width: 20rem;
    height: 20rem;
    padding: 2rem 3rem;

    :global(svg) {
      width: 75%;
      height: 75%;
      margin-left: 2.5rem;
    }

    :global(path) {
      fill: $blue;
    }
  }

  .icon-container-selected {
    background-color: $blue;
    border-radius: 7px;
    border: 7px solid $blue;
    width: 20rem;
    height: 20rem;
    padding: 2rem 3rem;

    :global(svg) {
      width: 75%;
      height: 75%;
      margin-left: 2.5rem;
    }
    :global(path) {
      fill: $white;
    }

    .category-title {
      color: $white;
    }
  }

  .category-title {
    text-align: center;
    margin: 0.5rem 0 0 0;
    font-family: $body-text;
    font-size: 3em;
    color: $blue;
  }

  .category-checkbox {
    visibility: hidden;
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
      <div
        class="icon-container"
        on:click={() => (category.selected = !category.selected)}
        class:icon-container={!category.selected}
        class:icon-container-selected={category.selected}>
        {@html getCategoryIcon(category.name)}
        <label class="category-title" for={category.name}>
          {category.name}
        </label>
        <input
          name={category.name}
          class="category-checkbox"
          type="checkbox"
          checked={category.selected}
          on:change={event => {
            category.selected = event.target.checked;
          }} />
      </div>
    {/each}
  </div>
</section>
