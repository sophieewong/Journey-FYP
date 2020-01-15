<script>
  import { fade } from "svelte/transition";
  import Header from "../Components/Header.svelte";
</script>

<style type="text/scss">
  @import "../styles/shared";

  .overlay {
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    left: 0px;
    top: 0px;
    background-image: linear-gradient(
        0deg,
        rgba(21, 21, 21, 0.38),
        rgba(21, 21, 21, 0.38)
      ),
      url("https://images.unsplash.com/photo-1470089504205-f6ece216c2f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60");
  }

  .page-home-container {
    position: relative;
    align-items: center;
    text-align: center;
    padding: 0 1rem;

    @media screen and (min-width: $tablet-breakpoint) {
      padding: 0 5rem;
    }
  }

  .title-container {
    h1 {
      color: $white;
      font-family: $page-heading;
      font-weight: lighter;
      letter-spacing: 8px;
      font-size: 24px;
      margin: 0;
      text-align: center;
      line-height: 3rem;

      @media screen and (min-width: $desktop-breakpoint) {
        font-size: 2.75rem;
        line-height: 6rem;
      }
    }
  }

  .homepage-content {
    padding-top: 3rem;

    @media screen and (min-width: $desktop-breakpoint) {
      padding-top: 6rem;
    }
  }

  .centered-container {
    display: flex;
    justify-content: center;
  }

  .buttons-container {
    a {
      background-color: $blue;
      outline-color: $blue;
      color: $white;
      box-shadow: 0px 4px 4px $boxshadow-blue;
      width: 17rem;
      height: 3.5rem;
      margin: 1.5rem;
      border-radius: 0.75rem;
      font-family: $body-text;
      font-size: 1.25rem;
      box-shadow: none;
      cursor: pointer;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;

      &:hover {
        background-color: transparent;
        color: $blue;
        border: 1px solid $blue;
        border-radius: 10px;
        transition: transform 0.5s ease;
        transform: scale(1.1);
      }
    }
  }
</style>

<div class="overlay">
  <Header />
  <div class="page-home-container">
    <div class="homepage-content" in:fade={{ duration: 1500 }}>
      <div class="title-container centered-container">
        <h1>Create your next adventure that is uniquely tailored to you.</h1>
      </div>
      <div class="buttons-container centered-container">
        <a href="#/itineraries" class="primary-btn btn">Itinerary Planner</a>
      </div>
    </div>
  </div>
</div>
