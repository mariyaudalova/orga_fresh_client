import { Action } from "../../common/types";

const initialState = {
  currency: "USD",
};

export const currencyState = (state = initialState, action: Action<string>) => {
  switch (action.type) {
    case "UPDATE_CURRENCY":
      return {
        currency: action.payload,
      };
    default:
      return state;
  }
};
