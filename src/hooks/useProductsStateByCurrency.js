import { useEffect } from "react";
import { useSelector } from "react-redux";

import { USD_RATE } from "../common/constants";
import { getCurrency } from "../state/currency/selectors";

export const useProductsStateByCurrency = (productsState, setProductsState) => {
  const currentCurrency = useSelector(getCurrency);
  useEffect(() => {
    getProductsByPrice();
  }, [currentCurrency]);

  const getProductsByPrice = () => {
    const currencyRates = {
      USD: 1 / USD_RATE,
      UAH: USD_RATE,
    };

    if (productsState.data?.products[0].currency !== currentCurrency) {
      const changedCurrencyProducts = productsState.data?.products.map(
        (item) => {
          const newPrice = item.currentPrice * currencyRates[currentCurrency];
          item.currentPrice = newPrice.toFixed(2);
          item.currency = currentCurrency;
          return item;
        }
      );
      setProductsState({
        ...productsState,
        data: {
          products: changedCurrencyProducts,
        },
      });
    }
  };
};
