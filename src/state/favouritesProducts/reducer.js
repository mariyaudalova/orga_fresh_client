/* eslint-disable no-debugger, no-console */

const initialState = {
  data: {
    products: [],
  },
};

const getFavoutitesProducts = (products, action) => {
  //debugger;
  console.log("products", products, "action", action);
  const productIndex = products.findIndex(
    (product) => product._id === action._id
  );

  if (productIndex !== -1) {
    products.splice(productIndex, 1);
  } else {
    products.push(action);
  }

  return products;
};

export const favouritesProducts = (state = initialState, action) => {
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
