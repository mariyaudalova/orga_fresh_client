import React from "react";
import PropTypes from "prop-types";

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

DropDown.propTypes = {
  currentValue: PropTypes.string,
  listOfOptions: PropTypes.object,
  onClick: PropTypes.string,
};

export default DropDown;
