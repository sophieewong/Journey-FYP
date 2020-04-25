<script>
  import {
    auth,
    currentItineraryBudget,
    currentItineraryCategories,
    currentItineraryChosenPlaces,
    currentItineraryDestination,
    currentItineraryEndDate,
    currentItineraryName,
    currentItineraryNumberOfDays,
    currentItineraryStartDate
  } from "../stores.js";
  import getQueryParams from "../utils/getQueryParams.js";

  const id = getQueryParams("id", location.href);

  let itineraryData;

  let userIsEditing = false;

  if (!$auth.isAuthenticated) {
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
        if (res.status === 400) {
          location.replace(location.protocol + "//" + location.host + "/#/404");
        } else {
          return res.json();
        }
      })
      .then(data => {
        itineraryData = JSON.parse(data);
        console.log(itineraryData);
      })
      .catch(err => {
        console.error(err);
      });
  }

  const deleteItinerary = () => {
    fetch("/api/itinerary/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: $auth.user.uid,
        itineraryId: id
      })
    }).then(res => {
      if (res.status === 200) {
        alert("Successfully deleted.");
        location.replace(
          location.protocol + "//" + location.host + "/#/itineraries"
        );
      }
    });
  };

  const saveItinerary = () => {
    userIsEditing = false;

    fetch("/api/itinerary/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: $auth.user.uid,
        itineraryId: id,
        updatedItinerary: JSON.stringify(itineraryData)
      })
    });
  };

  const movePlace = (placePos, direction) => {
    //Are we okay to add 1 or -1 without exceeding the number of places for this day?
    if (
      placePos.place + direction <=
        itineraryData.days[placePos.day].places.length - 1 &&
      placePos.place + direction >= 0
    ) {
      //Swap this place with the place next to it
      let newPlacesArray = [...itineraryData.days[placePos.day].places];

      newPlacesArray[placePos.place] =
        itineraryData.days[placePos.day].places[placePos.place + direction];

      newPlacesArray[placePos.place + direction] =
        itineraryData.days[placePos.day].places[placePos.place];

      itineraryData.days[placePos.day].places = newPlacesArray;
    } else {
      //Move this place to the next day
      if (
        placePos.day + direction <= itineraryData.days.length - 1 &&
        placePos.day + direction >= 0
      ) {
        let newDayArray = itineraryData.days[placePos.day + direction].places;

        let placeToMove = itineraryData.days[placePos.day].places.splice(
          placePos.place,
          1
        )[0];
        if (direction === 1) {
          newDayArray.unshift(placeToMove);
        } else {
          newDayArray.push(placeToMove);
        }

        itineraryData.days[placePos.day + direction].places = newDayArray;

        console.log(itineraryData);
      } else {
        console.log(placePos);
      }
    }
  };

  const removePlace = placePos => {
    const arrayWithPlaceRemoved = [...itineraryData.days[placePos.day].places];
    arrayWithPlaceRemoved.splice(placePos.place, 1);
    itineraryData.days[placePos.day].places = arrayWithPlaceRemoved;
  };
</script>

<style type="text/scss">
  @import "../styles/shared";
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

{#if itineraryData}
  <h1>{itineraryData.name}</h1>
  {#if userIsEditing}
    <button class="" on:click={saveItinerary}>Save Itinerary</button>
  {:else}
    <button class="" on:click={() => (userIsEditing = true)}>Edit</button>
  {/if}
  <button class="" on:click={deleteItinerary}>DELETE</button>
  {#each itineraryData.days as { date, places }, dayIndex}
    <h2>{date}</h2>
    {#each places as place, placeIndex}
      <div>
        <button
          on:click={() => {
            movePlace({ day: dayIndex, place: placeIndex }, -1);
          }}>
          Up
        </button>
        <button
          on:click={() => {
            movePlace({ day: dayIndex, place: placeIndex }, 1);
          }}>
          Down
        </button>
        <button
          on:click={() => removePlace({ day: dayIndex, place: placeIndex })}>
          Remove
        </button>
      </div>
      <div class="place">
        <div class="place-img">
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
      </div>
    {/each}
  {/each}
{:else}...Loading{/if}
