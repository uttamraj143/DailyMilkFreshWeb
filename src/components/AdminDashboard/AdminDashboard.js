import React from 'react';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function AdminDashboard() {
  let history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('loggedIn');
    return history.push('/');
  };

  const isLoggedIn = () => {
    return localStorage.getItem('loggedIn');
  };

  return (
    <div>
      {!isLoggedIn() ? (
        <Redirect to="/login" />
      ) : (
        <div>
          <h1>Dashboard</h1>
          <p>Secret Page</p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </div>
  );
}
