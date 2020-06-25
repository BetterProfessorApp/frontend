import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = window.localStorage.getItem("token");
  console.log(token);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (token) {
          console.log("I am here");
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
