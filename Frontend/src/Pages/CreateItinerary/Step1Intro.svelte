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

  h1 {
    font-family: $body-text;
    font-style: normal;
    font-weight: 600;
    font-size: 1.75rem;
    line-height: 40px;
    letter-spacing: 0.1em;
  }

  h2 {
    font-family: $body-text;
    font-style: normal;
    font-weight: 300;
    font-size: 1.25rem;
    line-height: 25px;
    letter-spacing: 0.1em;
  }

  .intinerary-creator-title {
    margin-bottom: 5rem;

    @media screen and (max-width: $tablet-breakpoint) {
      display: flex;
      text-align: center;
      flex-direction: column;
    }
  }

  .start-itinerary-title-button {
    background-color: $blue;
    outline-color: $blue;
    color: $white;
    box-shadow: 0px 4px 4px $boxshadow-blue;
    width: 17rem;
    height: 3.5rem;
    margin: 2rem 0;
    border-radius: 0.75rem;
    font-family: $body-text;
    font-size: 1.75rem;
    box-shadow: none;
    cursor: pointer;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  .create-itinerary-button {
    @media screen and (max-width: $mobile-breakpoint) {
      display: flex;
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
  <div class="intinerary-creator-title">
    <h1>Build Your Own Holiday Itinerary</h1>
    <h2>Create an itinerary personalised to your own wants & needs.</h2>
  </div>
  <div class="itinerary-creator-field">
    <TextInputField title="Name your Itinerary:" />
  </div>
  <div class="create-itinerary-button">
    <a
      href="#/new-itinerary/where"
      class="start-itinerary-title-button primary-btn btn">
      Start
    </a>
  </div>
</section>
