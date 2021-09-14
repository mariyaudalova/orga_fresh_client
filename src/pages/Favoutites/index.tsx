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
import ProductsContainer from "../../components/ProductsContainer";

const Favourites = () => {
  const favouritesProducts = useSelector(getFavoutitesProducts);

  return (
    <div>
      <Container>
        {favouritesProducts.data!.products.map((product: ProductEntity) => {
          return <ProductsContainer key={product._id} product={product} />;
        })}
      </Container>
    </div>
  );
};

export default Favourites;
