<script>
  import { onMount, onDestroy } from "svelte";
  import flatpickr from "flatpickr";
  import {
    currentItineraryDestination,
    currentItineraryStartDate,
    currentItineraryEndDate
  } from "../../stores";
  import ItineraryCreatorHeader from "../../Components/ItineraryCreatorHeader.svelte";
  import TextInputField from "../../Components/TextInputField.svelte";
  import Datepicker from "../../External/Datepicker/Datepicker.svelte";

  //The actual date objects
  let endDate = $currentItineraryEndDate;

  //HTML elements
  let startDateInput;
  let endDateInput;

  //The flatpickr instances
  let startDatePicker;
  let endDatePicker;

  onMount(() => {
    startDatePicker = flatpickr(startDateInput, {
      enableTime: false,
      dateFormat: "D M d Y",
      defaultDate: $currentItineraryStartDate,
      minDate: $currentItineraryStartDate,
      onChange: ([date]) => {
        currentItineraryStartDate.set(date);

        endDatePicker.set("minDate", $currentItineraryStartDate);

        if ($currentItineraryEndDate < $currentItineraryStartDate) {
          endDatePicker.setDate($currentItineraryStartDate);
        }
      }
    });

    endDatePicker = flatpickr(endDateInput, {
      enableTime: false,
      defaultHour: 9,
      dateFormat: "D M d Y",
      defaultDate: $currentItineraryEndDate,
      minDate: $currentItineraryStartDate,
      onChange: ([date]) => currentItineraryEndDate.set(date)
    });
  });

  onDestroy(() => {
    startDatePicker.destroy();
    endDatePicker.destroy();
  });
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

  .itinerary-place-title {
    font-family: $body-text;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    letter-spacing: 0.1em;
  }

  .date-picker-title {
    font-family: $body-text;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 150%;
    letter-spacing: 0.1em;
  }
</style>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css" />
</svelte:head>

<section class="itinerary-steps">
  <!-- Add itinerary steps component -->
</section>
<section class="itinerary-creator-content">
  <div class="itinerary-creator-field">
    <div class="itinerary-title-container">
      <p class="itinerary-step-title">When is the trip?</p>
    </div>
    <div class="itinerary-place-container">
      <p class="itinerary-place-title">To {$currentItineraryDestination}</p>
    </div>
    <div class="start-date-container">
      <p class="date-picker-title">Start Date</p>
      <input type="text" bind:this={startDateInput} />
    </div>
    <div class="end-date-container">
      <p class="date-picker-title">End Date</p>
      <input type="text" bind:this={endDateInput} />
    </div>
  </div>
</section>
