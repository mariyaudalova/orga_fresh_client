import React from "react";
import PropTypes from "prop-types";

const CategoryItem = ({ value }) => {
  return <span>{value}</span>;
};

CategoryItem.propTypes = {
  value: PropTypes.string,
};

export default CategoryItem;
