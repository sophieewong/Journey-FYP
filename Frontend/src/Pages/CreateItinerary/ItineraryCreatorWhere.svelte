<script>
  import {currentItineraryDestination} from "../../stores";
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

<section class="itinerary-steps">
  <!-- Add itinerary steps component -->
</section>
<section class="itinerary-creator-content">

  <!--create datalist Input Field component-->
  <div class="itinerary-creator-field">
    <TextInputField
      list="cities-input"
      title="Where is your next city destination?"
      bind:value={$currentItineraryDestination} />

    <datalist id="cities-input">
      <option value="Nottingham" />
      <option value="Leeds" />
      <option value="London" />
      <option value="Leicester" />
      <option value="York" />
      <option value="Cambridge" />
      <option value="Cardiff" />
      <option value="Bristol" />
      <option value="Singapore" />
      <option value="NYC" />
      <option value="Texas" />
      <option value="Boston" />
      <option value="Los Angeles" />
      <option value="Jakarta" />
      <option value="Bath" />
      <option value="Beijing" />
      <option value="Rome" />
    </datalist>

  </div>
</section>
