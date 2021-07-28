import React from "react";
import PropTypes from "prop-types";

const SizeItem = ({ value }) => {
  return <li>{value}</li>;
};

SizeItem.propTypes = {
  value: PropTypes.string,
};

export default SizeItem;
