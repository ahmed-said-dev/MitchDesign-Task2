const addToCart = (state, action) => {
  const { item } = action;
  const { id } = item;
  const existingItemIndex = state.items.findIndex((item) => item.id === id);

  if (existingItemIndex > -1) {
    const updatedItem = { ...state.items[existingItemIndex], quantity: state.items[existingItemIndex].quantity + 1 };
    const updatedItems = [
      ...state.items.slice(0, existingItemIndex),
      updatedItem,
      ...state.items.slice(existingItemIndex + 1),
    ];
    return { items: updatedItems };
  } else {
    const newItem = { ...item, quantity: 1 };
    return { items: [...state.items, newItem] };
  }
};

const ProductsCartReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return addToCart(state, action);
    default:
      throw new Error("unknown action type!");
  }
};

export default ProductsCartReducer;
