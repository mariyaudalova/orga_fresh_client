import React from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { useSelector } from "react-redux";
import Badge from "@material-ui/core/Badge";

import { PRODUCTS_ROUTE, LOGIN_ROUTE, CART } from "../../../utils/consts";
import { getFavoutitesProducts } from "../../../state/favouritesProducts/selectors";
import styles from "./NavBar.module.scss";
import Icon from "../../Icon";
import { getCart } from "../../../state/cart/selectors";

const NavBar = () => {
  const favouritesProducts = useSelector(getFavoutitesProducts);
  const cart = useSelector(getCart);

  return (
    <div className={styles.container}>
      <Container fixed>
        <div className={styles.innerContainer}>
          <NavLink to={`${PRODUCTS_ROUTE}`}>
            <p className={styles.logoOrga}>
              Orga<span className={styles.logoFresh}>Fresh</span>
            </p>
          </NavLink>
          <nav>
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
          <div>
            <Icon
              className={styles.icon}
              type="search"
              color="black"
              width={35}
              height={35}
            />
            <Badge
              color="error"
              badgeContent={favouritesProducts.length}
              showZero
            >
              <Icon
                className={styles.icon}
                type="headerHeart"
                color="black"
                width={35}
                height={35}
              />
            </Badge>

            <Link to={CART}>
              <Badge
                color="error"
                badgeContent={cart.data?.products.length || 0}
                showZero
              >
                <Icon
                  className={styles.iconLast}
                  type="cart"
                  color="black"
                  width={35}
                  height={35}
                />
              </Badge>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
