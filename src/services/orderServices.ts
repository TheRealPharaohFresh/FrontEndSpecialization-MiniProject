import { db } from "../config/firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export const createOrder = async (userId: string, orderData: any) => {
  const docRef = await addDoc(collection(db, "orders"), { userId, ...orderData, createdAt: new Date() });
  return docRef.id;
};


export const fetchOrdersByUser = async (userId: string) => {
  const q = query(collection(db, "orders"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
