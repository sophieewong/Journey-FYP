<script>
  import ItineraryCreatorHeader from "../../Components/ItineraryCreatorHeader.svelte";
  import TextInputField from "../../Components/TextInputField.svelte";
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
</style>

<section class="itinerary-creator-header">
  <ItineraryCreatorHeader />
</section>
<section class="itinerary-steps">
  <!-- Add itinerary steps component -->
</section>
<section class="itinerary-creator-content">
  <div class="itinerary-creator-field">
    <TextInputField title="Where would you like to go?" />
  </div>
  <div class="create-itinerary-button">
    <a
      href="#/new-itinerary"
      class="start-itinerary-title-button primary-btn btn">
      Back
    </a>
  </div>
  <div class="create-itinerary-button">
    <a
      href="#/new-itinerary/when"
      class="start-itinerary-title-button primary-btn btn">
      Next
    </a>
  </div>
</section>
