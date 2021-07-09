import React from "react";
import PropTypes from "prop-types";

import styles from "./Categories.module.scss";

const Colors = ({ changeColorHandler, activeColor }) => {
  const colorsList = ["red", "yellow", "green"];

  const changeColor = (color) => {
    changeColorHandler(color);
  };

  return (
    <div>
      <h2>Colors</h2>
      <ul>
        {colorsList.map((color, index) => {
          return (
            <li
              onClick={() => changeColor(color)}
              key={index}
              className={
                color === activeColor ? styles.active : styles.listItem
              }
            >
              {color}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Colors.propTypes = {
  changeColorHandler: PropTypes.func,
  activeColor: PropTypes.string,
};

export { Colors };
