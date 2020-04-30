<script>
  import { auth } from "../stores.js";
  import Logo from "../Components/Logo.svelte";
  import Navigation from "../Components/Navigation.svelte";
  import HeroBanner from "../Components/HeroBanner.svelte";
  import Tabs from "../Components/Tabs.svelte";
  import formatDateString from "../utils/formatDateString.js";

  let itineraries = {
    upcomingTrips: [],
    pastTrips: []
  };

  $: if (!$auth.isAuthenticated) {
    location.replace(location.protocol + "//" + location.host + "/#/about");
  } else {
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
        if (res.status !== 200) {
          throw new Error();
        }

        return res.json();
      })
      .then(data => {
        itineraries = data;
        console.log(data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  let activeTab = 0;
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
    margin-left: 6rem;
    margin-right: 6rem;
    margin-bottom: 3rem;

    @media screen and (max-width: $mobile-breakpoint) {
      margin-left: 3rem;
      margin-right: 3rem;
    }
  }

  .itineraries {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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
    padding: 1rem;
    margin: 10px;
    font-family: $body-text;
    cursor: pointer;

    &:hover {
      transform: scale(1.025);
      transition: transform 0.15s ease;
    }

    h4 {
      margin-bottom: 0.5rem;
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

  .itinerary-preview {
    text-decoration: none;
    width: 100%;
    max-width: 24rem;
    color: black;
  }

  .no-itinerary-msg {
    margin: 3rem auto;
    text-align: center;
    font-family: $body-text;
    font-size: 1.25rem;
  }
</style>

<section>
  <HeroBanner
    title="My Trips"
    image="./images/hero/ItineraryPlanner.jpg"
    showSearchBox={false} />
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
  {#if activeTab === 0}
    <div class="itineraries">
      {#each itineraries.upcomingTrips as { id, name, destination, duration, startDate, endDate }}
        <!--<TripPreview name location startDate endDate/>-->
        <a class="itinerary-preview" href="/#/itinerary?id={id}">
          <div class="itinerary active-itinerary">
            <h4>{name}</h4>
            <p class="destination-text">
              <img src="./images/destination.png" alt="Destination" />
              {destination}
            </p>
            <p class="time-label">
              <img src="./images/calendar.png" alt="Calender" />
              {formatDateString(startDate)} - {formatDateString(endDate)}
            </p>
            <p class="time-label">
              <img src="./images/clock.png" alt="Duration" />
              {duration} Days
            </p>
          </div>
        </a>
      {:else}
        <p class="no-itinerary-msg">
          No itineraries found 😔
          <br />
          Click on the Add Itinerary button to plan for your next adventure! 😉
        </p>
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
              {formatDateString(startDate)} - {formatDateString(endDate)}
            </p>
            <p class="time-label">
              <img src="./images/clock.png" alt="Duration" />
              {duration}
            </p>
          </div>
        </a>
      {:else}
        <p class="no-itinerary-msg">Sorry, no itineraries found 🙁</p>
      {/each}
    </div>
  {/if}
</section>
