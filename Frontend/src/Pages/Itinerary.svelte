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
  import formatDateString from "../utils/formatDateString.js";
  import HeroBanner from "../Components/HeroBanner.svelte";

  const id = getQueryParams("id", location.href);

  let itineraryData;

  $: console.log(itineraryData);

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

  let test = false;
</script>

<style type="text/scss">
  @import "../styles/shared";
  .place {
    // max-width: 17rem;
    max-width: 23rem;
    // width: 100%;
    cursor: default;
    padding-bottom: 4rem;
    display: flex;
    border-left: 2px solid $blue;
    padding-left: 5rem;
    margin-left: 2rem;
    margin-top: -20px;

    @media screen and (max-width: $mobile-breakpoint) {
      min-width: 17rem;
      max-width: 21rem;
      padding-left: 1.5rem;
      margin-left: 1rem;
    }

    &:last-child {
      border-left: none;
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
    font-size: 18px;
    letter-spacing: 0.1em;
    font-style: normal;
    font-weight: 600;
    padding-bottom: 6px;

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
    // font-size: 11px;
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
      // width: 100%;
      // max-width: 17rem;
      max-width: 23rem;
      width: 100%;
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
    // width: 100%;
    // max-width: 17rem;
    max-width: 23rem;
    width: 100%;
    background-color: #f9f9fb;
    display: flex;
    flex-direction: column;
    font-family: $body-text;
    margin-top: -5px;
    border: 1px solid #f5f4f7;
    box-sizing: border-box;
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.25);
    border-radius: 0px 0px 7px 7px;
    justify-content: space-between;
    font-size: 1rem;

    @media screen and (max-width: $mobile-breakpoint) {
      min-width: 17rem;
      max-width: 21rem;
    }
  }

  .poi-description {
    padding-right: 1rem;
    // font-size: 12px;
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

  .itinerary-details {
    position: absolute;
    width: 250px;
    height: 120px;
    top: 47%;

    background: $white;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 0.5rem 2rem;

    @media screen and (max-width: $desktop-breakpoint) {
      top: 18rem;
    }
  }

  .itinerary-body {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-left: 6rem;
    margin-right: 6rem;
    margin-bottom: 3rem;

    @media screen and (max-width: $mobile-breakpoint) {
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }

  .itinerary-overview {
    margin-top: 7.5rem;
    display: flex;
    justify-content: space-between;
    width: 100%;

    @media screen and (min-width: $tablet-breakpoint) {
      max-width: 33.5rem;
    }
  }

  .itinerary-date {
    text-align: left;
    font-family: $page-heading;
    font-style: normal;
    font-weight: bold;
    font-size: 1.2rem;
    line-height: 24px;
    letter-spacing: 0.06em;
  }

  .itinerary-contents {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    @media screen and (min-width: $tablet-breakpoint) {
      max-width: 33.5rem;
    }
  }

  // .itinerary-delete {
  //   width: 100%;
  //   max-width: 33.5rem;
  // }

  .save-btn {
    cursor: pointer;
  }

  .edit-btn {
    cursor: pointer;
    border-radius: 25px;
    width: 12rem;
    height: 2.5rem;
    font-family: $body-text;
    font-size: 1.15rem;
    margin-bottom: 1.3rem;
    padding-top: 5px;
    font-weight: light;
    border-width: 2px;
    box-shadow: none;

    &:hover {
      color: $white;
      background-color: $blue;
    }
  }

  .delete-btn {
    // margin-bottom: 2rem;
    cursor: pointer;
    // border-radius: 7px;
    width: 3.5rem;
    height: 3.5rem;
    font-family: $body-text;
    font-size: 1.15rem;
    // margin-top: 1.3rem;
    padding-top: 20px;
    padding-bottom: 5px;
    font-weight: light;
    // border-width: 2px;
    box-shadow: none;
    border: none;
    background-color: transparent;
    margin-left: 0.5rem;

    svg {
      height: 100%;
      width: 100%;
    }
  }

  .poi-point {
    margin-left: 1.2rem;
    margin-bottom: -5px;

    @media screen and (max-width: $mobile-breakpoint) {
      margin-left: 0.17rem;
    }
  }

  .trip-detail {
    font-family: $page-heading;
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
    line-height: 22px;
    letter-spacing: 0.06em;

    @media screen and (max-width: $mobile-breakpoint) {
      font-size: 1.1rem;
    }
  }

  .edit-saving-btns {
    margin-top: 1rem;
  }

  .trip-dates,
  .trip-duration {
    font-family: $body-text;
    font-size: 1rem;
    font-weight: 100;
    margin-bottom: 1rem;
  }

  .itinerary-overview-title {
    font-family: $page-heading;
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 29px;
    margin-bottom: 10px;
  }

  // .poi-hours {
  //   font-size: 1rem;
  // }

  .remove-place-btn {
    width: 4rem;
    height: 4rem;
    margin: auto 0;
    padding: 5px;
    background-color: transparent;
    border: none;
    background-color: transparent;
    border: none;
    margin-left: -2rem;
    margin-top: -30px;
    cursor: pointer;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .direction-btn {
    width: 3rem;
    height: 3rem;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .direction-btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
</style>

<section>

  {#if itineraryData}
    <HeroBanner
      title={itineraryData.name}
      image="./images/hero/mapHero.jpg"
      showSubtitle={true}
      subtitle={itineraryData.destination} />
    <div class="itinerary-body">
      <div class="itinerary-details">
        <p class="trip-detail">Trip Detail</p>
        <p class="trip-dates">
          <b>Dates:</b>
          {formatDateString(itineraryData.startDate)} - {formatDateString(itineraryData.endDate)}
        </p>
        <p class="trip-duration">
          <b>Duration:</b>
          {itineraryData.duration} day(s)
        </p>
      </div>

      <div class="itinerary-overview">
        <p class="itinerary-overview-title">Itinerary Overview</p>
        <div class="itinerary-delete">
          {#if !userIsEditing}
            <button class="delete-btn" on:click={deleteItinerary}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="512px"
                viewBox="-57 0 512 512"
                width="512px">
                <g>
                  <path
                    d="m156.371094
                    30.90625h85.570312v14.398438h30.902344v-16.414063c.003906-15.929687-12.949219-28.890625-28.871094-28.890625h-89.632812c-15.921875
                    0-28.875 12.960938-28.875 28.890625v16.414063h30.90625zm0 0"
                    data-original="#B5BEC4"
                    class="active-path"
                    fill="#B5BEC4" />
                  <path
                    d="m344.210938 167.75h-290.109376c-7.949218 0-14.207031
                    6.78125-13.566406 14.707031l24.253906 299.90625c1.351563
                    16.742188 15.316407 29.636719 32.09375
                    29.636719h204.542969c16.777344 0 30.742188-12.894531
                    32.09375-29.640625l24.253907-299.902344c.644531-7.925781-5.613282-14.707031-13.5625-14.707031zm-219.863282
                    312.261719c-.324218.019531-.648437.03125-.96875.03125-8.101562
                    0-14.902344-6.308594-15.40625-14.503907l-15.199218-246.207031c-.523438-8.519531
                    5.957031-15.851562 14.472656-16.375 8.488281-.515625
                    15.851562 5.949219 16.375 14.472657l15.195312
                    246.207031c.527344 8.519531-5.953125 15.847656-14.46875
                    16.375zm90.433594-15.421875c0 8.53125-6.917969
                    15.449218-15.453125
                    15.449218s-15.453125-6.917968-15.453125-15.449218v-246.210938c0-8.535156
                    6.917969-15.453125 15.453125-15.453125 8.53125 0 15.453125
                    6.917969 15.453125 15.453125zm90.757812-245.300782-14.511718
                    246.207032c-.480469 8.210937-7.292969 14.542968-15.410156
                    14.542968-.304688
                    0-.613282-.007812-.921876-.023437-8.519531-.503906-15.019531-7.816406-14.515624-16.335937l14.507812-246.210938c.5-8.519531
                    7.789062-15.019531 16.332031-14.515625 8.519531.5 15.019531
                    7.816406 14.519531 16.335937zm0 0"
                    data-original="#B5BEC4"
                    class="active-path"
                    fill="#B5BEC4" />
                  <path
                    d="m397.648438
                    120.0625-10.148438-30.421875c-2.675781-8.019531-10.183594-13.429687-18.640625-13.429687h-339.410156c-8.453125
                    0-15.964844 5.410156-18.636719 13.429687l-10.148438
                    30.421875c-1.957031 5.867188.589844 11.851562 5.34375
                    14.835938 1.9375 1.214843 4.230469 1.945312 6.75
                    1.945312h372.796876c2.519531 0 4.816406-.730469
                    6.75-1.949219 4.753906-2.984375 7.300781-8.96875
                    5.34375-14.832031zm0 0"
                    data-original="#B5BEC4"
                    class="active-path"
                    fill="#B5BEC4" />
                </g>
              </svg>
            </button>
          {/if}
        </div>

      </div>
      <div class="edit-saving-btns">
        {#if userIsEditing}
          <button class="secondary-btn edit-btn" on:click={saveItinerary}>
            Save Itinerary
          </button>
        {:else}
          <button
            class="secondary-btn edit-btn"
            on:click={() => (userIsEditing = true)}>
            Edit Itinerary
          </button>
        {/if}
      </div>

      <div class="itinerary-contents">
        {#each itineraryData.days as { date, places }, dayIndex}
          <div class="itinerary-date">
            <p>{formatDateString(date)}</p>
          </div>
          {#each places as place, placeIndex}
            {#if userIsEditing}
              <div class="itinerary-buttons">
                <div class="itinerary-edit-btns">
                  <button
                    class="direction-btn up-btn"
                    on:click={() => {
                      movePlace({ day: dayIndex, place: placeIndex }, -1);
                    }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      width="512px"
                      height="512px"
                      viewBox="0 0 123.969 123.97"
                      style="enable-background:new 0 0 123.969 123.97;"
                      xml:space="preserve">
                      <g>
                        <g>
                          <path
                            d="M120.266,95.584c5.301-5.801,4.801-14.801-0.8-20.301l-47.3-47.4c-2.8-2.8-6.5-4.2-10.2-4.2s-7.399,1.4-10.2,4.2
                            l-47.299,47.3c-5.5,5.5-6.1,14.6-0.8,20.3c5.6,6.101,15.099,6.3,20.9,0.5l30.3-30.3c3.899-3.9,10.2-3.9,14.1,0l30.3,30.3
                            C105.167,101.883,114.667,101.684,120.266,95.584z"
                            data-original="#000000"
                            class="active-path"
                            data-old_color="#000000"
                            fill="#1BA8F1" />
                        </g>
                      </g>
                    </svg>
                  </button>
                </div>
                <div class="itinerary-edit-btns">
                  <button
                    class="direction-btn down-btn"
                    on:click={() => {
                      movePlace({ day: dayIndex, place: placeIndex }, 1);
                    }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      version="1.1"
                      id="Capa_1"
                      x="0px"
                      y="0px"
                      width="512px"
                      height="512px"
                      viewBox="0 0 123.969 123.97"
                      style="enable-background:new 0 0 123.969 123.97;"
                      xml:space="preserve">
                      <g transform="matrix(1 0 0 -1 0 123.97)">
                        <g>
                          <path
                            d="M120.266,95.584c5.301-5.801,4.801-14.801-0.8-20.301l-47.3-47.4c-2.8-2.8-6.5-4.2-10.2-4.2s-7.399,1.4-10.2,4.2
                            l-47.299,47.3c-5.5,5.5-6.1,14.6-0.8,20.3c5.6,6.101,15.099,6.3,20.9,0.5l30.3-30.3c3.899-3.9,10.2-3.9,14.1,0l30.3,30.3
                            C105.167,101.883,114.667,101.684,120.266,95.584z"
                            data-original="#000000"
                            class=""
                            data-old_color="#000000"
                            fill="#1BA8F1" />
                        </g>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            {/if}
            {#if !userIsEditing}
              <div class="poi-point">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <circle cx="15" cy="15" r="10" fill="#1BA8F1" />
                  <circle cx="15" cy="15" r="14.5" stroke="#1BA8F1" />
                </svg>
              </div>
            {/if}
            {#if userIsEditing}
              <div class="place" style="border-left: none">
                <div class="place-img">
                  <img src={place.image} alt={place.name} />
                  <div class="poi-details">
                    <p class="labels poi-name">{place.name}</p>
                    <p class="labels poi-category-type">{place.category}</p>
                    <p class="labels poi-description">{place.description}</p>
                    <p class="labels poi-hours">
                      <b>Opening Hours:</b>
                      {place.openingTimes}
                    </p>
                    <div class="labels card-footer">
                      <p class="poi-rating-label">{place.ratings}</p>
                    </div>
                  </div>
                </div>
                <button
                  class="remove-place-btn"
                  on:click={() => removePlace({
                      day: dayIndex,
                      place: placeIndex
                    })}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="512px"
                    viewBox="1 1 511.99999 511.99999"
                    width="512px"
                    class="">
                    <g>
                      <path
                        d="m496 256c0 132.546875-107.453125 240-240
                        240s-240-107.453125-240-240 107.453125-240 240-240 240
                        107.453125 240 240zm0 0"
                        fill="#bddbff"
                        data-original="#BDDBFF"
                        class=""
                        style="fill:#E41A1A"
                        data-old_color="#bddbff" />
                      <g fill="#3d9ae2">
                        <path
                          d="m256 0c-141.382812 0-256 114.617188-256
                          256s114.617188 256 256 256 256-114.617188
                          256-256c-.167969-141.316406-114.683594-255.832031-256-256zm0
                          480c-123.710938
                          0-224-100.289062-224-224s100.289062-224 224-224 224
                          100.289062 224 224c-.132812 123.65625-100.34375
                          223.867188-224 224zm0 0"
                          data-original="#3D9AE2"
                          class="active-path"
                          data-old_color="#3D9AE2"
                          style="fill:#FFFFFF" />
                        <path
                          d="m380.449219
                          131.550781c-6.25-6.246093-16.378907-6.246093-22.625
                          0l-101.824219
                          101.824219-101.824219-101.824219c-6.136719-6.355469-16.269531-6.53125-22.625-.390625-6.355469
                          6.136719-6.53125 16.265625-.394531
                          22.621094.128906.132812.261719.265625.394531.394531l101.824219
                          101.824219-101.824219 101.824219c-6.355469
                          6.136719-6.53125 16.269531-.390625 22.625 6.136719
                          6.355469 16.265625 6.53125
                          22.621094.394531.132812-.128906.265625-.261719.394531-.394531l101.824219-101.824219
                          101.824219 101.824219c6.355469 6.136719 16.484375
                          5.960937 22.625-.394531 5.988281-6.199219
                          5.988281-16.03125 0-22.230469l-101.824219-101.824219
                          101.824219-101.824219c6.246093-6.246093
                          6.246093-16.375 0-22.625zm0 0"
                          data-original="#3D9AE2"
                          class="active-path"
                          data-old_color="#3D9AE2"
                          style="fill:#FFFFFF" />
                      </g>
                    </g>
                  </svg>
                </button>
              </div>
            {:else}
              <div class="place">
                <div class="place-img">
                  <img src={place.image} alt={place.name} />
                  <div class="poi-details">
                    <p class="labels poi-name">{place.name}</p>
                    <p class="labels poi-category-type">{place.category}</p>
                    <p class="labels poi-description">{place.description}</p>
                    <p class="labels poi-hours">
                      <b>Opening Hours:</b>
                      {place.openingTimes}
                    </p>
                    <div class="labels card-footer">
                      <p class="poi-rating-label">{place.ratings}</p>
                    </div>
                  </div>
                </div>
              </div>
            {/if}
          {/each}
        {/each}
      </div>
    </div>
  {:else}...Loading{/if}
</section>
