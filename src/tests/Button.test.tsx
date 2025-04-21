import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { addToCart } from "../redux/cartSlice";
import ProductCard from "../components/ProductCard";

// i am creating a test store instance to test the component
const setupStore = () =>
  configureStore({
    reducer: { cart: cartReducer },
  });

describe("ProductCard Component", () => {
  let store: ReturnType<typeof setupStore>;

  beforeEach(() => {
    store = setupStore();
  });

  const renderWithRedux = (ui: React.ReactElement, store: ReturnType<typeof setupStore>) => {
    return render(<Provider store={store}>{ui}</Provider>);
  };

  test("dispatches addToCart action when 'Add to Cart' is clicked", () => {
    renderWithRedux(
      <ProductCard
        id={String(1)}
        title="Product A"
        description="Test description"
        price={10}
        imageUrl="test-image.jpg"
      />, 
      store
    );

   
    const addToCartButton = screen.getByText(/Add to Cart 🛒/i);
    fireEvent.click(addToCartButton);

   
    const state = store.getState();

    //this makes sure the item is added to the cart
    expect(state.cart.items.length).toBe(1);
    expect(state.cart.items[0]).toEqual({
      id: "1",
      title: "Product A",
      description: "Test description",
      price: 10,
      image: "test-image.jpg",
    });
  });
});

