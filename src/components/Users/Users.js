import { useState, useEffect, useContext, useCallback } from "react";
import UsersListing from "components/Users/UsersListing";
import AddUser from "components/Users/AddUser";
import Spinner from "spinner.png";

// import MiniNavbar from 'components/common/MiniNavbar';
import "./Users.scss";
import { listUsers } from "store/user";
import UserContext from "UserContext";

export default function Users() {
  const userInfo = useContext(UserContext);
  const [spinner, toggleSpinner] = useState(true);
  const [users, setUsers] = useState([]);
  const [addagenttoggle, toggleAddUser] = useState(false);

  useEffect(() => {
    getAllUsers(userInfo.access_token);
  }, [userInfo.access_token, addagenttoggle]);

  const getAllUsers = useCallback(() => {
    listUsers(3, userInfo.access_token)
      .then((res) => {
        toggleSpinner(false);
        setUsers(res.data.data);
      })
      .catch((res) => {
        if (res && res.response && res.response.status === 401) {
          toggleSpinner(true);
          userInfo.refreshAccessToken();
        }
      });
  }, []);

  const addUserClicked = (e) => {
    e && e.preventDefault();
    toggleAddUser(!addagenttoggle);
  };

  return (
    <div className="Users__main-container">
      <div>
        <button
          className="Users__refresh-button"
          onClick={(e) => addUserClicked(e)}
        >
          {addagenttoggle ? "Cancel Adding" : "Add new User"}
        </button>
      </div>
      {!spinner ? (
        <div>
          {addagenttoggle ? (
            <AddUser
              addUserClicked={addUserClicked}
              access_token={userInfo.access_token}
            ></AddUser>
          ) : (
            <UsersListing users={users}></UsersListing>
          )}
        </div>
      ) : (
        <div className="Users__spinner">
          <img height="150px" width="150px" src={Spinner} alt="Daily"></img>
        </div>
      )}
    </div>
  );
}
