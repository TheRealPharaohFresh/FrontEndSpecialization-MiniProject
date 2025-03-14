import { db } from "../config/firebaseConfig";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";

// Get all products
export const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Product List:', productList)
      return productList || []; 
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];  
    }
  };
  
  

export const fetchProductById = async (productId: string) => {
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);
    if (productSnap.exists()) {
      return { id: productSnap.id, ...productSnap.data() };
    } else {
      throw new Error("Product not found");
    }
  };
  
//   export const fetchProductsByCategory = async (category: string) => {
//     const querySnapshot = await getDocs(collection(db, "products"));
//     return querySnapshot.docs
//       .map(doc => ({ id: doc.id, ...doc.data() }))
//       .filter(product => product.category === category);
//   };
  
  export const createProduct = async (productData: { name: string; price: number; description: string; stock: number; category: string; imageUrl: string }) => {
    const productRef = await addDoc(collection(db, "products"), productData);
    return productRef.id;
  };
  

  export const updateProduct = async (productId: string, updatedData: Partial<{ name: string; price: number; description: string; stock: number; category: string; imageUrl: string }>) => {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, updatedData);
  };
  

  export const deleteProduct = async (productId: string) => {
  const productRef = doc(db, "products", productId);
  await deleteDoc(productRef);
};
