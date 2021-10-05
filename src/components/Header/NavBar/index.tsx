import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "@material-ui/core/Container";
import Badge from "@material-ui/core/Badge";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

import {
  PRODUCTS_ROUTE,
  CART,
  HOME_ROUTE,
  FAVOURITES,
} from "../../../utils/consts";
import { getFavoutitesProducts } from "../../../state/favouritesProducts/selectors";
import { getCart } from "../../../state/cart/selectors";
import { getUser } from "../../../state/user/selectors";
import BurgerMenu from "./BurgerMenu";

import styles from "./NavBar.module.scss";

const NavBar = () => {
  const favouritesProducts = useSelector(getFavoutitesProducts);
  const cart = useSelector(getCart);
  const authorizedUser = useSelector(getUser);

  return (
    <div className={styles.container}>
      <Container>
        <div className={styles.innerContainer}>
          <div className={styles.burgerMenu}>
            <BurgerMenu />
          </div>
          <div className={styles.menuWithNav}>
            <NavLink to={`${PRODUCTS_ROUTE}`}>
              <p className={styles.logoOrga}>
                Orga<span className={styles.logoFresh}>Fresh</span>
              </p>
            </NavLink>
            <nav className={styles.navMenu}>
              <NavLink
                className={styles.navItem}
                activeClassName={styles.navItemActive}
                to={`${HOME_ROUTE}`}
              >
                Home
              </NavLink>
              <NavLink
                className={styles.navItem}
                activeClassName={styles.navItemActive}
                to={`${PRODUCTS_ROUTE}`}
              >
                Products
              </NavLink>
            </nav>
          </div>
          <div className={styles.innerContainer}>
            <div className={styles.iconContainer}>
              <Link to={FAVOURITES}>
                <Badge
                  color="primary"
                  badgeContent={favouritesProducts.data!.products.length}
                >
                  <FavoriteBorderIcon fontSize="large" />
                </Badge>
              </Link>
            </div>
            <div className={styles.iconContainer}>
              <Link to={CART}>
                <Badge
                  color="primary"
                  badgeContent={cart.data?.products.length || 0}
                >
                  <ShoppingCartOutlinedIcon fontSize="large" />
                </Badge>
              </Link>
            </div>
            {authorizedUser.data && (
              <div className={styles.iconContainer}>
                <PersonOutlineOutlinedIcon fontSize="large" />
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
