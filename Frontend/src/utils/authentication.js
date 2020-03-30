import { firebase } from "@firebase/app";
import "@firebase/auth";

import { get } from "svelte/store";

import { auth } from "../stores.js";

export const firebaseSignIn = (email, password) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        if (get(auth).isAuthenticated) {
          location.replace(
            location.protocol + "//" + location.host + "/#/itineraries"
          );
          resolve();
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const firebaseSignOut = () => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        location.replace(location.protocol + "//" + location.host + "/");
        resolve();
      })
      .catch(error => {
        console.error(error.code + ": " + error.message);
        reject(error);
      });
  });
};

export const firebaseSignUp = (email, password) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        //Do whatever you want to happen after sucessful sign up here
        location.replace(
          location.protocol + "//" + location.host + "/#/itineraries"
        );

        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const firebaseDeleteUser = () => {
  return new Promise((resolve, reject) => {
    get(auth)
      .user.delete()
      .then(() => {
        // User deleted.
        location.replace(location.protocol + "//" + location.host + "/");

        resolve();
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const firebaseUpdateUser = (email, newPassword) => {
  return new Promise((resolve, reject) => {
    let promisedEmail = get(auth).user.updateEmail(email);
    let promisedPassword = get(auth).user.updatePassword(newPassword);

    Promise.all([promisedEmail, promisedPassword])
      .then(() => {
        resolve();
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};
