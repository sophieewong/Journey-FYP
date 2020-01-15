<script>
  import Logo from "../Components/Logo.svelte";
  import Navigation from "../Components/Navigation.svelte";
  import HeroBanner from "../Components/HeroBanner.svelte";
  import ItinerariesTabs from "../Components/ItinerariesTabs.svelte";

  //import search box <input type="text" placeholder="Search" />
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
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
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
<section class="itineraries-lists">
  <ItinerariesTabs />
</section>
