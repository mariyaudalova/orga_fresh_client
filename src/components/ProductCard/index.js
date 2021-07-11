import React from "react";
import PropTypes from "prop-types";

import styles from "./ProductCard.module.scss";
import Icon from "../Icon";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../state/favouritesProducts/actionsCreators";
import { getFavoutitesProducts } from "../../state/favouritesProducts/selectors";

const ProductCard = (props) => {
  const { _id, currentPrice, brand, name, imageUrls, sizes } = props.product;

  const dispatch = useDispatch();

  const formState = useSelector(getFavoutitesProducts);

  console.log(formState);

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
          filled
          width={35}
          height={35}
          onClick={() => {
            dispatch(toggleFavorite(_id));
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
