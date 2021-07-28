import React from "react";
import PropTypes from "prop-types";

const ColorItem = ({ value }) => {
  return <li>{value}</li>;
};

ColorItem.propTypes = {
  value: PropTypes.string,
};

export default ColorItem;
