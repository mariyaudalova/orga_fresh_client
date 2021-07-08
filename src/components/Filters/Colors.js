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
      <h2>Products colors</h2>
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
  changeColorHandler: PropTypes.string,
  activeColor: PropTypes.string,
};

export { Colors };
