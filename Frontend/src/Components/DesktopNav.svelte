<script>
  import { firebase } from "@firebase/app";
  import "@firebase/auth";

  import { auth } from "../stores.js";
</script>

<style type="text/scss">
  @import "../styles/shared";

  .component-desktop-navigation {
    margin-top: 1rem;
    width: 100%;

    ul {
      color: $white;
      font-family: $body-text;
      font-weight: 100;
      font-size: 1.25rem;
      display: flex;
      justify-content: flex-end;
      margin: 0;

      :hover {
        transform: scale(1.2);
        transition: transform 0.5s ease;
      }

      li {
        margin: 1rem 1.5rem;
        line-height: 1.5rem;
        cursor: pointer;
        list-style-type: none;
        text-align: center;

        :global(a) {
          text-decoration: none;
          color: $white;
        }

        .component-desktop-navigation-login-button {
          width: 30px;
          height: 30px;
        }
      }
    }

    @media screen and (max-width: $tablet-breakpoint) {
      display: none;
    }

    .dekstop-nav-login-btn {
      margin-top: 0.5rem;
    }
  }
</style>

<nav class="component-desktop-navigation">
  <ul>
    <li>
      <a href="#/about">About Us</a>
    </li>
    <li>
      <a href="#/itineraries">Itinerary Planner</a>
    </li>
    <li class="dekstop-nav-login-btn">
      <!-- <a href="#/login">
        <img
          class="component-desktop-navigation-login-button"
          src="./images/UserAccount.png"
          alt="Click to login" />
      </a> -->

      {#if $auth.isAuthenticated}
        <a href="#/profile">
          <img
            class="component-desktop-navigation-login-button"
            src="./images/UserAccount.png"
            alt="Go to profile" />
        </a>
      {:else}
        <a href="/#/login" class="login-btn">
          <img
            class="component-desktop-navigation-login-button"
            src="./images/UserAccount.png"
            alt="Click to login or sign up" />
        </a>
      {/if}

    </li>
  </ul>
</nav>
