<script>
  import { firebase } from "@firebase/app";
  import "@firebase/auth";

  import { auth } from "../stores.js";

  let email = "";
  let password = "";

  let action = "login";

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
          // location.replace(location.protocol + "//" + location.host + "/");
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

<button on:click={() => (action = 'login')}>Login</button>
<button on:click={() => (action = 'signup')}>SignUp</button>

<!--Build a sign in form here-->
<input type="text" name="email" bind:value={email} />
<input type="password" name="password" bind:value={password} />

{#if action === 'login'}
  <button on:click={signIn}>Log In</button>
{:else}
  <button on:click={signUp}>Sign Up</button>
{/if}

{#if errorMessage}{errorMessage}{/if}
