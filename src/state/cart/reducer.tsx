import {
  Action,
  ProductEntity,
  ProductsData,
  ResponseState,
} from "../../common/types";

const initialState = {
  isLoading: true,
  data: null,
  error: "",
};

const removeFromCart = (
  state: ResponseState<ProductsData>,
  action: Action<ProductEntity>
) => {
  console.log("state", state);
  const removedProductIndex = state.data!.products.findIndex(
    (product: ProductEntity) => product._id === action.payload._id
  );
  state.data!.products.splice(removedProductIndex, 1);

  return {
    ...state,
    data: { products: [...(state.data?.products || [])] },
  };
};

const addToCart = (
  state: ResponseState<ProductsData>,
  action: Action<ProductEntity>
) => {
  return {
    ...state,
    data: { products: [...(state.data?.products || []), action.payload] },
  };
};

const clearCart = (state: ResponseState<ProductsData>) => {
  return {
    ...state,
    data: { products: [] },
  };
};

export const cartState = (
  state = initialState,
  action: Action<ProductEntity>
) => {
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
