import { useState, useEffect, useContext } from "react";
import AgentsListing from "components/Agents/AgentsListing";
import AddAgent from "components/Agents/AddAgent";
import Spinner from "spinner.png";

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
    listUsers(2, userInfo.access_token)
      .then((res) => {
        toggleSpinner(false);
        setAgents(res.data.data);
      })
      .catch((res) => {
        if (res.response.status === 401) {
          toggleSpinner(true);
          userInfo.refreshAccessToken();
        }
      });
  }, [userInfo.access_token, addagenttoggle]);

  const addAgentClicked = (e) => {
    e && e.preventDefault();
    toggleAddAgent(!addagenttoggle);
  };

  return (
    <div className="Agents__main-container">
      <div>
        <button
          className="Agents__refresh-button"
          onClick={(e) => addAgentClicked(e)}
        >
          {addagenttoggle ? "Cancel Adding" : "Add new Agent"}
        </button>
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
