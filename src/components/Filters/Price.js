import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Slider from "@material-ui/core/Slider";
import styles from "./FilterItem.module.scss";

const Price = ({ changePriceHandler, maxPrice }) => {
  const priceState = {
    id: "price",
    uiLabel: "",
    value: [0, maxPrice],
    isActive: true,
  };

  const [value, setValue] = React.useState(priceState.value);

  useEffect(() => {
    setValue([0, maxPrice]);
  }, [maxPrice]);

  const handleChange = (e, value) => {
    setValue(value);
  };

  const changeCommittedHandler = () => {
    priceState.value = value;
    changePriceHandler(priceState);
  };

  return (
    <div className={styles.filterItemContainer}>
      <p className={styles.filterName}>Price</p>
      <Slider
        className={styles.sliderColor}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        max={maxPrice}
        onChangeCommitted={changeCommittedHandler}
      />
    </div>
  );
};

Price.propTypes = {
  changePriceHandler: PropTypes.func,
  maxPrice: PropTypes.number,
};

export default Price;
