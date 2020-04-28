<script>
  import { firebase } from "@firebase/app";
  import "@firebase/auth";

  import { auth } from "../stores.js";
  import {
    firebaseSignOut,
    firebaseDeleteUser,
    firebaseUpdateUser
  } from "../utils/authentication.js";
  import Header from "../Components/Header.svelte";
  import Tabs from "../Components/Tabs.svelte";
  import TextInputField from "../Components/TextInputField.svelte";
  import HeroBanner from "../Components/HeroBanner.svelte";

  let email = "";
  let password = "";
  let newpassword = "";
  let action = 0;
  let errorMessage;

  function signOut() {
    firebaseSignOut()
      .then(() => {
        //do anything that you want to happen once a user signs out here
        location.replace(location.protocol + "//" + location.host + "/");
      })
      .catch(error => {
        // An error happened.
        console.error(error.code + ": " + error.message);
      });
  }

  function updateProfile() {
    firebaseUpdateUser(email, newpassword);
  }

  function deleteProfile() {
    firebaseDeleteUser();
  }
</script>

<style type="text/scss">
  @import "../styles/shared";

  .headings {
    background-color: $blue;
    display: block;
    width: 100%;
  }

  .logout-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .profile-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .profile-fields {
    width: 25rem;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: $mobile-breakpoint) {
      width: 18rem;
    }
  }

  .update-btn {
    margin: 2rem 0;
  }

  .delete-btn {
    width: 25rem;

    @media screen and (max-width: $mobile-breakpoint) {
      width: 18rem;
    }

    button {
      margin-left: 0;
      margin-top: 0;

      color: red;
      border: 2px solid red;
      background-color: transparent;

      padding: 0.5rem 0.75rem;

      @media screen and (max-width: $mobile-breakpoint) {
        width: 60%;
      }

      &:hover {
        color: $white;
        background-color: red;
        transform: none;
      }
    }
  }

  .input-label {
    font-size: 18px;
    font-family: $body-text;
  }

  input {
    width: 100%;
    height: 3rem;
    background: #eeeeee;
    border-radius: 10px;
    font-size: 1.5rem;
    font-family: $body-text;
  }

  .profile-title {
    font-size: 24px;
    padding: 1rem 0 0 0;
  }

  .profile-field-title {
    border-bottom: 1.5px solid darkgrey;
    margin-bottom: 1rem;
  }

  .mobile-title {
    margin-top: 12px;
    font-size: 20px;

    @media screen and (min-width: $mobile-breakpoint) {
      display: none;
    }
  }
</style>

<section>
  <HeroBanner
    title="My Profile"
    image="./images/hero/essentials.jpg"
    showSearchBox={false} />
</section>

<section class="profile-content">
  <div class="logout-container">
    <button on:click={signOut} class="btn primary-btn login-button">
      Log Out
    </button>
  </div>
  <div class="mobile-title input-label">- or -</div>
  <div class="profile-fields">
    <div class="profile-field-title">
      <p class="input-label profile-title">Edit Profile</p>
    </div>
    <p class="input-label">Email</p>
    <input type="text" name="email" bind:value={email} />
    <p class="input-label">New Password</p>
    <input type="password" name="password" bind:value={newpassword} />
    <button on:click={updateProfile} class="btn primary-btn update-btn">
      Update
    </button>
  </div>
  <div class="delete-btn">
    <button on:click={deleteProfile} class="btn">Delete Account</button>
  </div>
</section>
