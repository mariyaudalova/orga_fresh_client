import { getFavoutitesProductsState } from "./actions";

export const toggleFavorite = (product) => (dispatch) => {
  dispatch(getFavoutitesProductsState(product));
};
