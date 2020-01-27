<script>
  import Logo from "../Components/Logo.svelte";
  import Navigation from "../Components/Navigation.svelte";
  import HeroBanner from "../Components/HeroBanner.svelte";
  import Tabs from "../Components/Tabs.svelte";

  //This will eventually come from the backend as an api
  let data = {
    upcomingTrips: [
      {
        name: "CNY 2021",
        location: "Kuala Lumpur, Malaysia",
        duration: "14 Days",
        date: "25/1/2021 - 10/2/2021"
      }
    ],
    pastTrips: [
      {
        name: "York 2019",
        location: "york, United Kingdom",
        duration: "14 Days",
        date: "25/11/2019 - 10/12/2019"
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
    cursor: pointer;

    @media screen and (max-width: $mobile-breakpoint) {
      padding: 0 3rem;
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

<Tabs
  tabs={['Upcoming', 'Past']}
  {activeTab}
  onTabClicked={tab => (activeTab = tab)} />

<!-- create an upcoming array & a past array, return objects based on which tab is selected -->

{#if activeTab === 0}
  <div>
    {#each data.upcomingTrips as { name, location, duration, startDate, endDate }}
      <!--<TripPreview name location startDate endDate/>-->
      <h4>{name}</h4>
      <p>{location}</p>
      <p>{duration}</p>
    {:else}
      <p>No upcoming trips found :(</p>
    {/each}
  </div>
{/if}

{#if activeTab === 1}
  <div>
    {#each data.pastTrips as { name, location, duration, startDate, endDate }}
      <!--<TripPreview name location startDate endDate/>-->
      <h4>{name}</h4>
      <p>{location}</p>
      <p>{duration}</p>
    {:else}
      <p>No past trips found :(</p>
    {/each}
  </div>
{/if}
