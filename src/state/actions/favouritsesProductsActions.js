export const toggleFavorite = (productId) => (dispatch) => {
  dispatch({ type: "TOGGLE_FAVORITE", payload: productId });
};
