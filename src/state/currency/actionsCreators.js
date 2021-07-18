import { updateCurrency } from "./actions";

export const updateCurrencyCreator = (currency) => (dispatch) => {
  dispatch(updateCurrency(currency));
};
