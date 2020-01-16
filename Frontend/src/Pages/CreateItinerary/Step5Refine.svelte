<script>
  import ItineraryCreatorHeader from "../../Components/ItineraryCreatorHeader.svelte";
  import TextInputField from "../../Components/TextInputField.svelte";
  import ItineraryCreatorButtons from "../../Components/ItineraryCreatorButtons.svelte";
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
  }

  .itinerary-step-title {
    font-style: normal;
    font-weight: normal;
    font-size: 1.5rem;
    line-height: 27px;
    letter-spacing: 0.1em;
    font-family: $body-text;
  }
</style>

<section class="itinerary-creator-header">
  <ItineraryCreatorHeader />
</section>
<section class="itinerary-steps">
  <!-- Add itinerary steps component -->
</section>
<section class="itinerary-creator-content">
  <div class="itinerary-creator-field">
    <div class="itinerary-title-field">
      <p class="itinerary-step-title">Refine your itinerary.</p>
    </div>
  </div>
  <ItineraryCreatorButtons
    prevPageLink={'#/new-itinerary/budget'}
    nextPageLink={'#/new-itinerary/places'} />
</section>
