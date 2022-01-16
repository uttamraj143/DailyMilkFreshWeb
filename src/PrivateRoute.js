import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const pastLogin = JSON.parse(localStorage.getItem("loggedIn"));

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return pastLogin ? <Outlet /> : <Navigate to="/login" />;
}
