import React from "react";
import ClearSharpIcon from "@material-ui/icons/ClearSharp";

import styles from "./SmallProductCard.module.scss";
import { ProductEntity } from "../../common/types";

interface SmallProductCard {
  product: ProductEntity;
  deleteFromCart: () => void;
}

const SmallProductCard = (props: SmallProductCard) => {
  const {
    product: { currentPrice, name, imageUrls, sizes, currency },
    deleteFromCart,
  } = props;

  return (
    <div className={styles.cardContainer}>
      <img className={styles.imageContainer} src={imageUrls[0]} alt="watch" />
      <div className={styles.nameContainer}>
        <p className={styles.productName}>{name}</p>
        <p className={styles.manufacturer}>{sizes} кg</p>
      </div>
      <p className={styles.productName}>{currentPrice} </p>
      <p className={styles.productName}>{currency} </p>
      <ClearSharpIcon onClick={deleteFromCart} />
    </div>
  );
};

export default SmallProductCard;
