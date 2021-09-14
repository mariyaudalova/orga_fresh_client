import React from "react";
import PropTypes from "prop-types";

const SizeItem = ({ value }: { value: string }) => {
  return <span>{value}</span>;
};

SizeItem.propTypes = {
  value: PropTypes.string,
};

export default SizeItem;
