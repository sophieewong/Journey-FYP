<script>
  import { auth } from "../stores.js";
  import Logo from "../Components/Logo.svelte";
  import Navigation from "../Components/Navigation.svelte";
  import HeroBanner from "../Components/HeroBanner.svelte";
  import Tabs from "../Components/Tabs.svelte";

let itineraries = {
  upcomingTrips: [],
  pastTrips: []
}
let userHasItineraries = false;

      fetch("/api/itinerary/getAll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: $auth.user.uid
      })
    })
      .then(res => {
        if (res.status !== 400) {
          userHasItineraries = true;
          return res.json();
        }
      })
      .then(data => {
        itineraries = data;
        console.log(data);
      })
      .catch(err => {
        console.error(err);
      });

  let activeTab = 0;

  $: if (!$auth.isAuthenticated) {
    location.replace(location.protocol + "//" + location.host + "/#/about");
  }
</script>

<style type="text/scss">
  @import "../styles/shared";

  .planner-btn-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      margin-right: 6rem;

      @media screen and (max-width: $mobile-breakpoint) {
        margin: 0 auto;
      }

      &:hover {
        transition: transform 0.5s ease;
        transform: scale(1.1);
      }
    }
  }

  .itinerary-creator-button {
    display: block;
    margin-top: 1rem;
    margin-bottom: 1rem;

    @media screen and (max-width: $mobile-breakpoint) {
      padding: 1rem 3rem;
    }

    a {
      cursor: pointer;
    }
  }

  .created-itineraries {
    padding-left: 6rem;
    padding-right: 6rem;
    margin-bottom: 3rem;

    @media screen and (max-width: $mobile-breakpoint) {
      padding-left: 3rem;
      padding-right: 3rem;
    }
  }

  .itineraries {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

    @media screen and (min-width: $desktop-breakpoint) {
      justify-content: space-between;
    }
  }

  .active-itinerary {
    border-top: $blue 8px solid;
  }

  .past-itinerary {
    border-top: $grey 8px solid;
  }

  .itinerary {
    box-shadow: 0px 4px 4px #8c8c8c;
    border-radius: 11px;
    margin-bottom: 2rem;
    padding: 1rem;
    margin: 10px;
    width: 100%;
    font-family: $body-text;
    cursor: pointer;

    &:hover {
      transform: scale(1.025);
      transition: transform 0.15s ease;
    }

    h4 {
      margin-bottom: 0.5rem;
    }

    @media screen and (min-width: $sm-tablet-breakpoint) {
      max-width: 20rem;
    }

    @media screen and (min-width: $desktop-breakpoint) {
      max-width: 13rem;
    }

    img {
      width: 1rem;
      height: 1rem;
      margin-right: 0.5rem;
    }

    .destination-text {
      color: #8c8c8c;
    }

    .time-label {
      font-weight: 300;
    }
  }
</style>

<section>
  <HeroBanner
    title="My Trips"
    image="./images/hero/ItineraryPlanner.jpg"
    showSearchBox={true} />
</section>
<section class="itinerary-creator-button">
  <div class="planner-btn-container">
    <a href="#/new-itinerary" class="primary-btn btn">+ Add Itinerary</a>
  </div>
</section>

<section class="created-itineraries">
  <Tabs
    tabs={['Upcoming', 'Past']}
    {activeTab}
    onTabClicked={tab => (activeTab = tab)} />

  <!-- create an upcoming array & a past array, return objects based on which tab is selected -->
{#if userHasItineraries}
  {#if activeTab === 0}
    <div class="itineraries">
      {#each itineraries.upcomingTrips as {id, name, destination, duration, startDate, endDate }}
        <!--<TripPreview name location startDate endDate/>-->
        <a href="/#/itinerary?id={id}">
        <div class="itinerary active-itinerary">
          <h4>{name}</h4>
          <p class="destination-text">
            <img src="./images/destination.png" alt="Destination" />
            {destination}
          </p>
          <p class="time-label">
            <img src="./images/calendar.png" alt="Calender" />
            {startDate.substring(0, startDate.indexOf('T')).replace(/-/g, '/')} - {endDate.substring(0, endDate.indexOf('T')).replace(/-/g, '/')}
          </p>
          <p class="time-label">
            <img src="./images/clock.png" alt="Duration" />
            {duration} Days
          </p>
        </div></a>
      {:else}
        <p>No upcoming trips found :(</p>
      {/each}
    </div>
  {/if}


  {#if activeTab === 1}
    <div class="itineraries">
      {#each itineraries.pastTrips as { id, name, destination, duration, startDate, endDate }}
        <!--<TripPreview name destination startDate endDate/>-->
        <a href="/#/itinerary?id={id}">
        <div class="itinerary past-itinerary">
          <h4>{name}</h4>
          <p class="destination-text">
            <img src="./images/destination.png" alt="Destination" />
            {destination}
          </p>
          <p class="time-label">
            <img src="./images/calendar.png" alt="Calender" />
            25/1/2021 - 10/2/2021
          </p>
          <p class="time-label">
            <img src="./images/clock.png" alt="Duration" />
            {duration}
          </p>
        </div>
        </a>
      {:else}
        <p>No past trips found :(</p>
      {/each}
    </div>
  {/if}
{/if}
</section>