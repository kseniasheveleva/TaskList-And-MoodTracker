import { initializeApp } from "firebase/app";

export class Firebase {
  constructor() {
    this._app = initializeApp({
      apiKey: import.meta.env.VITE_API_KEY,
      authDomain: "mooddy-project.firebaseapp.com",
      projectId: "mooddy-project",
      storageBucket: "mooddy-project.appspot.com",
      messagingSenderId: "600654768806",
      appId: "1:600654768806:web:4d27642f05220e0458e267"
    });
  }

  get app() {
    return this._app;
  }
}

export const firebaseService = new Firebase();