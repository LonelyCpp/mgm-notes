import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  projectId: "mgm-notes",
  measurementId: "G-ECE7XMJCKM",
  messagingSenderId: "718274203567",
  storageBucket: "mgm-notes.appspot.com",
  authDomain: "mgm-notes.firebaseapp.com",
  databaseURL: "https://mgm-notes.firebaseio.com",
  apiKey: "AIzaSyD0l38iSQt3v6nSBUI0-uJq0GXSgniaKI4",
  appId: "1:718274203567:web:0267dc8ce74b18882fa95a",
};

firebase.initializeApp(firebaseConfig);
