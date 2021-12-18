import { useState, useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "PrivateRoute";
import UserContext from "UserContext";
import Login from "components/login/Login";
import Dashboard from "components/Dashboard/Dashboard";
// import Landing from "components/common/Landing";
import { refreshToken } from "store/auth";

export default function App() {
  const pastLogin = JSON.parse(localStorage.getItem("loggedIn"));
  const pastIsAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const pastAccessToken = sessionStorage.getItem("access_token");
  const pastRefreshToken = localStorage.getItem("refresh_token");
  const pastUserdetails = JSON.parse(localStorage.getItem("userDetails"));

  const [userDetails, setUserDetails] = useState(pastUserdetails || {});
  const [isLoggedIn, setIsLoggedIn] = useState(pastLogin || false);
  const [isAdmin, setIsAdmin] = useState(pastIsAdmin || false);
  const [access_token, setAccessToken] = useState(pastAccessToken || null);
  const [refresh_token, setRefreshToken] = useState(pastRefreshToken || null);

  useEffect(() => {
    if (!access_token) return localStorage.setItem("loggedIn", Boolean(false));
    localStorage.setItem("loggedIn", Boolean(isLoggedIn));
  }, [isLoggedIn, access_token]);

  useEffect(() => {
    if (!access_token) return localStorage.setItem("loggedIn", Boolean(false));
    localStorage.setItem("isAdmin", Boolean(isAdmin));
  }, [isAdmin, access_token]);

  useEffect(() => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, [userDetails]);

  useEffect(() => {
    sessionStorage.setItem("access_token", access_token);
  }, [access_token]);

  useEffect(() => {
    localStorage.setItem("refresh_token", refresh_token);
  }, [refresh_token]);

  const saveuserDetails = (data) => {
    setUserDetails(data);
  };

  const refreshAccessToken = () => {
    refreshToken(refresh_token).then((res) => {
      setAccessToken(res.data.access_token);
    });
  };

  const userSettings = {
    isLoggedIn: isLoggedIn,
    access_token: access_token,
    refresh_token: refresh_token,
    isAdmin: isAdmin,
    userDetails: userDetails,
    refreshAccessToken,
    setIsLoggedIn,
    setAccessToken,
    setIsAdmin,
    setRefreshToken,
    saveuserDetails,
  };

  return (
    <Router>
      <UserContext.Provider value={userSettings}>
        {/* <Navbar /> */}
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}
