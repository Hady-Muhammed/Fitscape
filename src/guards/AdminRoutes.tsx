import jwtDecode from "jwt-decode";
import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface AdminRoutesProps extends RouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.ComponentType<any>;
}

const AdminRoutes: React.FC<AdminRoutesProps> = ({ Component }) => {
  const isAdmin = () => {
    const token = localStorage.getItem("token") || "";

    if (token) {
      const user: { email: string } = jwtDecode(token);

      return user.email === "admin@gmail.com";
    } else {
      return false;
    }
  };
  return (
    <Route
      render={(props) =>
        isAdmin() ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default AdminRoutes;
