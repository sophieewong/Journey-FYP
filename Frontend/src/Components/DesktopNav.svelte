<script>
  import { Link } from "svelte-routing";
</script>

<style type="text/scss">
  @import "../styles/shared";

  .component-desktop-navigation {
    margin-top: 3rem;
    width: 100%;

    ul {
      color: $white;
      font-family: $body-text;
      font-weight: 100;
      font-size: 1.25rem;
      display: flex;
      justify-content: flex-end;
      margin: 0;

      li {
        margin: 1rem;
        line-height: 1.5rem;
        cursor: pointer;
        list-style-type: none;

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
  }
</style>

<nav class="component-desktop-navigation">
  <ul>
    <li>
      <Link to="/about">About Us</Link>
    </li>
    <li>
      <Link to="/itinerary-planner">Itinerary Planner</Link>
    </li>
    <li>
      <Link to="/login">
        <img
          class="component-desktop-navigation-login-button"
          src="./images/UserAccount.png"
          alt="Click to login" />
      </Link>
    </li>
  </ul>
</nav>
