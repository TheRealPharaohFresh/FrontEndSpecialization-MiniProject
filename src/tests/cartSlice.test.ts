import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { addToCart, Product } from "../redux/cartSlice"; 
import { RootState } from "../redux/store";


const setupStore = () =>
  configureStore({
    reducer: { cart: cartReducer },
  });
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

beforeAll(() => {
  Object.defineProperty(window, "sessionStorage", {
    value: mockSessionStorage,
    configurable: true,
  });
});

describe("Cart Slice - Integration Test", () => {
  let store: ReturnType<typeof setupStore>;

  beforeEach(() => {
    store = setupStore();
    window.sessionStorage.clear();
  });

  test("should load the cart from sessionStorage on store initialization", () => {
    const initialCart: Product[] = [
      {
        id: "4",
        title: "Product D",
        description: "Description of Product D",
        price: 25,
        image: "image-url-4",
      },
    ];

    // Set sessionStorage BEFORE creating the store
    window.sessionStorage.setItem("cart", JSON.stringify(initialCart));

    // Create the store (this will trigger cartReducer's initial state logic)
    // const store = configureStore({
    //   reducer: {
    //     cart: cartReducer,
    //   },
    // });

    const state = store.getState() as RootState;

    console.log("Loaded cart from sessionStorage:", state.cart.items); // Debugging log

    // Assert that the cart was loaded correctly from sessionStorage
    expect(state.cart.items).toEqual(initialCart);
  });

  test("should handle empty cart if no cart data in sessionStorage", () => {
    // Create the store with no sessionStorage data set
    const store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });

    const state = store.getState() as RootState;

    // Assert that the cart is empty if no cart data in sessionStorage
    expect(state.cart.items).toEqual([]);
  });

  test("should persist cart to sessionStorage when adding a product", () => {
    const initialCart: Product[] = [
      {
        id: "1",
        title: "Product A",
        description: "Description of Product A",
        price: 20,
        image: "image-url-1",
      },
    ];

    // Set initial cart in sessionStorage
    window.sessionStorage.setItem("cart", JSON.stringify(initialCart));

    // Create the store
    const store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });

    // Dispatch an action to add a new product
    const newProduct: Product = {
      id: "2",
      title: "Product B",
      description: "Description of Product B",
      price: 30,
      image: "image-url-2",
    };

    store.dispatch(addToCart(newProduct)); // Correct action dispatch

    // Assert that the new cart is saved in sessionStorage
    const updatedCart = JSON.parse(window.sessionStorage.getItem("cart") as string);
    expect(updatedCart).toContainEqual(newProduct);
  });
});




