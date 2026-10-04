import { db } from "../config/firebaseConfig";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc, query, where } from "firebase/firestore";

export interface ProductData {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  category: string;
  imageUrl: string;
}

// Get all products

export const fetchProducts = async (): Promise<ProductData[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    
    // If empty, seed it
    if (querySnapshot.empty) {
      console.log("No products found — seeding from API...");
      await seedProductsFromAPI();

      // Re-fetch after seeding
      const seededSnapshot = await getDocs(collection(db, "products"));
      return seededSnapshot.docs.map(document => ({ id: document.id, ...document.data() } as ProductData));
    }

    const productList = querySnapshot.docs.map(document => ({ id: document.id, ...document.data() } as ProductData));
    return productList || [];

  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

  
  

export const fetchProductById = async (productId: string): Promise<ProductData> => {
  const productRef = doc(db, "products", productId);
  const productSnap = await getDoc(productRef);
  if (productSnap.exists()) {
    return { id: productSnap.id, ...productSnap.data() } as ProductData;
  }
  throw new Error("Product not found");
};
  
export const fetchCategories = async (): Promise<string[]> => {
  const snapshot = await getDocs(collection(db, "products"));
  const categories = snapshot.docs
    .map(document => document.data().category)
    .filter((category): category is string => typeof category === "string");

  return [...new Set(categories)];
};

export const fetchProductsByCategory = async (category: string): Promise<ProductData[]> => {
  const productsQuery = query(collection(db, "products"), where("category", "==", category));
  const snapshot = await getDocs(productsQuery);
  return snapshot.docs.map(document => ({ id: document.id, ...document.data() } as ProductData));
};
  
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

    for (const product of products) {
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
