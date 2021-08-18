import './Navbar.scss';
import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

export default function Navbar(props) {
  const [selectedMenuOption, setselectedMenuOption] = useState('Welcome Agent');
  const [adminMenuOptions] = useState([
    {
      title: 'Orders',
      value: 'orders list',
    },
    {
      value: 'agents list',
      title: 'Agents',
    },
    {
      value: 'users list',
      title: 'Users',
    },
    {
      value: 'Production Statistics',
      title: 'Statistics',
    },
    {
      value: 'settings',
      title: 'settings',
    },
  ]);
  const [agentMenuOptions] = useState([
    {
      title: 'Orders',
      value: 'orders list',
    },
    {
      value: 'settings',
      title: 'settings',
    },
  ]);

  let history = useHistory();
  const openSidebarMenus = useRef();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('isAdmin');
    return history.push('/');
  };

  const changeMenu = (e, sal) => {
    e.preventDefault();
    setselectedMenuOption(sal);
    props.currentMenuSelection(sal); // emitting data to parent
    openSidebarMenus.current.checked = false;
  };

  return (
    <div className="header">
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
            {props.isAdmin ? 'Admin' : 'Agent'} Dashboard <br />{' '}
            <span>Have a Happy Day </span>
          </div>

          <ul className="sidebarMenuInner">
            {props.isAdmin
              ? adminMenuOptions.map((item, i) => {
                  return (
                    <li key={i}>
                      <div onClick={(e) => changeMenu(e, item.value)}>
                        {item.title}
                      </div>
                    </li>
                  );
                })
              : agentMenuOptions.map((item, i) => {
                  return (
                    <li key={i}>
                      <div onClick={(e) => changeMenu(e, item.value)}>
                        {item.title}
                      </div>
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>

      <div className="component-name">{selectedMenuOption}</div>

      <div onClick={handleLogout} className="logout-container">
        <img
          className="logout-image"
          alt="dsds"
          src="https://pbs.twimg.com/profile_images/378800000639740507/fc0aaad744734cd1dbc8aeb3d51f8729_400x400.jpeg"
        ></img>
        <div className="logout-text">LOGOUT</div>
      </div>
    </div>
  );
}
