import { ProductEntity } from "../../common/types";

export const addToCart = (product: ProductEntity) => {
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
};
export const removeFromCart = (product: ProductEntity) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: product,
  };
};
export const clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};

export const addManyToCart = (productsList: ProductEntity[]) => {
  return {
    type: "ADD_MANY_TO_CART",
    payload: productsList,
  };
};
