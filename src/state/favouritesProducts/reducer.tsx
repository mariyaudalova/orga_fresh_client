import { Action, ProductEntity } from "../../common/types";

const initialState = {
  data: {
    products: [],
  },
};

const getFavoutitesProducts = (
  products: ProductEntity[],
  changedProduct: ProductEntity
) => {
  const deepCopy = products.map((item) => {
    return { ...item };
  });
  const productIndex = deepCopy.findIndex(
    (product) => product._id === changedProduct._id
  );

  if (productIndex !== -1) {
    deepCopy.splice(productIndex, 1);
  } else {
    deepCopy.push(changedProduct);
  }

  return deepCopy;
};

export const favouritesProducts = (
  state = initialState,
  action: Action<ProductEntity>
) => {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      return {
        ...state,
        data: {
          products: getFavoutitesProducts(state.data.products, action.payload),
        },
      };
    case "CLEAR_FAVOURITES_LIST":
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
