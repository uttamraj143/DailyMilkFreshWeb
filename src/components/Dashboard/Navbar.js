import "./Navbar.scss";
import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "UserContext";

export default function Navbar(props) {
  const userInfo = useContext(UserContext);

  const [selectedMenuOption, setselectedMenuOption] = useState("Welcome");
  const [adminMenuOptions] = useState([
    {
      title: "Orders",
      value: "orders list",
    },
    {
      value: "agents list",
      title: "Agents",
    },
    {
      value: "users list",
      title: "Users",
    },
    {
      value: "Production Statistics",
      title: "Statistics",
    },
    {
      value: "settings",
      title: "settings",
    },
  ]);
  const [agentMenuOptions] = useState([
    {
      title: "Orders",
      value: "orders list",
    },
    {
      value: "settings",
      title: "settings",
    },
  ]);

  let history = useHistory();
  const openSidebarMenus = useRef();

  const handleLogout = (e) => {
    e.preventDefault();
    userInfo.toggleLogin(false);
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("isAdmin");
    return history.push("/");
  };

  const changeMenu = (e, sal) => {
    e.preventDefault();
    setselectedMenuOption(sal);
    props.currentMenuSelection(sal); // emitting data to parent
    openSidebarMenus.current.checked = false;
  };

  return (
    <div className="navbar">
      <div>
        <input
          type="checkbox"
          ref={openSidebarMenus}
          className="openSidebarMenu"
          id="openSidebarMenu"
        ></input>
        <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
          <div className="spinner diagonal part-1"></div>
          <div className="spinner horizontal"></div>
          <div className="spinner diagonal part-2"></div>
        </label>

        <div id="sidebarMenu">
          <div className="sidebarMenuHeader">
            {props.isAdmin ? "Admin" : "Agent"} Dashboard <br />{" "}
            <span>Have a Happy Day </span>
          </div>

          <ul className="sidebarMenuInner">
            {props.isAdmin
              ? adminMenuOptions.map((item, i) => {
                  return (
                    <li onClick={(e) => changeMenu(e, item.value)} key={i}>
                      <div>{item.title}</div>
                    </li>
                  );
                })
              : agentMenuOptions.map((item, i) => {
                  return (
                    <li onClick={(e) => changeMenu(e, item.value)} key={i}>
                      <div>{item.title}</div>
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>

      <div className="component-name">{selectedMenuOption}</div>

      <div onClick={handleLogout} className="logout-container">
        <div className="logout-image">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="white"
            className="bi bi-person-circle"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        </div>
        <div className="logout-text">LOGOUT</div>
      </div>
    </div>
  );
}
