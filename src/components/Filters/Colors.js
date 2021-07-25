import React from "react";
import PropTypes from "prop-types";

import styles from "./Categories.module.scss";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { green } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";


const Colors = ({ changeColorHandler, colorsList }) => {
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
      <h2>Colors</h2>
      <ul>
        {colorsList.map((color, index) => {
          return (
            <li
              // onClick={() => changeColor({...color, isActive: !color.isActive})}
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
                    label={color.uiLabel}
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
