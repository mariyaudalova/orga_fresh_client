import React from "react";
import PropTypes from "prop-types";

const CategoryItem = ({ value }) => {
  return <li>{value}</li>;
};

CategoryItem.propTypes = {
  value: PropTypes.string,
};

export default CategoryItem;
