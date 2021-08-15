const initialState = {
  isLoading: true,
  data: null,
  errors: "",
};

const removeFromCart = (productList, removedProduct) => {
  const removedProductIndex = productList.findIndex(
    (product) => product._id === removedProduct._id
  );
  productList.splice(removedProductIndex, 1);
  return [...productList];
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
      return {
        cart: removeFromCart(),
      };
    case "CLEAR_CART":
      return clearCart(state);
    default:
      return state;
  }
};
