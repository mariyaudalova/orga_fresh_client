import React from "react";
import styles from "./ProductCard.module.scss";
import Button from "../Button";

const ProductCard = (props) => {
  const { currentPrice, enabled, brand, name, imageUrls, sizes } =
    props.product;

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
      <Button title="Add to cart" className="addToCart" />
    </div>
  );
};

export default ProductCard;
