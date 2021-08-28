import { Redirect } from 'react-router-dom';

const Landing = () => {
  const isLoggedIn = () => {
    return JSON.parse(localStorage.getItem('loggedIn'));
  };

  return (
    <div>
      {isLoggedIn() ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
    </div>
  );
};

export default Landing;
