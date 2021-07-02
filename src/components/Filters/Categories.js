import React from "react";
import styles from "./Categories.module.scss";

const Categories = ({ changeCategoryHandler, activeCategory }) => {
  const categoriesList = ["Fruits", "Vegetables", "Burries"];

  const changeCategory = (category) => {
    changeCategoryHandler(category);
  };

  return (
    <div>
      <h2>Products Categories</h2>
      <ul>
        {categoriesList.map((category) => {
          return (
            <li
              onClick={() => changeCategory(category)}
              className={
                category === activeCategory ? styles.active : styles.listItem
              }
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Categories;
