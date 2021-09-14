export const updateCurrency = (currency: string) => {
  return {
    type: "UPDATE_CURRENCY",
    payload: currency,
  };
};
