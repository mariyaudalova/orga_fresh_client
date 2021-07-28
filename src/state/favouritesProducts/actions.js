export const getFavoutitesProductsState = (productId) => {
  return { type: "TOGGLE_FAVORITE", payload: productId };
};
