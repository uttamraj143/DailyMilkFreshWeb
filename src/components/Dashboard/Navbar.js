import './Navbar.scss';
import { useHistory } from 'react-router-dom';

export default function Navbar() {
  let history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('loggedIn');
    return history.push('/');
  };

  return (
    <div class="header">
      <div>
        <input
          type="checkbox"
          class="openSidebarMenu"
          id="openSidebarMenu"
        ></input>
        <label for="openSidebarMenu" class="sidebarIconToggle">
          <div class="spinner diagonal part-1"></div>
          <div class="spinner horizontal"></div>
          <div class="spinner diagonal part-2"></div>
        </label>

        <div id="sidebarMenu">
          <ul class="sidebarMenuInner">
            <li>
              Jelena Jovanovic <span>Web Developer</span>
            </li>
            <li>
              <a href="https://vanila.io">Company</a>
            </li>
            <li>
              <a href="https://instagram.com/plavookac">Instagram</a>
            </li>
            <li>
              <a href="https://twitter.com/plavookac">Twitter</a>
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UCDfZM0IK6RBgud8HYGFXAJg">
                YouTube
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/plavookac/">Linkedin</a>
            </li>
          </ul>
        </div>
      </div>
      <div>Component name</div>
      <div onClick={handleLogout} className="logout-container">
        <img
          class="logout-image"
          alt="dsds"
          src="https://pbs.twimg.com/profile_images/378800000639740507/fc0aaad744734cd1dbc8aeb3d51f8729_400x400.jpeg"
        ></img>
        <div class="logout-text">LOGOUT</div>
      </div>
    </div>
  );
}
