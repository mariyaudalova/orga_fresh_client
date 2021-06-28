import React, { useState } from "react";
import styles from "./DropDown.module.scss";

const DropDown = (props) => {
  const { currentValue, listOfOptions, onClick } = props;

  const optionsView = listOfOptions.map((option) => {
    return (
      <li
        onClick={() => onClick(option)}
        className={styles.option}
        key={option}
      >
        {option}
      </li>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.selectedValue}>{currentValue}</div>
      <ul>{optionsView}</ul>
    </div>
  );
};

export default DropDown;
