const initialState = {
  isLoading: false,
  data: [],
  errors: "",
};

export const favouritesProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      return {
        ...state,
        data: { ...state.data, favouritesProducts: action.payload },
      };
    default:
      return state;
  }
};
