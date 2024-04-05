// Function to update the state with loaded products
const loadedProducts = (state, payload) => ({
  ...state,
  products: payload,
});

// Function to update the state with a search query
const searchedProducts = (state, query) => ({
  ...state,
  productsSearchQuery: query,
});

// Function to update the state with filtered products
const filteredProducts = (state, selectedProductsCategory) => ({
  ...state,
  productsPerPage: PRODUCTS_PER_PAGE,
  category: selectedProductsCategory,
  productsSearchQuery: "",
});

// Function to update the state with more loaded products
const loadedMoreProducts = (state, payload) => ({
  ...state,
  products: [...state.products, ...payload],
  productsPerPage: state.productsPerPage + PRODUCTS_PER_PAGE,
  productsSearchQuery: "",
});

const productsViewedReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADED_PRODUCTS":
      return loadedProducts(state, action.payload);

    case "SEARCH_PRODUCTS":
      return searchedProducts(state, action.query);

    case "FILTER_PRODUCTS":
      return filteredProducts(state, action.selectedProductsCategory);

    case "LOAD_MORE_PRODUCTS":
      return loadedMoreProducts(state, action.payload);

    default:
      throw new Error("unknown action type!");
  }
};

const PRODUCTS_PER_PAGE = 12;

const initialState = {
  products: [],
  productsPerPage: PRODUCTS_PER_PAGE,
  category: null,
  productsSearchQuery: "",
};
export default productsViewedReducer;
