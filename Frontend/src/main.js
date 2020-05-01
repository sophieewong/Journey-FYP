import { firebase } from "@firebase/app";
import "@firebase/auth";

import { auth } from "./stores.js";

import App from "./App.svelte";

firebase.initializeApp({
  apiKey: "AIzaSyDkVWHkMptZNdZJyB6TPvvaPc8HPythjpQ",
  authDomain: "journey-fyp.firebaseapp.com",
  databaseURL: "https://journey-fyp.firebaseio.com",
  projectId: "journey-fyp",
  storageBucket: "journey-fyp.appspot.com",
  messagingSenderId: "235762750865",
  appId: "1:235762750865:web:9f6e38fa492abed04d3630"
});

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const app = new App({
  target: document.body,
  intro: true
});

export default app;
