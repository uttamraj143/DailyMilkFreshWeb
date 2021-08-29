import './Settings.scss';
import { useState } from 'react';

export default function Settings() {
  const [selectedProfile, setSelectedProfile] = useState(true);
  const toggleProfileSelection = (e) => {
    e.preventDefault();
    setSelectedProfile(!selectedProfile);
  };

  return (
    <div className="Settings__main-container">
      <div className="Settings__heading-container">
        <div
          onClick={(e) => toggleProfileSelection(e)}
          className={
            selectedProfile
              ? 'Settings__heading-left Settings__heading-left-selected'
              : 'Settings__heading-left'
          }
        >
          Profile
        </div>
        <div
          onClick={(e) => toggleProfileSelection(e)}
          className={
            !selectedProfile
              ? 'Settings__heading-right Settings__heading-right-selected'
              : 'Settings__heading-right'
          }
        >
          Edit Profile
        </div>
      </div>

      <div className="Settings__field-container">
        <label className="Settings__label">First Name</label>
        <input
          className="Settings__firstname"
          type="text"
          placeholder="First Name"
        ></input>
      </div>

      <div className="Settings__field-container">
        <label className="Settings__label">Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          className="Settings__firstname"
        ></input>
      </div>

      <div className="Settings__field-container">
        <label className="Settings__label">Phone</label>
        <input
          readOnly
          value="99888888"
          type="text"
          className="Settings__email"
        ></input>
      </div>

      <div className="Settings__field-container">
        <label className="Settings__label">Email</label>
        <input
          readOnly
          value="admin@email.com"
          type="text"
          className="Settings__email"
        ></input>
      </div>

      <div className="Settings__field-container">
        <label className="Settings__label">Password</label>
        <input
          readOnly
          value="admin@email.com"
          type="password"
          className="Settings__email"
        ></input>
      </div>

      <div className="Settings__field-container">
        <input value="Save" type="submit" className="Settings__submit"></input>
      </div>
    </div>
  );
}
