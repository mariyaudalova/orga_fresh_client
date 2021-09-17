import React, { useEffect } from "react";
import Slider from "@material-ui/core/Slider";
import styles from "./FilterItem.module.scss";

const Price = ({ changePriceHandler, maxPrice, currentPrice }) => {
  const priceState = {
    id: "price",
    uiLabel: "",
    value: currentPrice,
    isActive: true,
  };

  const [value, setValue] = React.useState(currentPrice);

  useEffect(() => {
    setValue(currentPrice);
  }, [currentPrice]);

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

export default Price;
