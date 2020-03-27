import { readable } from "svelte/store";

import { firebase } from "@firebase/app";
import "@firebase/auth";

export const auth = readable(
  {
    isAuthenticated: false,
    userId: "",
    authToken: ""
  },
  set => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        user.getIdToken(false).then(authToken => {
          set({
            isAuthenticated: true,
            userId: user.uid,
            authToken
          });
        });
      } else {
        // No user is signed in.
        set({
          isAuthenticated: false,
          userId: "",
          authToken: ""
        });
      }
    });
  }
);
