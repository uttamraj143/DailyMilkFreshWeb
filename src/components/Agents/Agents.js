import { useState, useEffect, useContext } from "react";
import AgentsListing from "components/Agents/AgentsListing";
// import MiniNavbar from 'components/common/MiniNavbar';
import "./Agents.scss";
import { listUsers } from "store/user";
import UserContext from "UserContext";

export default function Agents() {
  const userInfo = useContext(UserContext);

  const [agents, setAgents] = useState([]);

  useEffect(() => {
    listUsers(2, userInfo.access_token).then((res) => {
      console.log(res.data.data);
      setAgents(res.data.data);
    });
  }, [userInfo.access_token]);

  return (
    <div className="Orders__main-container">
      {agents.length ? (
        <AgentsListing agents={agents}></AgentsListing>
      ) : (
        <div> </div>
      )}
    </div>
  );
}
