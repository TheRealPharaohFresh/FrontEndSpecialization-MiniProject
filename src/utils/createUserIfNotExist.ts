import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export const createUserIfNotExists = async (user) => {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      role: 'user',
      createdAt: new Date(),
    });
    console.log("User document created!");
  } else {
    console.log("User already exists.");
  }
};
