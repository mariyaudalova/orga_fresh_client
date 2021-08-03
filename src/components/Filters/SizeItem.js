import React from "react";
import PropTypes from "prop-types";

const SizeItem = ({ value }) => {
  return <span>{value}</span>;
};

SizeItem.propTypes = {
  value: PropTypes.string,
};

export default SizeItem;
