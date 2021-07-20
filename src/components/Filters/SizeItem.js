/* eslint-disable */

import React from "react";

const SizeItem = ({ value }) => {
  
  activeValue={colorsList[0]}
  listOfValues={colorsList}
  changeFilterHandler={changeColorHandler}


  return <li>{value}</li>;
};

export default SizeItem;
