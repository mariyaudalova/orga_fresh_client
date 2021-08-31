import React from "react";
import PropTypes from "prop-types";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { green } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";

import styles from "./FilterItem.module.scss";

const Colors = ({ changeColorHandler, colorsList }) => {
  const GreenCheckbox = withStyles()((props) => (
    <Checkbox color="default" {...props} />
  ));
  return (
    <div>
      <h2>Colors</h2>
      <ul>
        {colorsList.map((color, index) => {
          return (
            <li
              key={index}
              className={
                color === color.isActive ? styles.active : styles.listItem
              }
            >
              <FormControlLabel
                control={
                  <GreenCheckbox
                    checked={color.isActive}
                    onChange={(event) => {
                      changeColorHandler({
                        ...color,
                        isActive: event.target.checked,
                      });
                    }}
                    name="checkedG"
                  />
                }
                label={<div className="sdvsd">{color.uiLabel}</div>}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Colors.propTypes = {
  changeColorHandler: PropTypes.func,
  colorsList: PropTypes.array,
};

export { Colors };
