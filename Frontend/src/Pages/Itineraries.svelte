<script>
  import Logo from "../Components/Logo.svelte";
  import Navigation from "../Components/Navigation.svelte";
  import HeroBanner from "../Components/HeroBanner.svelte";
  import Tabs from "../Components/Tabs.svelte";

  //This will eventually come from the backend as an api
  let data = {
    upcomingTrips: [
      {
        name: "Eid 2020",
        location: "Johor, Malaysia",
        date: "25/4/2020 - 10/5/2020",
        duration: "15 Days"
      },
      {
        name: "Graduation Trip 2020",
        location: "Paris, France",
        date: "25/6/2020 - 19/7/2020",
        duration: "21 Days"
      },
      {
        name: "Christmas 2020",
        location: "Bradford, United Kingdom",
        date: "25/12/2020 - 1/1/2021",
        duration: "7 Days"
      },
      {
        name: "CNY 2021",
        location: "Kuala Lumpur, Malaysia",
        date: "25/1/2021 - 10/2/2021",
        duration: "14 Days"
      }
    ],
    pastTrips: [
      {
        name: "York 2019",
        location: "York, United Kingdom",
        date: "25/11/2019 - 10/12/2019",
        duration: "8 Days"
      }
    ]
  };

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

  .itinerary {
    border: $blue 2px solid;
    box-shadow: 0px 4px 4px $boxshadow-blue;
    border-radius: 11px;
    margin-bottom: 2rem;
    padding: 1rem;
    margin: 10px;
    width: 100%;
    font-family: $body-text;
    cursor: pointer;

    h4 {
      margin-bottom: 0.5rem;
    }

    @media screen and (min-width: $sm-tablet-breakpoint) {
      max-width: 20rem;
    }

    @media screen and (min-width: $desktop-breakpoint) {
      max-width: 13rem;
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

  {#if activeTab === 0}
    <div class="itineraries">
      {#each data.upcomingTrips as { name, location, duration, startDate, endDate }}
        <!--<TripPreview name location startDate endDate/>-->
        <div class="itinerary">
          <h4>{name}</h4>
          <p>{location}</p>
          <p>25/1/2021 - 10/2/2021</p>
          <p>{duration}</p>
        </div>
      {:else}
        <p>No upcoming trips found :(</p>
      {/each}
    </div>
  {/if}

  {#if activeTab === 1}
    <div class="itineraries">
      {#each data.pastTrips as { name, location, duration, startDate, endDate }}
        <!--<TripPreview name location startDate endDate/>-->
        <div class="itinerary">
          <h4>{name}</h4>
          <p>{location}</p>
          <p>25/11/2019 - 10/12/2019</p>
          <p>{duration}</p>
        </div>
      {:else}
        <p>No past trips found :(</p>
      {/each}
    </div>
  {/if}

</section>
