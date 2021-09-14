import { Dispatch } from "redux";
import { ProductEntity } from "../../common/types";
import { getFavoutitesProductsState } from "./actions";

export const toggleFavorite =
  (product: ProductEntity) => (dispatch: Dispatch) => {
    dispatch(getFavoutitesProductsState(product));
  };
