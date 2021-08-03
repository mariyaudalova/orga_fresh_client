import React from "react";
import PropTypes from "prop-types";

import styles from "./SmallProductCard.module.scss";

const SmallProductCard = (props) => {
  //const {{_id, currentPrice, brand, name, imageUrls, sizes}: product} = props;

  const {
    product: { currentPrice, name, imageUrls, sizes },
  } = props;

  return (
    <div className={styles.cardContainer}>
      <img className={styles.imageContainer} src={imageUrls[0]} alt="watch" />
      <div className={styles.nameContainer}>
        <p className={styles.productName}>{name}</p>
        <p className={styles.manufacturer}>{sizes} кg</p>
      </div>
      <p className={styles.productName}>{currentPrice} </p>
    </div>
  );
};

SmallProductCard.propTypes = {
  product: PropTypes.object,
};

export default SmallProductCard;
