// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth" // New import
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmINvpQDTBrE90Uw4DJjdsYxTX_GbP-Sk",
  authDomain: "syncy-75152.firebaseapp.com",
  projectId: "syncy-75152",
  storageBucket: "syncy-75152.appspot.com",
  messagingSenderId: "459890151231",
  appId: "1:459890151231:web:79e222e0b2ca5333e14d8a",
  measurementId: "G-8WVMDKNNNG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app)
export default app
