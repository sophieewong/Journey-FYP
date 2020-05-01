<script>
  export let itineraryTitle = "New Itinerary";
</script>

<style type="text/scss">
  @import "../styles/shared";

  p {
    font-family: $page-heading;
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.06em;
    margin-top: 1rem;
  }

  .itinerary-creator-header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.5rem 0;
    margin-right: 6rem;
    margin-left: 6rem;

    @media screen and (max-width: $desktop-breakpoint) {
      padding: 2rem 0;
      margin-right: 3rem;
      margin-left: 3rem;
    }
  }
</style>

<div class="itinerary-creator-header-container">
  <div class="itinerary-title-container">
    <p>{itineraryTitle}</p>
  </div>
  <div class="close-btn-container">
    <a href="#/itineraries">
      <img
        class="itinerary-creator-close-button"
        src="./images/CloseBtn.png"
        alt="Click to close Itinerary Creator" />
    </a>
  </div>
</div>
