import { getFavoutitesProductsState } from "./actions";

export const toggleFavorite = (productId) => (dispatch) => {
  dispatch(getFavoutitesProductsState(productId));
};
