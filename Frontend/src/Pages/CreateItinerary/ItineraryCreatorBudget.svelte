<script>
  import ItineraryCreatorHeader from "../../Components/ItineraryCreatorHeader.svelte";
  import TextInputField from "../../Components/TextInputField.svelte";

  export let destination = "";
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

  .itinerary-budget-content {
    font-family: $body-text;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 150%;
    letter-spacing: 0.1em;
    margin-bottom: 0.25rem;
  }

  .itinerary-budget-content-subtext {
    font-family: $body-text;
    font-style: normal;
    font-weight: 100;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0.1em;
    margin-top: 0;
  }

  .itinerary-creator-budget {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    @media screen and (min-width: $desktop-breakpoint) {
      width: 50%;
    }
  }

  .itinerary-creator-budget input[type="radio"] {
    width: 0;
    height: 0;
    opacity: 0;
  }

  .itinerary-creator-budget label {
    display: inline-block;
    background-color: transparent;
    color: $blue;
    border: 1px solid $blue;
    padding: 4px 11px;
    font-family: Arial;
    font-size: 16px;
    cursor: pointer;
    border-radius: 7px;
    font-family: $body-text;
    font-size: 1em;
    padding: 1rem 1.5rem;
    margin: 1rem;
  }

  .itinerary-creator-budget input:checked + label {
    background-color: $blue;
    color: $white;
  }
</style>

<section class="itinerary-steps">
  <!-- Add itinerary steps component -->
</section>
<section class="itinerary-creator-content">
  <div class="itinerary-creator-field">
    <div class="itinerary-title-field">
      <p class="itinerary-step-title">What is the budget per activity?</p>
      <p class="itinerary-place-title">To {destination}</p>
      <p class="itinerary-budget-content">
        *Pick the average price for an activity per person.
      </p>
      <p class="itinerary-budget-content-subtext">
        <i>
          Eg. Entrance Fees, Tours, Entertainment, Street Food & Drinks etc...
        </i>
      </p>
    </div>
  </div>

  <div class="itinerary-creator-budget">
    <input
      type="radio"
      name="budget"
      value="all"
      class="budget-high"
      id="all-budget"
      checked="checked" />
    <label for="all-budget">Include all cost range</label>
    <br />
    <input
      type="radio"
      name="budget"
      value="low"
      class="budget-low"
      id="low-budget" />
    <label for="low-budget">Low: Free - £20</label>
    <br />
    <input
      type="radio"
      name="budget"
      value="medium"
      class="budget-med"
      id="medium-budget" />
    <label for="medium-budget">Medium: £20 - £50</label>
    <br />
    <input
      type="radio"
      name="budget"
      value="high"
      class="budget-high"
      id="high-budget" />
    <label for="high-budget">High: £50++</label>
  </div>
</section>
