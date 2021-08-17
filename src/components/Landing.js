import { Redirect } from 'react-router-dom';

const Landing = () => {
  const isLoggedIn = () => {
    return localStorage.getItem('loggedIn');
  };

  return (
    <div>
      {isLoggedIn() ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
    </div>
  );
};

export default Landing;
