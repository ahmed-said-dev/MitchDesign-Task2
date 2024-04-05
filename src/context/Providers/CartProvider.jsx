import React, { useReducer, useCallback, useContext, useMemo } from "react";
import ProductsCartReducer from "../Reducers/ProductsCartReducer";

// Custom hook to calculate total items and total amount in the cart
const useTotalCartAmount = (cart) => {
  const totalCartItems = useMemo(() =>
    cart.items.reduce((total, { quantity = 0 }) => total + quantity, 0),
    [cart.items]
  );

  const totalCartItemsAmount = useMemo(() =>
    cart.items.reduce((total, { price = 0, quantity = 0 }) => total + price * quantity, 0).toFixed(2),
    [cart.items]
  );

  return { totalCartItems, totalCartItemsAmount };
};

// Provider component to manage cart state and actions
const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(ProductsCartReducer, initialCartState);

  // Add item to cart action
  const addToCart = useCallback(
    ({ id, price, ...rest }) => dispatch({ type: 'ADD_TO_CART', item: { id, price, quantity: 1, ...rest } }),
    [dispatch]
  );

  // Calculate total items and total amount using the custom hook
  const { totalCartItems, totalCartItemsAmount } = useTotalCartAmount(cart);

  // Context value containing cart state and actions
  const cartContext = {
    ...cart,
    addToCart,
    totalCartItems,
    totalCartItemsAmount,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart context
const useCart = (cartId) => {
  const cartContext = useContext(CartContext);

  if (cartContext === null) {
    throw new Error('Error!');
  }

  // Find and return specific cart if cartId is provided
  if (cartId) {
    const specificCart = cartContext.id === cartId
      ? cartContext
      : cartContext.find((cart) => cart.id === cartId);
    if (specificCart) return specificCart;
    throw new Error(`Cart with id: ${cartId} not found`);
  }

  return cartContext;
};

const initialCartState = {
  items: [],
};

// Create cart context with initial state
const CartContext = React.createContext({
  ...initialCartState,
  totalCartItems: 0,
  totalCartItemsAmount: 0,
  addToCart: () => {},
});

export { CartProvider, useCart };
