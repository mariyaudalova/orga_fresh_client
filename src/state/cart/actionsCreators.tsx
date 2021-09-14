import { Dispatch } from "redux";
import { ProductEntity } from "../../common/types";
import { addToCart, removeFromCart, clearCart } from "./actions";

export const addToCartCreator =
  (product: ProductEntity) => (dispatch: Dispatch) => {
    dispatch(addToCart(product));
  };

export const removeFromCartCreator =
  (product: ProductEntity) => (dispatch: Dispatch) => {
    dispatch(removeFromCart(product));
  };

export const clearCartCreator = () => (dispatch: Dispatch) => {
  dispatch(clearCart());
};
