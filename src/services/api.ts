import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";


export const fetchProducts = async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
};


export const fetchCategories = async () => {
    const response = await axios.get(`${BASE_URL}/products/categories`);
    return response.data;
};


export const fetchProductsByCategory = async (category: string) => {
    const response = await axios.get(`${BASE_URL}/products/category/${category}`);
    return response.data;
};
