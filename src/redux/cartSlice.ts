import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
}

export const loadCartFromSession = (): Product[] => {
    try {
      const stored = sessionStorage.getItem("cart");
      const parsed = stored ? JSON.parse(stored) : [];
      return parsed.map((item: any) => ({
        ...item,
        id: String(item.id),
      }));
    } catch (e) {
      console.error("Failed to load cart from sessionStorage", e);
      return [];
    }
  };
  

// Save cart to sessionStorage
const saveCartToSession = (cart: Product[]) => {
    try {
        sessionStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
        console.error("Error saving cart to sessionStorage:", error);
    }
};

interface CartState {
    items: Product[];
}

const initialState: CartState = {
    items: loadCartFromSession(), // Load cart from sessionStorage on store initialization
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            console.log("Adding to cart", action.payload);
            state.items.push(action.payload);
            saveCartToSession(state.items); // Persist the updated cart to sessionStorage
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            console.log("Removing from cart", action.payload);
            state.items = state.items.filter(item => item.id !== action.payload);
            saveCartToSession(state.items); // Persist the updated cart to sessionStorage
        },
        clearCart: (state) => {
            console.log("Clearing cart");
            state.items = [];
            saveCartToSession(state.items); // Persist the cleared cart to sessionStorage
        },
    },
});

// Selectors
export const selectCartItemsCount = (state: RootState) => state.cart.items.length;
export const selectCartItems = (state: RootState) => state.cart.items;

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions; // Export actions
export default cartSlice.reducer;



