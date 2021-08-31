const initialState = {
  data: [],
};

const getFavoutitesProducts = (favouritesProductsList, id) => {
  let updatedList = [];

  if (favouritesProductsList.includes(id)) {
    updatedList = favouritesProductsList.filter((item) => {
      return item !== id;
    });
  } else {
    updatedList = [...favouritesProductsList, id];
  }

  return updatedList;
};

export const favouritesProducts = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      return {
        ...state,

        data: getFavoutitesProducts(state.data, action.payload),
      };
    default:
      return state;
  }
};
