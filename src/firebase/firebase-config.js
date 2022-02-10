import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCH2C4s8npNZftXAcbQjEq5l81G2wmXwLk",
  authDomain: "react-app-curso-a4668.firebaseapp.com",
  projectId: "react-app-curso-a4668",
  storageBucket: "react-app-curso-a4668.appspot.com",
  messagingSenderId: "991814725521",
  appId: "1:991814725521:web:d8053c6dbb9153d16a7430",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
