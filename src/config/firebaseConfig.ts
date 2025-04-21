// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTpMebEHepfEsSbXdBUU8NLp_-qJFU_5g",
  authDomain: "disco-demo-901f1.firebaseapp.com",
  projectId: "disco-demo-901f1",
  storageBucket: "disco-demo-901f1.firebasestorage.app",
  messagingSenderId: "756930515028",
  appId: "1:756930515028:web:abce3c1ebc823b7b7cddc1",
  measurementId: "G-0ZQP8ED1YZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app); // Initialize auth
const db = getFirestore(app); // Initialize Firestore

// Test Firestore connection
const testFirestoreConnection = async () => {
  try {
    const productsCollection = collection(db, "products"); // Get the reference to your "products" collection
    const snapshot = await getDocs(productsCollection); // Get the documents from the collection
    console.log("Firestore connection successful, data fetched:", snapshot.size); // snapshot.size returns the number of documents
  } catch (error) {
    console.error("Firestore connection failed:", error);
  }
};

// Run the test when Firebase initializes
testFirestoreConnection();

export { db, auth };
