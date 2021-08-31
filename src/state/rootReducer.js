import { favouritesProducts } from "./favouritesProducts/reducer";
import { currencyState } from "./currency/reducer";
import { cartState } from "./cart/reducer";
import { userState } from "./user/reducer";

export const rootReducer = {
  favouritesProducts,
  currencyState,
  cartState,
  userState,
};
