import React from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { useSelector } from "react-redux";
import Badge from "@material-ui/core/Badge";
import { PRODUCTS_ROUTE, LOGIN_ROUTE, CART } from "../../../utils/consts";
import { getFavoutitesProducts } from "../../../state/favouritesProducts/selectors";
import styles from "./NavBar.module.scss";
import { getCart } from "../../../state/cart/selectors";
import { getUser } from "../../../state/user/selectors";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import BurgerMenu from "./BurgerMenu";

const NavBar = () => {
  const favouritesProducts = useSelector(getFavoutitesProducts);
  const cart = useSelector(getCart);
  const authorizedUser = useSelector(getUser);

  console.log("authorizedUser", authorizedUser);

  return (
    <div className={styles.container}>
      <Container>
        <div className={styles.innerContainer}>
          <div className={styles.burgerMenu}>
            <BurgerMenu />
          </div>

          <NavLink to={`${PRODUCTS_ROUTE}`}>
            <p className={styles.logoOrga}>
              Orga<span className={styles.logoFresh}>Fresh</span>
            </p>
          </NavLink>
          <nav className={styles.navMenu}>
            <NavLink
              className={styles.navItem}
              activeClassName={styles.navItemActive}
              to={`${LOGIN_ROUTE}`}
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
            <NavLink
              className={styles.navItem}
              activeClassName={styles.navItemActive}
              to={`${LOGIN_ROUTE}`}
            >
              About
            </NavLink>
            <NavLink
              className={styles.navItem}
              activeClassName={styles.navItemActive}
              to={`${LOGIN_ROUTE}`}
            >
              Blog
            </NavLink>
            <NavLink
              className={styles.navItem}
              activeClassName={styles.navItemActive}
              to={`${LOGIN_ROUTE}`}
            >
              Contact
            </NavLink>
          </nav>
          <div className={styles.innerContainer}>
            <div className={styles.iconContainer}>
              <Badge color="primary" badgeContent={favouritesProducts.length}>
                <FavoriteBorderIcon fontSize="large" />
              </Badge>
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