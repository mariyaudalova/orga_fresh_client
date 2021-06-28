import ProductPage from "../pages/ProductPage";
import ProductsList from "../pages/ProductsList";
import { LOGIN_ROUTE, PRODUCTS_ROUTE, PRODUCT_ROUTE } from "../utils/consts";

export const publicRoutes = [
  {
    path: PRODUCTS_ROUTE,
    Component: ProductsList,
  },
  {
    path: LOGIN_ROUTE,
    Component: ProductsList,
  },
  {
    path: PRODUCT_ROUTE + "/:id",
    Component: ProductPage,
  },
];
