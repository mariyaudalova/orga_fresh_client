import React from "react";
import PropTypes from "prop-types";

import styles from "./ProductCard.module.scss";
import Icon from "../Icon";
import { useDispatch } from "react-redux";
import { favouritesProducts } from "../../state/actionsCreators/favouritesProductsCreators";

const ProductCard = (props) => {
  const { id, currentPrice, brand, name, imageUrls, sizes } = props.product;

  const dispatch = useDispatch();

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
          color="black"
          width={35}
          height={35}
          onClick={() => {
            favouritesProducts(dispatch, id);
          }}
        />
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default ProductCard;
