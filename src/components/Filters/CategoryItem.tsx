import React from "react";
import PropTypes from "prop-types";

const CategoryItem = ({ value }: { value: string }) => {
  return <span>{value}</span>;
};

CategoryItem.propTypes = {
  value: PropTypes.string,
};

export default CategoryItem;
