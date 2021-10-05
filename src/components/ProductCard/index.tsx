import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import { CART } from "../../utils/consts";
import { ProductEntity } from "../../common/types";
import Icon from "../Icon";

import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product: ProductEntity;
  toggleFavoriteClick: (product: ProductEntity) => void;
  addToCart: (product: ProductEntity) => void;
  isInCart: boolean;
  isFavourite: boolean;
}

const ProductCard = (props: ProductCardProps) => {
  const {
    product: { currentPrice, brand, name, imageUrls, sizes, currency },
    product,
    toggleFavoriteClick,
    isFavourite,
    addToCart,
    isInCart,
  } = props;

  return (
    <Paper className={styles.cardContainer}>
      <img className={styles.imageContainer} src={imageUrls[0]} />
      <div className={styles.nameContainer}>
        <p className={styles.productName}>{name}</p>
        <p className={styles.manufacturer}>{brand}</p>
      </div>
      <div className={styles.nameContainer}>
        <p className={styles.productName}>
          {currentPrice} {currency}
        </p>
        <p className={styles.manufacturer}>{sizes} кg</p>
      </div>
      <div className={styles.nameContainer}>
        <Icon
          className={styles.iconLast}
          type="favourite"
          color={isFavourite ? "#ff9800" : "#989898"}
          width={25}
          filled={isFavourite}
          height={25}
          onClick={() => toggleFavoriteClick(product)}
        />
        {isInCart ? (
          <Link to={CART} className={styles.linkItem}>
            Already in Cart
          </Link>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </Button>
        )}
      </div>
    </Paper>
  );
};

export default ProductCard;
