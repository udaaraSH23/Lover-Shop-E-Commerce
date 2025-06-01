import React, { useState, useEffect, useReducer } from "react";
import Button from "../../components/shared/button/Button";
import { useSearchParams } from "react-router-dom";
import {
  getProducts,
  getCategories,
  searchProducts,
} from "../../api/productService";
import "./ProductPage.css";
import ProductCard from "../../components/ProductCard";
import Loading from "../../components/shared/Loading/Loading";

// Reducer function for managing categoryFilter
const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, categoryFilter: action.payload };
    case "RESET_CATEGORY":
      return { ...state, categoryFilter: "All" };
    default:
      return state;
  }
};

const ProductPage = () => {
  const [products, setProducts] = useState([]); // All products
  const [categories, setCategories] = useState([]); // All categories
  const [isLoading, setIsLoading] = useState(true); // Loading state

  //Pagination Status

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Filter states managed by useReducer
  const [filterState, dispatchFilter] = useReducer(filterReducer, {
    categoryFilter: "All",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch products and categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true); // Show loader while fetching
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories.", error);
      } finally {
        setIsLoading(false); // Hide loader after fetching
      }
    };

    const initializeFiltersWithQuery = async () => {
      const categoryFromQuery = searchParams.get("category");

      if (categoryFromQuery) {
        dispatchFilter({ type: "SET_CATEGORY", payload: categoryFromQuery });
        searchWithCategory(categoryFromQuery); // Perform search with query category
      } else {
        fetchAllProducts(); // Fetch all products if no category in query
      }
    };

    fetchCategories();
    initializeFiltersWithQuery();
  }, []); // Run on component mount

  // Fetch all products
  const fetchAllProducts = async (page) => {
    try {
      setIsLoading(true);
      const data = await getProducts(page);
      setProducts(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(data.pageable.pageNumber);
    } catch (error) {
      console.error("Failed to fetch products.", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Search products using filterState
  const searchWithFilters = async () => {
    const selectedCategory =
      filterState.categoryFilter !== "All"
        ? filterState.categoryFilter
        : undefined;
    const minPriceVal = minPrice !== "" ? parseFloat(minPrice) : undefined;
    const maxPriceVal = maxPrice !== "" ? parseFloat(maxPrice) : undefined;

    await searchProductsAndUpdateState({
      searchQuery,
      category: selectedCategory,
      minPriceVal,
      maxPriceVal,
    });
  };

  // Search products using a specific category
  const searchWithCategory = async (category) => {
    await searchProductsAndUpdateState({
      searchQuery: undefined,
      category,
      minPriceVal: undefined,
      maxPriceVal: undefined,
    });
  };

  // Generic function to handle product search
  const searchProductsAndUpdateState = async ({
    searchQuery,
    category,
    minPriceVal,
    maxPriceVal,
  }) => {
    try {
      setIsLoading(true);

      const data = await searchProducts({
        searchQuery,
        category,
        minPrice: minPriceVal,
        maxPrice: maxPriceVal,
      });
      setProducts(data.content);

      // Update query parameters
      const searchParamsObj = {};
      if (category) searchParamsObj.category = category;
      if (minPriceVal) searchParamsObj.minPrice = minPriceVal;
      if (maxPriceVal) searchParamsObj.maxPrice = maxPriceVal;

      setSearchParams(searchParamsObj);
    } catch (error) {
      console.error("Failed to search products.", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="product-page">
          <div className="banner">
            <img
              src="/productpagefooter.png"
              alt="Banner"
              className="banner-image"
            />
            <div className="banner-content">
              <h1>Our Products</h1>
              <p>
                Explore our amazing collection of products at affordable prices!
              </p>
            </div>
            <div className="search-container">
              <input
                type="text"
                className="search"
                placeholder="Search for something..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                label="Search"
                onClick={() => searchWithFilters()}
                class="search-button"
              />
            </div>
          </div>

          <div className="filters">
            <select
              value={filterState.categoryFilter}
              onChange={(e) =>
                dispatchFilter({
                  type: "SET_CATEGORY",
                  payload: e.target.value,
                })
              }
            >
              <option value="All">All Categories</option>
              {categories.map((categoryItem) => (
                <option key={categoryItem} value={categoryItem}>
                  {categoryItem}
                </option>
              ))}
            </select>
            <div className="price-range">
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <Button
              label="Apply Filter"
              onClick={() => searchWithFilters()}
              class="search-button"
            />
          </div>

          {products.length === 0 ? (
            <div>No products found</div>
          ) : (
            <div>
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="pagination">
                <button
                  disabled={currentPage === 0}
                  onClick={() => fetchAllProducts(currentPage - 1)}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage + 1} of {totalPages}
                </span>
                <button
                  disabled={currentPage + 1 >= totalPages}
                  onClick={() => fetchAllProducts(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductPage;
