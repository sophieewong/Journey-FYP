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
          location.replace(
            location.protocol + "//" + location.host + "/#/itineraries"
          );
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
</script>

<style type="text/scss">
  @import "../styles/shared";

  .sign-in-page {
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
      url("https://images.unsplash.com/photo-1530346495805-686aaaa787a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=625&q=80");
  }
  .fields-div {
    @media screen and (min-width: $tablet-breakpoint) {
      padding-bottom: 2rem;
    }
  }

  .fields-container {
    display: flex;
    flex-direction: column;
    justify-content: start;
    background-color: $white;
    padding: 2rem;
    margin: 0 auto;
    height: 450px;

    @media screen and (min-width: $tablet-breakpoint) {
      width: 23rem;
      background-color: $white;
      box-shadow: -4px 2em 7.5em rgba(0, 0, 0, 0.33);
    }
  }

  .welcome-label {
    margin-top: -15px;
    font-size: 24px;
    margin-bottom: 10px;
  }

  .welcome-label-intro {
    font-size: 18px;
    color: #7b7d7b;
    margin: 0;
  }

  p {
    font-family: $body-text;
    font-size: 20px;
  }

  button {
    width: 50%;
    margin-bottom: 0 !important;
    margin-left: 0 !important;
  }

  .headings {
    background-color: $blue;
    display: block;
    width: 100%;
  }

  input {
    width: 23rem;
    height: 3rem;
    background: #eeeeee;
    border-radius: 10px;
    font-size: 1.5rem;
    font-family: $body-text;

    @media screen and (max-width: $tablet-breakpoint) {
      width: 100%;
    }
  }
</style>

<section class="sign-in-page">
  <Header />

  <div class="fields-div">
    <div class="fields-container">
      <Tabs
        tabs={['Login', 'Sign Up']}
        onTabClicked={tab => {
          action = tab;
        }} />

      {#if action === 0}
        <p class="welcome-label">
          Welcome Back Traveller!
          <span role="img" aria-label="Airplane">✈️</span>
        </p>

        <!--Build a sign in form here-->
        <p class="input-label">Email</p>
        <input type="text" name="email" bind:value={email} />
        <p class="input-label">Password</p>
        <input type="password" name="password" bind:value={password} />

        <!-- <TextInputField title="Email" />
        <TextInputField title="Password" /> -->

        <button on:click={signIn} class="btn primary-btn">Login</button>
      {:else}
        <p class="welcome-label">
          Welcome Traveller!
          <span role="img" aria-label="Airplane">👋</span>
        </p>
        <p class="welcome-label-intro">
          Create an account to start creating memorable journeys.
        </p>

        <!--Build a sign in form here-->
        <p class="input-label">Email</p>
        <input type="text" name="email" bind:value={email} />
        <p class="input-label">Password</p>
        <input type="password" name="password" bind:value={password} />
        <button on:click={signUp} class="btn primary-btn">Sign Up</button>
      {/if}

      {#if errorMessage}
        <p class="warning-text">{errorMessage}</p>
      {/if}
    </div>
  </div>
</section>
