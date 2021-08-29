import './Settings.scss';
import { useState } from 'react';

export default function Settings() {
  const [selectedProfile, setSelectedProfile] = useState(true);
  const [user, setUserProfile] = useState({
    firstName: 'Chai',
    lastName: 'Arige',
    email: 'chai@arige.com',
    phoneNumber: '12345678',
    password: '',
  });

  const toggleProfileSelection = (e) => {
    e.preventDefault();
    setSelectedProfile(!selectedProfile);
  };

  const assignUserProfile = (e, formType) => {
    e.preventDefault();
    // e.persist();
    if (formType === 'firstName')
      setUserProfile({ ...user, firstName: e.target.value });
    if (formType === 'lastName')
      setUserProfile({ ...user, lastName: e.target.value });
    if (formType === 'password')
      setUserProfile({ ...user, password: e.target.value });
  };

  const submitUserProfile = (e) => {
    console.error('api error');
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
          value={user.firstName}
          onChange={(e) => assignUserProfile(e, 'firstName')}
          className="Settings__firstname"
          type="text"
          placeholder="First Name"
          name="firstName"
        ></input>
      </div>

      <div className="Settings__field-container">
        <label className="Settings__label">Last Name</label>
        <input
          onChange={(e) => assignUserProfile(e, 'lastName')}
          value={user.lastName}
          type="text"
          placeholder="Last Name"
          className="Settings__firstname"
        ></input>
      </div>

      {selectedProfile && (
        <div>
          <div className="Settings__field-container">
            <label className="Settings__label">Phone</label>
            <input
              readOnly
              value={user.phoneNumber}
              type="text"
              className="Settings__email"
            ></input>
          </div>

          <div className="Settings__field-container">
            <label className="Settings__label">Email</label>
            <input
              readOnly
              value={user.email}
              type="text"
              className="Settings__email"
            ></input>
          </div>
        </div>
      )}

      {!selectedProfile && (
        <div>
          <div className="Settings__field-container">
            <label className="Settings__label">Password</label>
            <input
              onChange={(e) => assignUserProfile(e, 'password')}
              value={user.password}
              type="password"
              className="Settings__email"
            ></input>
          </div>
          <div className="Settings__field-container">
            <input
              onClick={(e) => submitUserProfile(e)}
              value="Save"
              type="submit"
              className="Settings__submit"
            ></input>
          </div>
        </div>
      )}
    </div>
  );
}
