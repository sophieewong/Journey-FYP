<script>
  import ItineraryCreatorHeader from "../../Components/ItineraryCreatorHeader.svelte";
  import TextInputField from "../../Components/TextInputField.svelte";
  import ItineraryCreatorButtons from "../../Components/ItineraryCreatorButtons.svelte";

  export let destination = "London";
  export let budget = "All";
  export let categories;

  let chosenCategories = [];

  categories.forEach(category => {
    if (category.selected === true) {
      chosenCategories.push(category.name);
    }
  });

  let places = [];

  // asks BE for data, returns a promise
  fetch(
    `/api/places/${destination}&categories=${chosenCategories.toString()}&budget=${budget}`
  )
    // once promise is resolved
    .then(response => {
      // return the promised data and converts to json
      return response.json();
    })
    .then(data => {
      places = data;
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

    @media screen and (max-width: $mobile-breakpoint) {
      margin-right: 1.5rem;
      margin-left: 1.5rem;
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

  .place-of-interest {
    margin: 2rem 0;
    display: flex;
    justify-content: space-between;
    max-width: 27rem;

    @media screen and (min-width: $desktop-breakpoint) {
      margin: 4rem 0;
      max-width: 35rem;
    }

    img {
      border-radius: 11rem;
      width: 6.5rem;
      height: 6.5rem;

      @media screen and (max-width: $mobile-breakpoint) {
        width: 4.5rem;
        height: 4.5rem;
        margin-top: 1.5rem;
      }
    }
  }

  .poi-profile {
    display: flex;

    @media screen and (max-width: $mobile-breakpoint) {
      width: 14rem;
    }

    @media screen and (min-width: $mobile-breakpoint) and (max-width: $tablet-breakpoint) {
      width: 18rem;
    }
  }

  .poi-details {
    display: flex;
    flex-direction: column;
    margin-left: 1.5rem;
    font-family: $body-text;
  }

  .poi-name {
    margin-bottom: 0;
    margin-top: 1.5rem;
    max-width: 22rem;
    font-size: 18px;
    letter-spacing: 0.1em;
    font-style: normal;
    font-weight: normal;

    @media screen and (min-width: $desktop-breakpoint) {
      font-size: 25px;
    }

    @media screen and (max-width: $sm-tablet-breakpoint) {
      max-width: 14rem;
    }
  }

  .poi-category-type {
    font-style: italic;
    font-weight: 100;
    font-size: 15px;

    @media screen and (min-width: $desktop-breakpoint) {
      font-size: 20px;
    }
  }

  .poi-checkbox {
    visibility: hidden;
  }

  .checkbox-container {
    display: inline-block;
    width: 3rem;
    height: 3rem;
    // margin-left: 2rem;
    cursor: pointer;
    background-image: url("../../images/add.png");
    background-size: cover;
    margin-top: 1.5rem;
  }
  .poi-control-selected {
    background-image: url("../../images/selected.png");
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
    </div>
    <div class="places">
      {#each places as place}
        <div class="place-of-interest">
          <div class="poi-profile">
            <img src={place.image} alt={place.name} />
            <div class="poi-details">
              <p class="poi-name">{place.name}</p>
              <p class="poi-category-type">{place.category}</p>
            </div>
          </div>
          <div
            on:click={() => (place.selected = !place.selected)}
            class="checkbox-container"
            class:poi-control-selected={place.selected}>
            <label class="poi-label" for={place.name} />
            <input
              name={place.name}
              class="poi-checkbox"
              type="checkbox"
              checked={place.selected}
              on:change={event => {
                place.selected = event.target.checked;
              }} />
          </div>
        </div>
      {:else}No places found :({/each}
    </div>
  </div>
</section>
