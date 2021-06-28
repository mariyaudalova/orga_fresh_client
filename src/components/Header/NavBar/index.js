import React from "react";
import { NavLink } from "react-router-dom";
import { PRODUCTS_ROUTE, LOGIN_ROUTE } from "../../../utils/consts";
import styles from "./NavBar.module.scss";
import Icon from "../../Icon";

const NavBar = () => {
  return (
    <div className={styles.container}>
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
        <Icon
          className={styles.icon}
          type="headerHeart"
          color="black"
          width={35}
          height={35}
        />
        <Icon
          className={styles.iconLast}
          type="cart"
          color="black"
          width={35}
          height={35}
        />
      </div>
    </div>
  );
};

export default NavBar;
