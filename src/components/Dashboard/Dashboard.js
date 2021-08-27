import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Dashboard.scss';
import Navbar from 'components/common/Navbar';
import Orders from 'components/Orders/Orders';
import Users from 'components/Users/Users.js';
import Agents from 'components/Agents/Agents';
import Settings from 'components/Dashboard/Settings';
import ExportData from 'components/Dashboard/ExportData';
import Statistics from 'components/Dashboard/Statistics';

export default function Dashboard() {
  const isAdmin = () => {
    return JSON.parse(localStorage.getItem('isAdmin'));
  };

  const isLoggedIn = () => {
    return JSON.parse(localStorage.getItem('loggedIn'));
  };
  const [currentComponent, setCurrentComponent] = useState('Welcome');

  const currentSelection = (sal) => {
    setCurrentComponent(sal);
  };

  const adminComponents = () => {
    switch (currentComponent) {
      case 'orders_list':
        return <Orders />;
      case 'agents_list':
        return <Agents />;
      case 'users_list':
        return <Users />;
      case 'export_data':
        return <ExportData />;
      case 'settings':
        return <Settings />;
      default:
        return <Statistics />;
    }
  };

  const agentComponents = () => {
    switch (currentComponent) {
      case 'settings':
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
          <Navbar
            isAdmin={isAdmin()}
            currentMenuSelection={currentSelection}
          ></Navbar>
          <div className="AgentDashboard__main-container">
            {isAdmin() ? adminComponents() : agentComponents()}
          </div>
        </div>
      )}
    </div>
  );
}
