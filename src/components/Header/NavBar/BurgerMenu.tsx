/* eslint-disable no-debugger, no-console */
import React, { useState, useEffect, useRef, useContext } from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleSharpIcon from "@material-ui/icons/AccountCircleSharp";

import { Link, NavLink } from "react-router-dom";

import styles from "./NavBar.module.scss";
import { PRODUCTS_ROUTE, LOGIN_ROUTE } from "../../../utils/consts";
import { useSelector } from "react-redux";
import { getUser } from "../../../state/user/selectors";
import HeaderState from "../../../context/HeaderState";

const BurgerMenu = () => {
  const drawerWidth = 240;

  const toggleSidebar = (useContext(HeaderState) as any).toggleSidebar;

  const isSidebarOpen = (useContext(HeaderState) as any).isSidebarOpen;

  console.log(isSidebarOpen);
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: "flex",
      },
      appBar: {
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: "none",
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
      },
      contentShift: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    })
  );
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const authorizedUser = useSelector(getUser);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const burgerMenuRef = useRef(null);
  const burgerMenuButtonRef = useRef(null);

  useEffect(() => {
    authorizedUser.data?.token && setToken(authorizedUser.data?.token);
  }, [authorizedUser]);

  const handleBurgerMenu = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    !(burgerMenuRef as any).current.contains(target) &&
      !(burgerMenuButtonRef as any).current.contains(target) &&
      handleDrawerClose();
  };

  useEffect(() => {
    document.addEventListener("click", handleBurgerMenu);
    window.addEventListener("resize", handleDrawerClose, true);
  }, []);

  const handleDrawerOpen = () => {
    toggleSidebar(true);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    toggleSidebar(false);
    setOpen(false);
  };

  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const logout = () => {
    localStorage.setItem("token", "");
    setToken("");
  };

  return (
    <>
      <div ref={burgerMenuButtonRef}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
      </div>
      <div ref={burgerMenuRef}>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={styles.drawerHeaderContainer}>
            <div className={styles.drawerHeader}>
              <NavLink to={`${PRODUCTS_ROUTE}`}>
                <p className={styles.drawerHeaderTitle}>Menu</p>
              </NavLink>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <ListItem>
              <ListItemIcon>
                <AccountCircleSharpIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  authorizedUser.data
                    ? capitalizeFirstLetter(authorizedUser.data.firstName) +
                      " " +
                      capitalizeFirstLetter(authorizedUser.data.lastName)
                    : "Guest Mode"
                }
                secondary={
                  !token ? (
                    <Link to={`${LOGIN_ROUTE}`}>Login or register</Link>
                  ) : (
                    <p onClick={logout}>Logout</p>
                  )
                }
              />
            </ListItem>
          </div>

          <Divider />
          <List>
            {[
              { name: "Home", icon: HomeIcon, routeName: PRODUCTS_ROUTE },
              {
                name: "Products",
                icon: ShoppingBasketIcon,
                routeName: PRODUCTS_ROUTE,
              },
            ].map((menuItem, index) => {
              const IconComponent = menuItem.icon;

              return (
                <ListItem button key={index}>
                  <ListItemIcon>
                    <IconComponent />
                  </ListItemIcon>
                  <NavLink to={menuItem.routeName}>
                    <ListItemText primary={menuItem.name} />
                  </NavLink>
                </ListItem>
              );
            })}
          </List>
          <Divider />

          <div className={styles.linksContainer}>
            <a className={styles.burgerLinks} href="tel:+380639384539">
              (+380) 639 384 539
            </a>
            <a
              className={styles.burgerLinks}
              href="mailto:OrganicFood@gmail.com?subject=Question"
            >
              OrganicFood@gmail.com
            </a>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default BurgerMenu;
