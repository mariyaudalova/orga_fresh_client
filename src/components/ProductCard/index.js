import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import styles from "./ProductCard.module.scss";
import Icon from "../Icon";
import { Link } from "react-router-dom";
import { CART } from "../../utils/consts";

const ProductCard = (props) => {
  //const {{_id, currentPrice, brand, name, imageUrls, sizes}: product} = props;

  const {
    product: { _id, currentPrice, brand, name, imageUrls, sizes },
    product,
    toggleFavoriteClick,
    isFavourite,
    addToCart,
    isInCart,
  } = props;

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
      <div className={styles.nameContainer}>
        <Icon
          className={styles.iconLast}
          type="favourite"
          color={isFavourite ? "red" : "black"}
          width={35}
          height={35}
          onClick={() => toggleFavoriteClick(_id)}
        />
        {isInCart ? (
          <Link to={CART}>Already in Cart</Link>
        ) : (
          <Button variant="contained" onClick={() => addToCart(product)}>
            Add to cart
          </Button>
        )}
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
  toggleFavoriteClick: PropTypes.func,
  isFavourite: PropTypes.bool,
  addToCart: PropTypes.func,
  isInCart: PropTypes.bool,
};

export default ProductCard;
