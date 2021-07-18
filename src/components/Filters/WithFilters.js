/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";

const WithFilters = (ListItem) => {
  return ({ filterName, changeFilterHandler, activeValue, listOfValues }) => {
    return (
      <div>
        <h2>{filterName}</h2>
        <ul>
          {listOfValues.map((item) => {
            return (
              <ListItem
                onClick={() => changeFilterHandler(item)}
                key={item.id}
                activeItem={item.value === activeValue.value}
                value={item.uiLabel}
              />
            );
          })}
        </ul>
      </div>
    );
  };
};

WithFilters.propTypes = {
  filterName: PropTypes.string,
  changeFilterHandler: PropTypes.func,
  activeValue: PropTypes.object,
  listOfValues: PropTypes.array,
};

export { WithFilters };
