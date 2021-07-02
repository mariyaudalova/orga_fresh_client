import React from "react";
import styles from "./Categories.module.scss";

const Categories = ({ changeCategoryHandler, activeCategory }) => {
  const categoriesList = [
    { id: "categories", uiLabel: "All", value: "all" },
    { id: "categories", uiLabel: "Fruits", value: "fruits" },
    { id: "categories", uiLabel: "Vegetables", value: "vegetables" },
    { id: "categories", uiLabel: "Burries", value: "Burries" },
  ];

  const changeCategory = (category) => {
    changeCategoryHandler(category);
  };

  return (
    <div>
      <h2>Products Categories</h2>
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
export default Categories;
