import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import "./Dashboard.scss";
import Navbar from "components/common/Navbar";
import Orders from "components/Orders/Orders";
import Users from "components/Users/Users.js";
import Products from "components/Products/Products";
import Agents from "components/Agents/Agents";
import Settings from "components/Dashboard/Settings";
import ExportData from "components/Dashboard/ExportData";
import Statistics from "components/Dashboard/Statistics";
import UserContext from "UserContext";

export default function Dashboard() {
  const userInfo = useContext(UserContext);
  const isAdmin = () => {
    return userInfo.isAdmin;
  };

  const isLoggedIn = () => {
    return userInfo.isLoggedIn;
  };
  const [currentComponent, setCurrentComponent] = useState("Welcome");

  const currentSelection = (sal) => {
    setCurrentComponent(sal);
  };

  const adminComponents = () => {
    switch (currentComponent) {
      case "orders_list":
        return <Orders />;
      case "agents_list":
        return <Agents />;
      case "users_list":
        return <Users />;
      case "products_list":
        return <Products />;
      case "export_data":
        return <ExportData />;
      case "settings":
        return <Settings />;
      default:
        return <Statistics />;
    }
  };

  const agentComponents = () => {
    switch (currentComponent) {
      case "settings":
        return <Settings />;
      default:
        return <Orders />;
    }
  };

  return (
    <div>
      {!isLoggedIn() ? (
        <Redirect to="/login" />
      ) : (
        <div>
          <Navbar currentMenuSelection={currentSelection}></Navbar>
          <div className="AgentDashboard__main-container">
            {isAdmin() ? adminComponents() : agentComponents()}
          </div>
        </div>
      )}
    </div>
  );
}
