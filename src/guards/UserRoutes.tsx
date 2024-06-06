// import jwtDecode from "jwt-decode";
// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const UserRoutes = () => {
//   const isUser = () => {
//     const token = localStorage.getItem("token") || "";
//     if (token) {
//       const user: { email: string } = jwtDecode(token);
//       return user.email !== "admin@gmail.com";
//     } else {
//       return false;
//     }
//   };
//   return isUser() ? <Outlet /> : <Navigate to="/signin" />;
// };

// export default UserRoutes;
