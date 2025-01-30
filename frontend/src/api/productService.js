import axios from "axios";
import { config } from "../config";

const API_URL = `${config.apiUrl}/api/products`; // Replace with your backend API URL

//Get Products
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

//Get New Arrivals
export const getNewArrivals = async () => {
  try {
    const response = await axios.get(`${API_URL}/new-arrivals`);
    return response.data;
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    throw error;
  }
};

//Fetch Categories
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);

    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

//Search For products
export const searchProducts = async ({
  searchQuery,
  category,
  minPrice,
  maxPrice,
}) => {
  try {
    // Construct query parameters dynamically
    console.log("searchQuery", searchQuery, "category", category, "minPrice", minPrice, "maxPrice", maxPrice);
    const queryParams = new URLSearchParams();

    //Construct The Query
    if (searchQuery) queryParams.append("name", searchQuery);
    if (category) queryParams.append("category", category);
    if (minPrice !== undefined) queryParams.append("minPrice", minPrice);
    if (maxPrice !== undefined) queryParams.append("maxPrice", maxPrice);

    //Send Api Response
    const apiUrl = `${API_URL}/filter?${queryParams.toString()}`;
    console.log(apiUrl)

    const response = await axios.get(apiUrl);

    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};

//Get Product Detail By ID

export const GetProductDetailById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
