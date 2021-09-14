import { Dispatch } from "redux";
import { updateCurrency } from "./actions";

export const updateCurrencyCreator =
  (currency: string) => (dispatch: Dispatch) => {
    dispatch(updateCurrency(currency));
  };
