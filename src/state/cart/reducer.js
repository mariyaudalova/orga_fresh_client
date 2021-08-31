const initialState = {
  isLoading: true,
  data: null,
  errors: "",
};

const removeFromCart = (state, action) => {
  console.log("state", state);
  const removedProductIndex = state.data.products.findIndex(
    (product) => product._id === action.payload
  );
  state.data.products.splice(removedProductIndex, 1);

  return {
    ...state,
    data: { products: [...(state.data?.products || [])] },
  };
};

const addToCart = (state, action) => {
  // localStorage.setItem("cart", JSON.stringify([...state.cart, action.payload]));
  return {
    ...state,
    data: { products: [...(state.data?.products || []), action.payload] },
  };
};

const clearCart = (state) => {
  return {
    ...state,
    data: { products: [] },
  };
};

export const cartState = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return addToCart(state, action);
    case "REMOVE_FROM_CART":
      return removeFromCart(state, action);
    case "CLEAR_CART":
      return clearCart(state);
    default:
      return state;
  }
};
