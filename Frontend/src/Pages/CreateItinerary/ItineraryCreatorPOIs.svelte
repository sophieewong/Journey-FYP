<script>
  import {currentItineraryDestination, currentItineraryNumberOfDays, currentItineraryBudget, currentItineraryCategories, currentItineraryChosenPlaces} from "../../stores";
  import ItineraryCreatorHeader from "../../Components/ItineraryCreatorHeader.svelte";
  import TextInputField from "../../Components/TextInputField.svelte";
  import ItineraryCreatorButtons from "../../Components/ItineraryCreatorButtons.svelte";
  import POIInfoModal from "../../Components/POIInfoModal.svelte";

  let isModalOpened = false;
  let activePOI;

  let chosenCategories = [];

  $currentItineraryCategories.forEach(category => {
    if (category.selected) {
      chosenCategories.push(category.name);
    }
  });

  let places = [];

  // asks BE for data, returns a promise
  fetch(
    `/api/places/${$currentItineraryDestination}&categories=${chosenCategories.toString()}&budget=${$currentItineraryBudget}`
  )
    // once promise is resolved
    .then(response => {
      // return the promised data and converts to json
      return response.json();
    })
    .then(data => {
      places = data;
      console.log(places);
    });


    $: reachedMaximumNumOfPlaces = $currentItineraryChosenPlaces.length === ($currentItineraryNumberOfDays * 5);
</script>

<style type="text/scss">
  @import "../../styles/shared";

  .isDisabled {
    color: gray;
  }

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
    font-size: 1.05rem;
    line-height: 27px;
    letter-spacing: 0.1em;
    font-family: $body-text;
  }

  .places {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media screen and (max-width: $mobile-breakpoint) {
      justify-content: center;
    }
  }

  .place {
    margin-right: 10px;
    max-width: 17rem;
    cursor: pointer;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;

    @media screen and (max-width: $mobile-breakpoint) {
      min-width: 17rem;
      max-width: 21rem;
    }
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
  .poi-name {
    margin-bottom: 0;
    margin-top: 15px;
    max-width: 22rem;
    font-size: 14px;
    letter-spacing: 0.1em;
    font-style: normal;
    font-weight: 600;

    @media screen and (min-width: $desktop-breakpoint) {
      font-size: 17px;
    }

    @media screen and (max-width: $sm-tablet-breakpoint) {
      max-width: 17rem;
    }
  }

  .poi-category-type {
    font-style: italic;
    font-weight: 100;
    font-size: 11px;
    margin-top: 0;
    margin-bottom: 0;

    @media screen and (min-width: $desktop-breakpoint) {
      font-size: 16px;
    }
  }

  .poi-checkbox {
    visibility: hidden;
  }

  .checkbox-container {
    display: inline-block;
    cursor: pointer;
    background-image: url("../../images/add.png");
    background-size: cover;

    width: 2rem;
    height: 2rem;
    margin-left: -50px;
    margin-top: 128px;
    background-color: white;
    border-radius: 25px;

    @media screen and (max-width: $mobile-breakpoint) {
      width: 48px;
      height: 48px;
      margin-left: -90px;
    }
  }
  .poi-control-selected {
    background-image: url("../../images/selected.png");
  }

  .place-img {
    img {
      width: 100%;
      max-width: 17rem;
      border-radius: 7px 7px 0px 0px;
      height: 9rem;
      object-fit: cover;

      @media screen and (max-width: $mobile-breakpoint) {
        min-width: 17rem;
        max-width: 21rem;
      }
    }
  }

  .poi-details {
    width: 100%;
    max-width: 17rem;
    background-color: #f9f9fb;
    display: flex;
    flex-direction: column;
    font-family: $body-text;
    margin-top: -5px;
    border: 1px solid #f5f4f7;
    box-sizing: border-box;
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.25);
    border-radius: 0px 0px 7px 7px;
    height: 150px;
    justify-content: space-between;

    @media screen and (max-width: $mobile-breakpoint) {
      min-width: 17rem;
      max-width: 21rem;
    }
  }

  .poi-description {
    padding-right: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
    font-size: 12px;
  }

  .labels {
    padding-left: 1.25rem;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    font-size: 12.5px;
    padding-right: 1.5rem;
    color: $blue;
  }
</style>

{#if reachedMaximumNumOfPlaces}
  <h1>NO MORE PLACES ALLOWED</h1>
{/if}

{#if isModalOpened}
  <POIInfoModal
    onClose={() => (isModalOpened = false)}
    image={activePOI.image}
    name={activePOI.name}
    {$currentItineraryDestination}
    category={activePOI.category}
    description={activePOI.description}
    {$currentItineraryBudget} />
{/if}
<section class="itinerary-creator-content">
  <div class="itinerary-creator-field">
    <div class="itinerary-title-field">
      <p class="itinerary-step-title">
        Add the places you'd like to visit in {$currentItineraryDestination} to build your
        itinerary.
      </p>
    </div>

    <div class="places">
      {#each places as place}
        <div class="place">
          <div
            class="place-img"
            on:click={() => {
              isModalOpened = true;
              activePOI = place;
            }}>
            <img src={place.image} alt={place.name} />
            <div class="poi-details">
              <p class="labels poi-name">{place.name}</p>
              <p class="labels poi-category-type">{place.category}</p>
              <p class="labels poi-description">{place.description}</p>
              <div class="labels card-footer">
                <p class="poi-rating-label">{place.ratings}</p>
                <p class="poi-detail-label">Details</p>
              </div>

            </div>
          </div>
          <div
            on:click={() => {
              if (reachedMaximumNumOfPlaces && $currentItineraryChosenPlaces.indexOf(place) === -1) {
                return;
              }
              place.selected = !place.selected;
              if (place.selected) {
                $currentItineraryChosenPlaces.push(place);
                $currentItineraryChosenPlaces = $currentItineraryChosenPlaces;
              } else if (place.selected === false) {
                let index = $currentItineraryChosenPlaces.indexOf(place);
                if (index > -1) {
                  $currentItineraryChosenPlaces.splice(index, 1);
                  $currentItineraryChosenPlaces = $currentItineraryChosenPlaces;
                }
              }
            }}
            class="checkbox-container"
            class:poi-control-selected={place.selected}
            class:isDisabled={reachedMaximumNumOfPlaces && $currentItineraryChosenPlaces.indexOf(place) === -1 }>
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
      {:else}
        No places found for {$currentItineraryDestination}. 😔
        <br />
        Please enter another destination to explore.
      {/each}
    </div>
  </div>
</section>
