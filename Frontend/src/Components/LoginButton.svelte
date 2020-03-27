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
      })
      .catch(function(error) {
        // An error happened.
        console.error(error.code + ": " + error.message);
      });
  }
</script>

{#if $auth.isAuthenticated}
  <button on:click={signOut}>Sign Out</button>
{:else}
  <a href="/#/login">Login/Sign Up</a>
{/if}
