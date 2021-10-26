import { useState, useEffect, useContext } from "react";
import AgentsListing from "components/Agents/AgentsListing";
import AddAgent from "components/Agents/AddAgent";
import Spinner from "spinner.png";
import { ReactComponent as UsersIcon } from "components/svgs/userBadge.svg";

// import MiniNavbar from 'components/common/MiniNavbar';
import "./Agents.scss";
import { listUsers } from "store/user";
import UserContext from "UserContext";

export default function Agents() {
  const userInfo = useContext(UserContext);
  const [agents, setAgents] = useState([]);
  const [addagenttoggle, toggleAddAgent] = useState(false);
  const [spinner, toggleSpinner] = useState(true);

  useEffect(() => {
    function getAllAgents() {
      listUsers(2, userInfo.access_token)
        .then((res) => {
          toggleSpinner(false);
          setAgents(res.data.data);
        })
        .catch((res) => {
          if (res && res.response && res.response.status === 401) {
            toggleSpinner(true);
            userInfo.refreshAccessToken();
          }
        });
    }
    getAllAgents();
  }, [userInfo.access_token, addagenttoggle, userInfo]);

  const addAgentClicked = (e) => {
    e && e.preventDefault();
    toggleAddAgent(!addagenttoggle);
  };

  return (
    <div className="Agents__main-container">
      <div className="Orders__main-heading">
        <div>
          <UsersIcon style={{ color: "#90a0ee" }} /> &nbsp; Agents
        </div>
        <div>
          <button
            className="Agents__refresh-button"
            onClick={(e) => addAgentClicked(e)}
          >
            {addagenttoggle ? "Cancel Adding" : "Add new Agent"}
          </button>
        </div>
      </div>

      {!spinner ? (
        <div>
          {addagenttoggle ? (
            <AddAgent
              addAgentClicked={addAgentClicked}
              access_token={userInfo.access_token}
            ></AddAgent>
          ) : (
            <AgentsListing agents={agents}></AgentsListing>
          )}
        </div>
      ) : (
        <div className="Agents__spinner">
          <img height="150px" width="150px" src={Spinner} alt="Daily"></img>
        </div>
      )}
    </div>
  );
}
