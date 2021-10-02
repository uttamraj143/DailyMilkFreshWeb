import "./Settings.scss";
import { useState, useContext } from "react";
import UserContext from "UserContext";

export default function Settings() {
  const userInfo = useContext(UserContext);
  const [selectedProfile, setSelectedProfile] = useState(true);
  const [user, setUserProfile] = useState({
    name: userInfo.user || "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const toggleProfileSelection = (e) => {
    e.preventDefault();
    setSelectedProfile(!selectedProfile);
  };

  const assignUserProfile = (e, formType) => {
    e.preventDefault();
    e.persist();
    if (selectedProfile) return;
    if (formType === "firstName")
      setUserProfile({ ...user, name: e.target.value });
    if (formType === "password")
      setUserProfile({ ...user, password: e.target.value });
  };

  const submitUserProfile = (e) => {
    console.error("api error");
  };

  return (
    <div className="Settings__main-container">
      <div className="Settings__heading-container">
        <div
          onClick={(e) => toggleProfileSelection(e)}
          className={
            selectedProfile
              ? "Settings__heading-left Settings__heading-left-selected"
              : "Settings__heading-left"
          }
        >
          Profile
        </div>
        <div
          onClick={(e) => toggleProfileSelection(e)}
          className={
            !selectedProfile
              ? "Settings__heading-right Settings__heading-right-selected"
              : "Settings__heading-right"
          }
        >
          Edit Profile
        </div>
      </div>

      <div className="Settings__field-container">
        <label className="Settings__label">Name</label>
        <input
          value={user.firstName}
          onChange={(e) => assignUserProfile(e, "name")}
          className="Settings__firstname"
          type="text"
          placeholder="Name"
          name="firstName"
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
              onChange={(e) => assignUserProfile(e, "password")}
              value={user.password}
              type="password"
              className="Settings__password"
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
