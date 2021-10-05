import React from "react";
import PropTypes from "prop-types";

const ColorItem = ({ value }: { value: string }) => {
  return <span>{value}</span>;
};

ColorItem.propTypes = {
  value: PropTypes.string,
};

export default ColorItem;
