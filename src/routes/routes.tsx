import ProductPage from "../pages/ProductPage";
import ProductsList from "../pages/ProductsList";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import {
  LOGIN_ROUTE,
  PRODUCTS_ROUTE,
  PRODUCT_ROUTE,
  CART,
  HOME_ROUTE,
  FAVOURITES,
  ORGA_FRESH_CLIENT,
} from "../utils/consts";
import Home from "../pages/Home";
import Favourites from "../pages/Favoutites";

export const publicRoutes = [
  {
    path: ORGA_FRESH_CLIENT,
    Component: ProductsList,
  },
  {
    path: PRODUCTS_ROUTE,
    Component: ProductsList,
  },
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
  {
    path: PRODUCT_ROUTE + "/:id",
    Component: ProductPage,
  },
  {
    path: CART,
    Component: Cart,
  },
  {
    path: HOME_ROUTE,
    Component: Home,
  },
  {
    path: FAVOURITES,
    Component: Favourites,
  },
];
