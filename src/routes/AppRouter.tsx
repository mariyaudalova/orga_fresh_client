import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import { getAuthorizedUser } from "../common/helpers/getAuthorizedUser";
import { ORGA_FRESH_CLIENT } from "../utils/consts";
import { publicRoutes } from "./routes";

const AppRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getAuthorizedUser(token, dispatch);
    }
  }, []);

  return (
    <Switch>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      <Redirect to={ORGA_FRESH_CLIENT} />
    </Switch>
  );
};

export default AppRouter;
