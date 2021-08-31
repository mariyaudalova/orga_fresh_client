import { addToCart, removeFromCart, clearCart } from "./actions";

export const addToCartCreator = (product) => (dispatch) => {
  dispatch(addToCart(product));
};

export const removeFromCartCreator = (product) => (dispatch) => {
  dispatch(removeFromCart(product));
};

export const clearCartCreator = () => (dispatch) => {
  dispatch(clearCart());
};
