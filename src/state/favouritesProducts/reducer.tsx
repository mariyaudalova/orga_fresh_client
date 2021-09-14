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
  const productIndex = products.findIndex(
    (product) => product._id === changedProduct._id
  );

  if (productIndex !== -1) {
    products.splice(productIndex, 1);
  } else {
    products.push(changedProduct);
  }

  return products;
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
    default:
      return state;
  }
};
