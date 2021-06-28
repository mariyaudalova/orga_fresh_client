import React from "react";
import styles from "./ProductCard.module.scss";

const ProductCard = (props) => {
  const { currentPrice, enabled, name, previousPrice } = props.product;

  return (
    <div className={styles.cardContainer}>
      <div> Image</div>
      <div>
        <p className={styles.productName}>{name}</p>
      </div>
      {currentPrice}
    </div>
  );
};

export default ProductCard;
