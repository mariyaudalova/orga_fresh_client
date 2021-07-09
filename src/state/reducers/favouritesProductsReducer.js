const initialState = {
  isLoading: false,
  data: [],
  errors: "",
};

export const favouritesProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_FAVOURITES":
      return {
        ...state,
        data: { ...state.data, favouritesProducts: action.payload },
      };
    case "REMOVE_FROM_FAVOURITES":
      return {
        ...state,
        data: { ...state.data, favouritesProducts: action.payload },
      };
    default:
      return state;
  }
};
