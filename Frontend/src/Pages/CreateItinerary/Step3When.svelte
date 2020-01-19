<script>
  import ItineraryCreatorHeader from "../../Components/ItineraryCreatorHeader.svelte";
  import TextInputField from "../../Components/TextInputField.svelte";
  import ItineraryCreatorButtons from "../../Components/ItineraryCreatorButtons.svelte";
  import Datepicker from "../../External/Datepicker/Datepicker.svelte";

  let startDateSelected = new Date();
  let endDateSelected = new Date();
  let endDateChosen = false;

  $: if (!endDateChosen || endDateSelected < startDateSelected) {
    endDateSelected.setDate(startDateSelected.getDate() + 1);
    endDateSelected = endDateSelected;
  }
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
    <div class="itinerary-title-container">
      <p class="itinerary-step-title">When is the trip?</p>
    </div>
    <div class="itinerary-place-container">
      <p class="itinerary-place-title">To place</p>
    </div>
    <div class="start-date-container">
      <p>Start Date</p>
      <Datepicker
        start={new Date(2000, 1, 1)}
        end={new Date(2090, 12, 31)}
        format={'#{D} #{M} #{d} #{Y}'}
        bind:selected={startDateSelected} />
    </div>
    <div class="end-date-container">
      <p>End Date</p>
      <Datepicker
        start={startDateSelected}
        bind:selected={endDateSelected}
        bind:dateChosen={endDateChosen}
        end={new Date(2090, 12, 31)}
        format={'#{D} #{M} #{d} #{Y}'} />
    </div>
  </div>
  <ItineraryCreatorButtons
    prevPageLink={'#/new-itinerary/where'}
    nextPageLink={'#/new-itinerary/budget'} />
</section>
