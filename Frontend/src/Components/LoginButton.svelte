<script>
  import { firebase } from "@firebase/app";
  import "@firebase/auth";

  import { auth } from "../stores.js";

  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        //do anything that you want to happen once a user signs out here
        location.replace(location.protocol + "//" + location.host + "/");
      })
      .catch(function(error) {
        // An error happened.
        console.error(error.code + ": " + error.message);
      });
  }
</script>

<style type="text/scss">
  @import "../styles/shared";

  .login-button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-btn {
    border: 1px solid black;
    border-radius: 7px;
    padding: 0.5rem 3rem;
    display: flex;
    align-items: center;
  }

  img {
    width: 25px;
    height: 25px;
    margin-right: 1rem;
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

  .authenticated-user {
    display: flex;
    flex-direction: column;

    a {
      text-align: center;
    }

    button {
      padding: 1rem 3rem;
      background-color: white;
      font-size: 1rem;
      margin-top: 2.5rem;
      width: 12rem;
      border: 1px solid black;
      border-radius: 7px;
    }
  }
</style>

{#if $auth.isAuthenticated}
  <div class="authenticated-user">
    <a href="/#/profile">
      <img src="./images/UserAccountMobile.png" alt="Click to login" />
      Profile
    </a>

    <button on:click={signOut} class="nav-item login-button">Sign Out</button>
  </div>
{:else}
  <a href="/#/login" class="login-btn">
    <img src="./images/UserAccountMobile.png" alt="Click to login" />
    Login/Sign Up
  </a>
{/if}
