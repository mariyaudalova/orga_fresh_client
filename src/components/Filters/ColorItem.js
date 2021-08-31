import React from "react";
import PropTypes from "prop-types";

const ColorItem = ({ value }) => {
  return <span>{value}</span>;
};

ColorItem.propTypes = {
  value: PropTypes.string,
};

export default ColorItem;
