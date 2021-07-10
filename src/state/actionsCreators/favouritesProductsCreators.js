import { toggleFavorite } from "../actions/favouritsesProductsActions";

const initialState = [];

export const favouritesProducts = async (dispatch) => {
  dispatch(toggleFavorite(initialState));
};
