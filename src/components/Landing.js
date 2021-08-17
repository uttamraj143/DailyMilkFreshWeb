import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const Landing = (props) => {
  const isLoggedIn = () => {
    return localStorage.getItem('loggedIn');
  };

  return (
    <div>
      {!isLoggedIn() ? <Redirect to="/login" /> : <Redirect to="/dashboard" />}
    </div>
  );
};

export default Landing;
