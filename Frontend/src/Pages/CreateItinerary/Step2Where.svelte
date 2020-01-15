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

  .buttons {
    display: flex;
    bottom: 0;
    position: fixed;
    margin-bottom: 4rem;

    @media screen and (max-width: $mobile-breakpoint) {
      flex-direction: column;
      justify-content: center;
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
    <TextInputField title="Where is your next city destination?" />
  </div>
  <ItineraryCreatorButtons
    prevPageLink={'#/new-itinerary'}
    nextPageLink={'#/new-itinerary/when'} />
</section>
