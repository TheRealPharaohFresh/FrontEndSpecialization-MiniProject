// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth"; // Import getAuth and Auth
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTpMebEHepfEsSbXdBUU8NLp_-qJFU_5g",
  authDomain: "disco-demo-901f1.firebaseapp.com",
  projectId: "disco-demo-901f1",
  storageBucket: "disco-demo-901f1.firebasestorage.app",
  messagingSenderId: "756930515028",
  appId: "1:756930515028:web:abce3c1ebc823b7b7cddc1",
  measurementId: "G-0ZQP8ED1YZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app); // Initialize auth
const db = getFirestore(app)
// const analytics = getAnalytics(app);


export {auth}
export { db }