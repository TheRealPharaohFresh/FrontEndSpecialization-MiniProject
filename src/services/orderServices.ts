import { db } from "../config/firebaseConfig";
import { collection, addDoc, getDocs, query, where, Timestamp } from "firebase/firestore";

export interface OrderData {
  userId: string;
  products: Array<{ id: string; title: string; price: number; quantity: number; image: string }>;
  totalPrice: number;
  createdAt: Date;
}

export interface OrderRecord extends Omit<OrderData, "createdAt"> {
  id: string;
  createdAt: Timestamp;
}

export const createOrder = async (userId: string, orderData: Omit<OrderData, "userId">): Promise<string> => {
  const docRef = await addDoc(collection(db, "orders"), { userId, ...orderData, createdAt: new Date() });
  return docRef.id;
};


export const fetchOrdersByUser = async (userId: string): Promise<OrderRecord[]> => {
  const q = query(collection(db, "orders"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((document) => ({ id: document.id, ...document.data() } as OrderRecord));
};
