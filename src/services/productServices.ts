import { db } from "../config/firebaseConfig";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";

// Get all products

export const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    
    // If empty, seed it
    if (querySnapshot.empty) {
      console.log("No products found — seeding from API...");
      await seedProductsFromAPI();

      // Re-fetch after seeding
      const seededSnapshot = await getDocs(collection(db, "products"));
      return seededSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
  
  // export const fetchProductsByCategory = async (category: string) => {
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

// Seed products from an external API (e.g., Fake Store API)
export const seedProductsFromAPI = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();

    for (let product of products) {
      await addDoc(collection(db, "products"), {
        name: product.title,
        description: product.description,
        price: product.price,
        imageUrl: product.image,
        stock: product.rating?.count || 10,
        category: product.category || "Uncategorized",
        syncedFromAPI: true,
      });
    }

    console.log("Products seeded successfully.");
  } catch (error) {
    console.error("Error seeding products from API:", error);
  }
};
