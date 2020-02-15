<script>
  import TextInputField from "../../Components/TextInputField.svelte";

  export let onNextStep;
  let name = "";
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
    margin-bottom: 3rem;

    @media screen and (max-width: $tablet-breakpoint) {
      display: flex;
      text-align: center;
      flex-direction: column;
    }
  }

  .start-itinerary-title-button {
    font-size: 1.75rem;
    margin-left: 0;
    width: 17rem;

    @media screen and (max-width: $mobile-breakpoint) {
      margin-right: 0;
      width: 100%;
    }

    &:disabled {
      background-color: $grey;
      outline-color: $grey;
      color: $white;
      box-shadow: 0px 4px 4px $grey;
      transition: none;
      transform: none;
      cursor: not-allowed;
    }
  }

  .create-itinerary-button {
    @media screen and (max-width: $mobile-breakpoint) {
      display: flex;
      justify-content: center;
    }
  }
</style>

<section class="itinerary-creator-content">
  <div class="intinerary-creator-title">
    <h1>Build Your Own Holiday Itinerary</h1>
    <h2>Create an itinerary personalised to your own wants & needs.</h2>
  </div>
  <div class="itinerary-creator-field">
    <TextInputField title="Name your Itinerary:" bind:value={name} />
  </div>
  <div class="create-itinerary-button">
    <button
      on:click={() => onNextStep(name)}
      class="start-itinerary-title-button primary-btn btn"
      disabled={!name}>
      Start
    </button>
  </div>
</section>
