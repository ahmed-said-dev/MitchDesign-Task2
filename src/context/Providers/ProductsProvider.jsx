import React, { useReducer, useContext, useCallback, useEffect, useState } from "react";
import useDataFetch from "../../Hooks/useDataFetch";
import productsViewedReducer from "../Reducers/ProductsViewedReducer";

const ProductsFetch = (category, dispatch) => {
  const { isLoading, error } = useDataFetch(
    category,
    useCallback((productsResult) => {
      if (!productsResult) {
        return;
      }

      dispatch({ type: "LOADED_PRODUCTS", payload: productsResult });
    }, [category, dispatch])
  );

  return { isLoading, error };
};


const filterProductsBySearch = (products, debouncedSearchQuery) => {
  return debouncedSearchQuery.trim()
   ? products.filter((product) =>
        product.ar_name?.includes(debouncedSearchQuery)
      )?? []
    : products;
};

const getCategoriesNames = (products) => {
  return products.reduce(
    (arr, product) => {
      const { category_slug = "", category_name_ar = "" } = product?? {};

      if (arr.some((el) => el.category_slug === category_slug)) {
        return arr;
      }

      return [...arr, { category_slug, category_name_ar }];
    },
    [{ category_slug: "", category_name_ar: "جميع الحلويات" }]
  );
};

const calculateCurrentProductsCount = (filteredProducts) => {
  return filteredProducts.length;
};

const ProductsProvider = ({ children }) => {
  if (!children) {
    throw new Error("ProductsProvider must have children");
  }

  // Initialize the state using the useReducer hook
  const [state, dispatch] = useReducer(productsViewedReducer, initialProductsState);

  // Destructure the state variables
  const { products, category, productsSearchQuery, products_per_page } = state;

  // Debounce the search query using the useState and useEffect hooks
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchQuery(productsSearchQuery);
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [productsSearchQuery]);

  // Fetch data from the API using the ProductsFetch hook
  const { isLoading, error } = ProductsFetch(category, dispatch);

  // Filter the products based on the search query
  const filteredProducts = filterProductsBySearch(products, debouncedSearchQuery);

  // Get unique categories from the filtered products
  const uniqueCategories = getCategoriesNames(filteredProducts);

  // Get the number of current products
  const currentProductsCount = calculateCurrentProductsCount(filteredProducts);

  // Create the context object
  const productsCtx = {
    products: filteredProducts,
    category,
    productsSearchQuery,
    products_per_page,
    categories: uniqueCategories,
    currentProductsCount,
    disableUserActions: currentProductsCount === 0,
    isLoading,
    error,
    dispatch,
  };

  // Render the context provider with the children
  return (
    <ProductsContext.Provider value={productsCtx}>{children}</ProductsContext.Provider>
  );
};

const useProducts = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("Error!");
  }

  return context;
};


const initialProductsState = {
  products: [],
  category: "",
  productsSearchQuery: "",
  products_per_page: 12,
};

const ProductsContext = React.createContext({
  products: [],
  category: "",
  productsSearchQuery: "",
  products_per_page: 12,
  categories: [],
  currentProductsCount: 0,
  disableUserActions: false,
  isLoading: false,
  error: null,
  dispatch: function () {},
});

export { ProductsProvider, useProducts };