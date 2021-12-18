import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "UserContext";

export default function PrivateRoute() {
  const userInfo = useContext(UserContext);
  const pastLogin = JSON.parse(localStorage.getItem("loggedIn"));

  const isLoggedIn = () => {
    return userInfo.isLoggedIn;
  };

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return pastLogin ? <Outlet /> : <Navigate to="/login" />;
}
