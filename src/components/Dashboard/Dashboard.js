import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AgentDashboard from './AgentDashboard';

export default function Dashboard() {
  const [isAdmin, setIsAdmin] = useState(false);

  const isLoggedIn = () => {
    return localStorage.getItem('loggedIn');
  };

  return (
    <div>
      {!isLoggedIn() ? (
        <Redirect to="/login" />
      ) : (
        <div>
          {isAdmin ? (
            <AdminDashboard></AdminDashboard>
          ) : (
            <AgentDashboard></AgentDashboard>
          )}
        </div>
      )}
    </div>
  );
}
