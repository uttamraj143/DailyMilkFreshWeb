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

  useEffect(() => {
    listUsers(2, userInfo.access_token).then((res) => {
      setAgents(res.data.data);
    });
  }, [userInfo.access_token]);

  const addAgentClicked = (e) => {
    e.preventDefault();
    toggleAddAgent(!addagenttoggle);
  };

  return (
    <div className="Agents__main-container">
      {agents.length ? (
        <div>
          <div>
            <button
              className="Agents__refresh-button"
              onClick={(e) => addAgentClicked(e)}
            >
              {addagenttoggle ? "Cancel Adding" : "Add new Agent"}
            </button>
          </div>

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
