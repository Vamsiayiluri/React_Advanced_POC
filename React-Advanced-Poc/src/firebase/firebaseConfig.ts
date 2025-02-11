import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA9SuuR54iI9cGUJwrkf9iclIkN6ZR2Ykg",
    authDomain: "vuefire2-cc79f.firebaseapp.com",
    databaseURL: "https://vuefire2-cc79f-default-rtdb.firebaseio.com",
    projectId: "vuefire2-cc79f",
    storageBucket: "vuefire2-cc79f.appspot.com",
    messagingSenderId: "421623353489",
    appId: "1:421623353489:web:15ed19436b593c877aef30",
    measurementId: "G-KXK58VWQBT"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
