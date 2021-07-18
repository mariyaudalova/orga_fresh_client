import React from "react";
import PropTypes from "prop-types";
import { green } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";

import styles from "./Categories.module.scss";

const Categories = ({ changeCategoryHandler, activeCategory }) => {
  const categoriesList = [
    { id: "categories", uiLabel: "All", value: null, isActive: true },
    { id: "categories", uiLabel: "Fruits", value: "fruits", isActive: false },
    {
      id: "categories",
      uiLabel: "Vegetables",
      value: "vegetables",
      isActive: false,
    },
    { id: "categories", uiLabel: "Burries", value: "Burries", isActive: false },
  ];

  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      "&$checked": {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);
  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categoriesList.map((category, index) => {
          return (
            <li
              key={index}
              className={
                category.value === activeCategory.value
                  ? styles.active
                  : styles.listItem
              }
            >
              <FormControlLabel
                control={
                  <GreenCheckbox
                    checked={category.isActive}
                    onChange={(event) => {
                      changeCategoryHandler({
                        ...category,
                        isActive: event.target.checked,
                      });
                    }}
                    name="checkedG"
                  />
                }
                label={category.uiLabel}
              />
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
