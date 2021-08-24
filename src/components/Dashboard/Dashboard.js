import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Dashboard.scss';
import Navbar from './Navbar';
import Orders from './Orders';
import Users from './Users.js';
import Agents from './Agents';
import Settings from './Settings';
import ExportData from './ExportData';
import Statistics from './Statistics';

export default function Dashboard() {
  const isAdmin = () => {
    return localStorage.getItem('isAdmin');
  };

  const isLoggedIn = () => {
    return localStorage.getItem('loggedIn');
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
            isAdmin={isAdmin}
            currentMenuSelection={currentSelection}
          ></Navbar>
          <div className="AgentDashboard__main-container">
            {isAdmin ? adminComponents() : agentComponents()}
          </div>
        </div>
      )}
    </div>
  );
}
