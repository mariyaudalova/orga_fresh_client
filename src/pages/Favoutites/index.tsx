import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";

import { ProductEntity } from "../../common/types";
import { getFavoutitesProducts } from "../../state/favouritesProducts/selectors";
import { addManyToCart } from "../../state/cart/actions";
import { clearFavouritesList } from "../../state/favouritesProducts/actions";
import ProductsContainer from "../../components/ProductsContainer";
import { PRODUCTS_ROUTE } from "../../utils/consts";

import styles from "./Favourites.module.scss";

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
          <div>
            {" "}
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
        </div>
        <div className={styles.productsContainer}>
          {favouritesProducts.data!.products.length > 0 ? (
            favouritesProducts.data!.products.map((product: ProductEntity) => {
              return <ProductsContainer key={product._id} product={product} />;
            })
          ) : (
            <p className={styles.noProductsWarning}>
              You don't have favourites products.
              <Link to={`${PRODUCTS_ROUTE}`}>
                <span className={styles.link}> Go back to Products list</span>
              </Link>
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Favourites;
