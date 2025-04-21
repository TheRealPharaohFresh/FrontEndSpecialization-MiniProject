import cartReducer, {
  addToCart,
  removeFromCart,
  clearCart,
  loadCartFromSession,
} from "../redux/cartSlice";
import { Product } from "../redux/cartSlice";
import { configureStore } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";

const initialCart: Product[] = [
  {
    id: "4", // ✅ now a string
    title: "Product D",
    description: "Description of Product D",
    price: 25,
    image: "image-url-4",
  },
];

describe("Cart Slice - Integration Test", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test("should load the cart from sessionStorage on store initialization", () => {
    sessionStorage.setItem("cart", JSON.stringify(initialCart));

    const store = configureStore({
      reducer: {
        cart: cartReducer,
      },
      preloadedState: {
        cart: {
          items: loadCartFromSession(), // ✅ uses the updated loader
        },
      },
    });

    const state = store.getState() as RootState;

    expect(state.cart.items).toEqual(initialCart); // ✅ Should now pass
  });

  test("should handle empty cart if no cart data in sessionStorage", () => {
    const store = configureStore({
      reducer: {
        cart: cartReducer,
      },
      preloadedState: {
        cart: {
          items: loadCartFromSession(),
        },
      },
    });

    const state = store.getState() as RootState;

    expect(state.cart.items).toEqual([]);
  });
});





