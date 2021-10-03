/* eslint-disable */
import React, { useState } from "react";
import Container from "@material-ui/core/Container";

import { useDispatch, useSelector } from "react-redux";
import { getFavoutitesProducts } from "../../state/favouritesProducts/selectors";
import { ProductEntity } from "../../common/types";

import ProductsContainer from "../../components/ProductsContainer";
import styles from "../ProductsList/ProductsList.module.scss";
import { Pagination } from "@material-ui/lab";
import { Button } from "@material-ui/core";
import { addManyToCart } from "../../state/cart/actions";
import { clearFavouritesList } from "../../state/favouritesProducts/actions";

const Favourites = () => {
  const favouritesProducts = useSelector(getFavoutitesProducts);
  const dispatch = useDispatch();

  const addAllToCard = (favouritesProducts: ProductEntity[]) => {
    dispatch(addManyToCart(favouritesProducts));
    dispatch(clearFavouritesList());
  };

  return (
    <div className={styles.contentContainer}>
      <Container>
        <div className={styles.pageTitleContainer}>
          <p className={styles.pageTitle}>Favourites products</p>
        </div>
        <div className={styles.productsContainer}>
          {favouritesProducts.data!.products.map((product: ProductEntity) => {
            return <ProductsContainer key={product._id} product={product} />;
          })}
        </div>
        <div>
          {!!favouritesProducts.data!.products.length && (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => addAllToCard(favouritesProducts.data!.products)}
            >
              Add all products to cart
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Favourites;
