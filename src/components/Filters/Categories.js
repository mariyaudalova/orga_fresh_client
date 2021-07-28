import React from "react";
import PropTypes from "prop-types";
import { green } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";

import styles from "./FilterItem.module.scss";

const Categories = ({ changeCategoryHandler, categoriesList }) => {
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
              className={category.isActive ? styles.active : styles.listItem}
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
  categoriesList: PropTypes.array,
};

export { Categories };
