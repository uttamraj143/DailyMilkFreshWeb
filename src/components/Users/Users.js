import { useState, useEffect, useContext } from "react";
import UsersListing from "components/Users/UsersListing";
import AddUser from "components/Users/AddUser";
import Spinner from "spinner.png";
import { ReactComponent as UserBadge } from "components/svgs/users.svg";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import MiniNavbar from 'components/common/MiniNavbar';
import "./Users.scss";
import { listUsers } from "store/user";
import UserContext from "UserContext";

export default function Users() {
  const userInfo = useContext(UserContext);
  const [spinner, toggleSpinner] = useState(true);
  const [users, setUsers] = useState([]);
  const [addagenttoggle, toggleAddUser] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getAllUsers = () => {
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
    };
    getAllUsers();
  }, [userInfo.access_token, addagenttoggle, userInfo]);

  const addUserClicked = (e) => {
    e && e.preventDefault();
    toggleAddUser(!addagenttoggle);
  };

  return (
    <div className="Users__main-container">
      <div className="Orders__main-heading">
        <div className="General-main-heading">
          <UserBadge /> {"  "} Users
        </div>
        <div>
          <button
            className="Users__refresh-button"
            onClick={(e) => addUserClicked(e)}
          >
            {addagenttoggle ? "Cancel Adding" : "Add new User"}
          </button>
        </div>
      </div>

      {!spinner ? (
        <div>
          {addagenttoggle ? (
            <AddUser
              addUserClicked={addUserClicked}
              access_token={userInfo.access_token}
            ></AddUser>
          ) : (
            <>
              <UsersListing users={users}></UsersListing>

              <div className="Orders__pagination">
                <Stack spacing={2}>
                  <Pagination
                    // onChange={(event, val) => modifyOrders(event, val)}
                    variant="outlined"
                    color="primary"
                    boundaryCount={2}
                    count={
                      users.length % 2 === 0
                        ? users.length / 2
                        : Math.floor(users.length / 2) + 1
                    }
                    page={page}
                  />
                </Stack>
              </div>
            </>
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
