// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCqEIbeJPFSLZ3i1r3U99AYBc2Dg0cH2w",
  authDomain: "my-blog-site-ae27d.firebaseapp.com",
  projectId: "my-blog-site-ae27d",
  storageBucket: "my-blog-site-ae27d.firebasestorage.app",
  messagingSenderId: "749585084205",
  appId: "1:749585084205:web:a624957f212c2d79e82da4",
  measurementId: "G-QJ0X6VWN3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };