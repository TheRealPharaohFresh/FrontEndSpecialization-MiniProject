import { fetchProducts } from "../services/productServices";
import { getDocs, collection, getFirestore } from "firebase/firestore";

// Mock Firebase functions
jest.mock("firebase/firestore", () => ({
  getDocs: jest.fn(),
  collection: jest.fn(), 
  getFirestore: jest.fn(() => "mockedFirestore"), // Mocked Firestore instance
}));

beforeEach(() => {
  jest.clearAllMocks(); // Clear mocks before each test
});

describe("fetchProducts", () => {
  test("returns product list when Firestore fetch succeeds", async () => {
    const mockProducts = [
      { id: "1", name: "Product A", price: 10 },
      { id: "2", name: "Product B", price: 20 },
    ];

    // Mocking getDocs to return the mock product data
    (getDocs as jest.Mock).mockResolvedValue({
      docs: mockProducts.map((product) => ({
        id: product.id,
        data: () => ({ name: product.name, price: product.price }),
      })),
    });

    // Mocking the collection to return the correct Firestore instance
    (collection as jest.Mock).mockReturnValue("mockedCollection");

    const result = await fetchProducts();
    expect(result).toEqual(mockProducts);  // Check if the result matches the mock data
    expect(getDocs).toHaveBeenCalledTimes(1);  // Ensure getDocs is called exactly once
    expect(collection).toHaveBeenCalledWith("mockedFirestore", "products");  // Ensure collection is called with the correct Firestore instance and "products"
  });

  test("returns an empty array when Firestore fetch fails", async () => {
    // Mocking getDocs to simulate an error
    (getDocs as jest.Mock).mockRejectedValue(new Error("Firestore error"));

    const result = await fetchProducts();
    expect(result).toEqual([]);  // Expect an empty array due to error
    expect(getDocs).toHaveBeenCalledTimes(1);  // Ensure getDocs is called exactly once
  });
});







