import { addToCart, removeFromCart } from "./actions";

export const addToCartCreator = (product) => (dispatch) => {
  dispatch(addToCart(product));
};

export const removeFromCartCreator = (product) => (dispatch) => {
  dispatch(removeFromCart(product));
};
