import { ProductEntity } from "../../common/types";

export const getFavoutitesProductsState = (product: ProductEntity) => {
  return { type: "TOGGLE_FAVORITE", payload: product };
};

export const clearFavouritesList = () => {
  return { type: "CLEAR_FAVOURITES_LIST" };
};
