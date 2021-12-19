import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import "./Dashboard.scss";
import UserContext from "UserContext";

export default function Dashboard() {
  const userInfo = useContext(UserContext);
  const isAdmin = () => {
    return userInfo.isAdmin;
  };

  return (
    <div>
      {isAdmin() ? (
        <Navigate to="/statistics" />
      ) : (
        <Navigate to="/deliveries" />
      )}
    </div>
  );
}
