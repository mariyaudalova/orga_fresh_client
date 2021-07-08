import React from "react";
import PropTypes from "prop-types";

import styles from "./ProductCard.module.scss";

const ProductCard = (props) => {
  const { currentPrice, brand, name, imageUrls, sizes } = props.product;

  return (
    <div className={styles.cardContainer}>
      <img className={styles.imageContainer} src={imageUrls[0]} alt="watch" />
      <div className={styles.nameContainer}>
        <p className={styles.productName}>{name}</p>
        <p className={styles.manufacturer}>{brand}</p>
      </div>
      <div className={styles.nameContainer}>
        <p className={styles.productName}>{currentPrice} </p>
        <p className={styles.manufacturer}>{sizes} кg</p>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default ProductCard;
