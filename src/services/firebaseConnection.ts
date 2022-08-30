// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0JQItNhVGODIrZ6vpI7IdRVUON5LKWbI",
  authDomain: "boardapp-79206.firebaseapp.com",
  projectId: "boardapp-79206",
  storageBucket: "boardapp-79206.appspot.com",
  messagingSenderId: "106113940512",
  appId: "1:106113940512:web:689cb08eee5b12a9b89045",
  measurementId: "G-N5Z5WNKC1Q"
};

// Initialize Firebase
const firebaseConnection = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebaseConnection;