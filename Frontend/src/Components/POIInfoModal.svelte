<script>
  import Modal from "./Modal.svelte";
  export let onClose;
  export let image;
  export let name;
  export let destination;
  export let category;
  export let description;
  export let openingHours = "";
  export let budget;
  export let ratings = "";
</script>

<style type="text/scss">
  @import "../styles/shared";

  .logo-container {
    display: flex;
    justify-content: center;

    .logo {
      margin: 3rem 0 2rem 0;

      @media screen and (min-width: $tablet-breakpoint) {
        margin: 5rem 0 2rem 0;
        width: 119px;
        height: 37px;
      }
    }
  }

  .hero-title {
    color: $white;
    padding-bottom: 5rem;
    padding-top: 5rem;
    display: flex;
    justify-content: center;
    font-family: $body-text;
    font-weight: 100;
    font-size: 1.75em;
    text-align: center;
    line-height: 2.5rem;
  }

  hr {
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }

  .POI-contents {
    padding: 0.5rem 0;
    margin-right: 6rem;
    margin-left: 6rem;
    font-family: $description;
    font-size: 1.2rem;

    @media screen and (max-width: $desktop-breakpoint) {
      padding: 0.25rem 0;
      margin-right: 2.5rem;
      margin-left: 2.5rem;
    }
  }

  .category {
    font-style: italic;
    margin-top: 0;
  }

  .description {
    margin: 2rem 0;
  }

  .ratings {
    margin-bottom: 3rem;
  }

  .close-popup {
    position: absolute;
    width: 10px;
    height: 10px;
    top: 20px;
    right: 65px;
    cursor: pointer;
    background: none;
    border: none;
    @media screen and (max-width: $mobile-breakpoint) {
      height: 25px;
      width: 25px;
      right: 40px;
    }

    img {
      height: 40px;
      width: 40px;

      @media screen and (max-width: $mobile-breakpoint) {
        height: 25px;
        width: 25px;
      }
    }
  }
</style>

<Modal title={name} {onClose}>
  <section>
    <header>
      <div class="close-btn-container">
        <button on:click={onClose} class="close-popup">
          <img
            class="itinerary-creator-close-button"
            src="./images/close-white.png"
            alt="Click to close {name} information popup box." />
        </button>
      </div>
      <div
        class="hero-banner"
        style="background: linear-gradient(0deg, rgba(21, 21, 21, 0.38),
        rgba(21, 21, 21, 0.38)),url({image}); background-size: cover;
        background-position: center; background-repeat: no-repeat; left: 0px;
        top: 0px;">
        <div class="centered-container logo-container">
          <!-- <img class="logo" src="./images/JourneyLogo.png" alt="Journey Logo" /> -->
        </div>
        <div class="page-hero">
          <h2 class="hero-title">{name}</h2>
        </div>
      </div>
    </header>

    <div class="POI-contents">
      <p class="category">{category}</p>
      <hr />
      <p class="description">{description}</p>
      <p class="opening-hours">
        <b>Opeing Hours:</b>
        {openingHours}
      </p>
      <p class="budget">
        <b>Budget:</b>
        {budget}
      </p>
      <p class="ratings">
        <b>Ratings:</b>
        {ratings}
      </p>
    </div>
  </section>

</Modal>
