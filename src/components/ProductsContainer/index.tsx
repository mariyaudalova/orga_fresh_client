/* eslint-disable */
import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";

import Modal from "../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getFavoutitesProducts } from "../../state/favouritesProducts/selectors";
import ProductCard from "../../components/ProductCard";
import { toggleFavorite } from "../../state/favouritesProducts/actionsCreators";
import { ProductEntity, ProductsData } from "../../common/types";
import { addToCartCreator } from "../../state/cart/actionsCreators";
import { getCart } from "../../state/cart/selectors";

const ProductsContainer = (props: { product: ProductEntity }) => {
  const { product } = props;
  const favouritesProducts = useSelector(getFavoutitesProducts);
  const userCart = useSelector(getCart);

  const dispatch = useDispatch();

  const toggleFavoriteClick = (product: ProductEntity) => {
    dispatch(toggleFavorite(product));
  };

  const onAddToCart = (product: ProductEntity) => {
    dispatch(addToCartCreator(product));
  };

  const isFavourite = (id: string) => {
    return !!favouritesProducts.data!.products.find(
      (favouriteProduct: ProductEntity) => favouriteProduct._id === id
    );
  };

  const isInCart = (product: ProductEntity) => {
    return !!userCart.data?.products.find(
      (cartItem: ProductEntity) => cartItem._id === product._id
    );
  };

  return (
    <ProductCard
      key={product._id}
      isFavourite={isFavourite(product._id)}
      product={product}
      toggleFavoriteClick={toggleFavoriteClick}
      addToCart={onAddToCart}
      isInCart={isInCart(product)}
    />
  );
};

export default ProductsContainer;
