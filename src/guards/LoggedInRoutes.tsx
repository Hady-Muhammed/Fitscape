import jwtDecode from "jwt-decode";
import React from "react";
import { Token } from "../types/token";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface AdminRoutesProps extends RouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any;
}

const LoggedInRoutes: React.FC<AdminRoutesProps> = ({ Component, ...rest }) => {
  const isLoggedIn = () => {
    const token = localStorage.getItem("token");

    return token;
  };
  const isAdmin = () => {
    const token = localStorage.getItem("token") || "";

    const user = jwtDecode(token) as Token;
    return user.email === "admin@gmail.com";
  };
  const isUser = () => {
    const token = localStorage.getItem("token") || "";

    const user = jwtDecode(token) as Token;
    return user.email !== "admin@gmail.com";
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() && isAdmin() ? (
          <Redirect exact to="/dashboard" />
        ) : isLoggedIn() && isUser() ? (
          <Redirect exact to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default LoggedInRoutes;
