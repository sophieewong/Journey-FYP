<script>
  import { firebase } from "@firebase/app";
  import "@firebase/auth";

  import { auth } from "../stores.js";
  import Header from "../Components/Header.svelte";
  import Tabs from "../Components/Tabs.svelte";
  import TextInputField from "../Components/TextInputField.svelte";

  let email = "";
  let password = "";
  let action = 0;
  let errorMessage;

  function signIn() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        if ($auth.isAuthenticated) {
          errorMessage = undefined;
          email = "";
          password = "";

          //redirect to relevant page
          location.replace(location.protocol + "//" + location.host + "/");
          console.log("We've signed in");
        }
      })
      .catch(function(error) {
        errorMessage = error.message;
        console.error(error.code + ": " + error.message);
      });
  }

  function signUp() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        errorMessage = error.message;
        console.error(error.code + ": " + error.message);
      });
  }

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

  .headings {
    background-color: $blue;
    display: block;
    width: 100%;
  }
</style>

<section class="headings">
  <Header />
</section>

<section>

  <button on:click={signOut} class="nav-item login-button">Sign Out</button>
</section>
