import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import cartReducer, { Product } from "../redux/cartSlice";
import CheckoutPage from "../pages/CheckOutPage";

jest.mock("../config/firebaseConfig", () => ({ auth: {}, db: {} }));
jest.mock("../services/orderServices", () => ({ createOrder: jest.fn() }));
jest.mock("firebase/auth", () => ({ getAuth: jest.fn() }));

const CurrentPath = () => {
    const location = useLocation();
    return <output data-testid="current-path">{location.pathname}</output>;
};

const renderCheckout = (items: Product[]) => {
    const store = configureStore({
        reducer: { cart: cartReducer },
        preloadedState: { cart: { items } },
    });

    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={["/checkout"]}>
                <CurrentPath />
                <Routes>
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/cart" element={<h1>Shopping Cart</h1>} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
};

describe("Checkout route", () => {
    test("returns to the cart when there are no items", () => {
        renderCheckout([]);

        expect(screen.getByTestId("current-path")).toHaveTextContent("/cart");
        expect(screen.getByRole("heading", { name: "Shopping Cart" })).toBeInTheDocument();
    });

    test("shows checkout after navigating with cart items", () => {
        renderCheckout([{
            id: "item-1",
            title: "A product",
            description: "A short description",
            price: 12.5,
            image: "image.jpg",
        }]);

        expect(screen.getByTestId("current-path")).toHaveTextContent("/checkout");
        expect(screen.getByRole("heading", { name: "Checkout" })).toBeInTheDocument();
    });
});