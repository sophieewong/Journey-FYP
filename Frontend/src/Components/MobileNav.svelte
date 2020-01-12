<script>
  import { slide } from "svelte/transition";

  let isNavigationOpen = false;
</script>

<style type="text/scss">
  @import "../styles/shared";

  .container {
    position: fixed;
    bottom: 1rem;
    right: 2rem;
    z-index: 2;

    @media screen and (min-width: $tablet-breakpoint) {
      display: none;
    }

    img {
      cursor: pointer;
    }
  }

  .navigation {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    background-color: $white;
    overflow: hidden;
    width: 100vw;
    height: 60vh;
    opacity: 1;
    display: block;

    ul {
      padding: 0;
    }
  }

  .nav-item {
    color: black;
    list-style: none;
    margin: 3rem 3rem;
    font-family: $body-text;
    cursor: pointer;
    display: flex;
    justify-content: center;

    :global(a) {
      text-decoration: none;
      color: black;
    }
  }

  .close-button {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
  }

  .login-button {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 25px;
      height: 25px;
      margin-right: 1rem;
    }
  }
</style>

<div class="container">
  <img
    on:click={() => (isNavigationOpen = true)}
    src="./images/MobileMenu.png"
    alt="Mobile Menu Button" />

  {#if isNavigationOpen}
    <nav class="navigation" transition:slide>
      <ul>
        <li class="nav-item">
          <a href="#/about">About Us</a>
        </li>
        <li class="nav-item">
          <a href="#/itineraries">Itinerary Planner</a>
        </li>
        <li class="nav-item login-button">
          <a href="#/login">
            <img src="./images/UserAccountMobile.png" alt="Click to login" />
            Login
          </a>
        </li>
      </ul>

      <img
        class="close-button"
        on:click={() => (isNavigationOpen = false)}
        src="./images/CloseBtn.png"
        alt="Cross to Close Menu" />
    </nav>
  {/if}
</div>
