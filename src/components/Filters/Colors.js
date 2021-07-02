import React from "react";
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
        {colorsList.map((color) => {
          return (
            <li
              onClick={() => changeColor(color)}
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

export { Colors };
