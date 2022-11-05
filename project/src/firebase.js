import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAMkaihJke4UKHxc6_Phhc0nARwumvJh6I",
  authDomain: "polytech-test-and-security.firebaseapp.com",
  databaseURL: "https://polytech-test-and-security.firebaseio.com",
  projectId: "polytech-test-and-security",
  storageBucket: "polytech-test-and-security.appspot.com",
  messagingSenderId: "433116583264",
  appId: "1:433116583264:web:37cd5b85c2b698a39aba05",
  measurementId: "G-2H5VG9F4J4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// export utils
export default { db, auth, storage };
