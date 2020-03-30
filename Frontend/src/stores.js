import { readable } from "svelte/store";
import { firebase } from "@firebase/app";
import "@firebase/auth";

export const auth = readable(
  {
    isAuthenticated: true,
    user: null
  },
  set => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        set({
          isAuthenticated: true,
          user
        });
      } else {
        // No user is signed in.
        set({
          isAuthenticated: false,
          user: null
        });
      }
    });
  }
);
