import { RootState } from "../../common/types";

export const getCurrency = (state: RootState) => state.currencyState.currency;
