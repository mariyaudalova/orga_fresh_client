const initialState = {
  currency: "USD",
};

export const currencyState = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_CURRENCY":
      return {
        currency: action.payload,
      };
    default:
      return state;
  }
};
