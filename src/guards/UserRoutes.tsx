import jwtDecode from "jwt-decode";
import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface AdminRoutesProps extends RouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any;
}

const UserRoutes: React.FC<AdminRoutesProps> = ({ Component, ...rest }) => {
  const isUser = () => {
    const token = localStorage.getItem("token") || "";
    if (token) {
      const user: { email: string } = jwtDecode(token);
      return user.email !== "admin@gmail.com";
    } else {
      return false;
    }
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isUser() ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default UserRoutes;
