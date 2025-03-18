import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
}


const loadCartFromSession = (): Product[] => {
    const savedCart = sessionStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
};


const saveCartToSession = (cart: Product[]) => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
};

interface CartState {
    items: Product[];
}

const initialState: CartState = {
    items: loadCartFromSession(), 
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            console.log("Add to cart", action.payload);
            state.items.push(action.payload);
            saveCartToSession(state.items); 
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            console.log("Remove from cart", action.payload);
            state.items = state.items.filter(item => item.id !== action.payload);
            saveCartToSession(state.items); 
        },
        clearCart: (state) => {
            console.log("Cart cleared");
            state.items = [];
            saveCartToSession(state.items);
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const selectCartItemsCount = (state: RootState) => state.cart.items.length;
export default cartSlice.reducer;
