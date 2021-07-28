import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { PRODUCTS_ROUTE } from "../utils/consts";
import { publicRoutes } from "./routes";

const AppRouter = () => {
  return (
    <Switch>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      <Redirect to={PRODUCTS_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
