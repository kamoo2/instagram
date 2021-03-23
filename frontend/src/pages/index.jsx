import React from "react";
import { Route } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import AccountRoutes from "./accounts";
import LoginRequiredRoute from "utils/LoginRequiredRoute";
import PostNew from "./PostNew";

const Root = () => {
  return (
    <>
      <LoginRequiredRoute exact path="/" component={Home} />
      <Route path="/about">
        <About />
      </Route>
      <LoginRequiredRoute exact path="/posts/new" component={PostNew} />
      <Route path="/accounts">
        <AccountRoutes />
      </Route>
    </>
  );
};

export default Root;
