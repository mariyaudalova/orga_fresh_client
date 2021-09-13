/* eslint-disable */
import React from "react";
import Container from "@material-ui/core/Container";

import Modal from "../../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getFavoutitesProducts } from "../../state/favouritesProducts/selectors";
import ProductCard from "../../components/ProductCard";
import { toggleFavorite } from "../../state/favouritesProducts/actionsCreators";
import { ProductEntity } from "../../common/types";
import { addToCartCreator } from "../../state/cart/actionsCreators";
import { getCart } from "../../state/cart/selectors";

const Favourites = () => {
  const favouritesProducts = useSelector(getFavoutitesProducts);
  const userCart = useSelector(getCart);

  const dispatch = useDispatch();

  const toggleFavoriteClick = (product: ProductEntity) => {
    dispatch(toggleFavorite(product));
  };

  const onAddToCart = (id: string) => {
    dispatch(addToCartCreator(id));
  };

  const isInCart = (product: ProductEntity) => {
    return !!userCart.data?.products.find(
      (cartItem: any) => cartItem._id === product._id
    );
  };

  return (
    <div>
      <Container>
        {favouritesProducts.data.products.map((product: ProductEntity) => {
          return (
            <ProductCard
              key={product._id}
              isFavourite={true}
              product={product}
              toggleFavoriteClick={toggleFavoriteClick}
              addToCart={onAddToCart}
              isInCart={isInCart(product)}
            />
          );
        })}
      </Container>
    </div>
  );
};

export default Favourites;
