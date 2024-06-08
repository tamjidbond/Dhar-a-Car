// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpAIyUrzHZezu8dukyA-XUgMyDlDmHG-k",
  authDomain: "mrrental-94fe0.firebaseapp.com",
  projectId: "mrrental-94fe0",
  storageBucket: "mrrental-94fe0.appspot.com",
  messagingSenderId: "155270108188",
  appId: "1:155270108188:web:291ecbd086105b67b2fbd9",
  measurementId: "G-RV0C7Z6CQK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export default app;