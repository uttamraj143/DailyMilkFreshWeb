import { Redirect } from "react-router-dom";

import { useContext } from "react";
import UserContext from "UserContext";

const Landing = () => {
  const userInfo = useContext(UserContext);

  const isLoggedIn = () => {
    return userInfo.isLoggedIn;
  };

  return (
    <div>
      {isLoggedIn() ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
    </div>
  );
};

export default Landing;
