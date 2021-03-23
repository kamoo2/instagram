import React from "react";
import { Route, useRouteMatch } from "react-router";
import LoginRequiredRoute from "utils/LoginRequiredRoute";
import Login from "./Login";
import Profile from "./Profile";
import Signup from "./Signup";

const AccountRoutes = props => {
  const match = useRouteMatch();
  return (
    <>
      <Route path={match.url + "/login"}>
        <Login />
      </Route>
      <LoginRequiredRoute path={match.url + "/profile"} component={Profile} />
      <Route path={match.url + "/signup"}>
        <Signup />
      </Route>
    </>
  );
};

export default AccountRoutes;
