import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCqSKZfdT5b14DZEyDmYCqab2pmRM3qcuY",
  authDomain: "e-commerce-bab72.firebaseapp.com",
  projectId: "e-commerce-bab72",
  storageBucket: "e-commerce-bab72.appspot.com",
  messagingSenderId: "75542672487",
  appId: "1:75542672487:web:505b8763ff3316339490c2",
  // database
  databaseURL: "https://e-commerce-bab72-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Get a reference to the database service
export const database = getDatabase(app);