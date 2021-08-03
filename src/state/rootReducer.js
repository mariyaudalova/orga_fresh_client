import { favouritesProducts } from "./favouritesProducts/reducer";
import { currencyState } from "./currency/reducer";
import { cartState } from "./cart/reducer";

export const rootReducer = {
  favouritesProducts,
  currencyState,
  cartState,
};
