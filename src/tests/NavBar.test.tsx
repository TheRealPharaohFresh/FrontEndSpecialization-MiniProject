import { fireEvent, render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter, useLocation } from "react-router-dom";
import cartReducer from "../redux/cartSlice";
import NavBar from "../components/NavBar";

jest.mock("../config/firebaseConfig", () => ({ auth: {} }));
jest.mock("../assets/logo.jpg", () => "logo.jpg");
jest.mock("firebase/auth", () => ({
    onAuthStateChanged: (_auth: unknown, callback: (user: null) => void) => {
        callback(null);
        return jest.fn();
    },
    signOut: jest.fn(),
}));

const CurrentPath = () => {
    const location = useLocation();
    return <output data-testid="current-path">{location.pathname}</output>;
};

describe("NavBar navigation", () => {
    test.each([
        ["Home", "/"],
        ["Cart (0)", "/cart"],
        ["Product Management", "/product-management"],
        ["Order History", "/orders"],
        ["Login", "/login"],
    ])("navigates to %s without a document reload", (label, path) => {
        const store = configureStore({ reducer: { cart: cartReducer } });

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/"]}>
                    <NavBar />
                    <CurrentPath />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByRole("link", { name: label }));

        expect(screen.getByTestId("current-path")).toHaveTextContent(path);
    });

    test("does not expose checkout in the navbar", () => {
        const store = configureStore({ reducer: { cart: cartReducer } });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <NavBar />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.queryByRole("link", { name: "Checkout" })).not.toBeInTheDocument();
    });
});