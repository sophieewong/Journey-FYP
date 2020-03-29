<script>
  import { firebase } from "@firebase/app";
  import "@firebase/auth";

  import { auth } from "../stores.js";
  import Header from "../Components/Header.svelte";
  import LoginButton from "../Components/LoginButton.svelte";
</script>

<style type="text/scss">
  @import "../styles/shared";

  .headings {
    background-color: $blue;
    display: block;
    width: 100%;
  }

  .start-label {
    font-size: 2rem;
    font-family: $body-text;
    color: $white;
    cursor: default;
  }

  .app-overview {
    height: 20rem;
    padding-left: 6rem;
    padding-right: 6rem;

    @media screen and (max-width: $mobile-breakpoint) {
      padding-left: 3rem;
      padding-right: 3rem;
    }
  }

  .create-itinerary-account {
    height: 13rem;
    background-color: $boxshadow-blue;
    justify-content: center;
  }

  .create-itinerary-account {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .continue-btn {
    border: 2px solid $white;
    border-radius: 7px;
    padding: 0.5rem 2rem;
    display: flex;
    align-items: center;
    color: $white;
    font-family: $body-text;
    font-size: 1.5rem;
    text-decoration: none;

    &:hover {
      transform: scale(1.2);
      transition: transform 0.5s ease;
    }
  }
</style>

<section class="headings">
  <Header />
</section>

<section class="app-overview about-page">
  <p class="">About Journey</p>
  <p class="">How does it work?</p>
</section>

<section class="create-itinerary-account about-page">
  <p class="start-label">Build Memorable Journeys</p>
  <div class="authenticated-user">
    {#if $auth.isAuthenticated}
      <a href="/#/itineraries" class="continue-btn">Create Itineraries</a>
    {:else}
      <a href="/#/login" class="continue-btn">Let's get started</a>
    {/if}
  </div>
</section>
