import React from "react";
import PropTypes from "prop-types";
import Slider from "@material-ui/core/Slider";

const Price = ({ changePriceHandler, maxPrice }) => {
  console.log(maxPrice);
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
    <>
      <h2>Price</h2>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        max={maxPrice}
        onChangeCommitted={changeCommittedHandler}
        //aria-labelledby="range-slider"
        // getAriaValueText={valuetext}
      />
    </>
  );
};

Price.propTypes = {
  changePriceHandler: PropTypes.func,
  maxPrice: PropTypes.number,
};

export { Price };
