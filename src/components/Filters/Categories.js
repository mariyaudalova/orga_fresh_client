import React from "react";
import PropTypes from "prop-types";

import styles from "./Categories.module.scss";

const Categories = ({ changeCategoryHandler, activeCategory }) => {
  const categoriesList = [
    { id: "categories", uiLabel: "All", value: null },
    { id: "categories", uiLabel: "Fruits", value: "fruits" },
    { id: "categories", uiLabel: "Vegetables", value: "vegetables" },
    { id: "categories", uiLabel: "Burries", value: "Burries" },
  ];

  const changeCategory = (category) => {
    changeCategoryHandler(category);
  };

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categoriesList.map((category, index) => {
          return (
            <li
              onClick={() => changeCategory(category)}
              key={index}
              className={
                category.value === activeCategory.value
                  ? styles.active
                  : styles.listItem
              }
            >
              {category.uiLabel}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Categories.propTypes = {
  changeCategoryHandler: PropTypes.func,
  activeCategory: PropTypes.object,
};

export { Categories };
