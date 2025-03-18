import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { addToCart, removeFromCart, clearCart, Product } from "../redux/cartSlice";
import { RootState } from "../redux/store";

// Mock sessionStorage
const mockSessionStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "sessionStorage", {
  value: mockSessionStorage,
});

describe("Cart Slice - Integration Test", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    mockSessionStorage.clear();
  });

  test("should load the cart from sessionStorage on store initialization", () => {
    const initialCart: Product[] = [
      { id: 4, title: "Product D", description: "Description of Product D", price: 25, image: "image-url-4" },
    ];

   
    mockSessionStorage.setItem("cart", JSON.stringify(initialCart));

   
    jest.resetModules(); 
    const cartSlice = require("../redux/cartSlice").default;

    store = configureStore({
      reducer: {
        cart: cartSlice,
      },
    });

    const state = store.getState() as RootState;
    expect(state.cart.items).toEqual(initialCart);
  });

});





