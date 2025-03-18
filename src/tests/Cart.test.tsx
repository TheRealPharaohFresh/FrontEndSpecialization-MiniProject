import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/cartSlice";
import ProductCard from "../components/ProductCard";
import type { RootState } from "../redux/store";


// Function to create a test store instance
const setupStore = () =>
  configureStore({
    reducer: { cart: cartReducer },
  });

describe("Cart Integration Test", () => {
  let store: ReturnType<typeof setupStore>;

  beforeEach(() => {
    store = setupStore();
  });

  const renderWithRedux = (ui: React.ReactElement, store: ReturnType<typeof setupStore>) => {
    return render(<Provider store={store}>{ui}</Provider>);
  };

  test("should add a product to the cart when 'Add to Cart' is clicked", () => {
    renderWithRedux(
      <ProductCard
        id={1}
        title="Product A"
        description="Description of Product A"
        price={10}
        imageUrl="image-url"
      />, store
    );

    // Click "Add to Cart"
    const addToCartButton = screen.getByText(/Add to Cart 🛒/i);
    fireEvent.click(addToCartButton);

    // Get updated cart state
    const state = store.getState();

    expect(state.cart.items.length).toBe(1);
    expect(state.cart.items[0]).toEqual({
      id: 1,
      title: "Product A",
      description: "Description of Product A",
      price: 10,
      image: "image-url",
    });
  });
});




