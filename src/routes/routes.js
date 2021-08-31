import ProductPage from "../pages/ProductPage";
import ProductsList from "../pages/ProductsList";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import {
  LOGIN_ROUTE,
  PRODUCTS_ROUTE,
  PRODUCT_ROUTE,
  CART,
} from "../utils/consts";

export const publicRoutes = [
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
];
