import React from "react";
import PropTypes from "prop-types";
import ClearSharpIcon from "@material-ui/icons/ClearSharp";

import styles from "./SmallProductCard.module.scss";
import { ProductEntity } from "../../common/types";

interface SmallProductCard {
  product: ProductEntity;
  deleteFromCart: () => void;
}

const SmallProductCard = (props: SmallProductCard) => {
  const {
    product: { currentPrice, name, imageUrls, sizes },
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
      <ClearSharpIcon onClick={deleteFromCart} />
    </div>
  );
};

SmallProductCard.propTypes = {
  product: PropTypes.object,
};

export default SmallProductCard;