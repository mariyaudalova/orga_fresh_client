import React from "react";
import PropTypes from "prop-types";
import Slider from "@material-ui/core/Slider";

const Price = ({ changePriceHandler, maxPrice }) => {
  const priceState = {
    id: "price",
    uiLabel: "",
    value: [0, maxPrice],
  };
  const [value, setValue] = React.useState(priceState.value);

  const handleChange = (e, value) => {
    setValue(value);
  };

  const changeCommittedHandler = () => {
    priceState.value = value;

    changePriceHandler(priceState);
  };

  return (
    <Slider
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      max={maxPrice}
      onChangeCommitted={changeCommittedHandler}
      //aria-labelledby="range-slider"
      // getAriaValueText={valuetext}
    />
  );
};

Price.propTypes = {
  changePriceHandler: PropTypes.string,
  maxPrice: PropTypes.number,
};

export { Price };
