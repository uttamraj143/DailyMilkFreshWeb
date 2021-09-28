import { useState } from "react";
import AgentsListing from "components/Agents/AgentsListing";
// import MiniNavbar from 'components/common/MiniNavbar';
import "./Agents.scss";

export default function Agents() {
  const [agents, setAgents] = useState([
    {
      customername: "subramanyam P",
      Products: ["Cow Milk", "Buffallo Milk"],
      address: "Ashok nagar",
      QRNumber: "25",
    },
    {
      customername: "Chai",
      Products: ["Cow Milk", "Buffallo Milk"],
      address: "Ashok nagar",
      QRNumber: "26",
    },
  ]);

  return (
    <div className="Orders__main-container">
      <AgentsListing agents={agents}></AgentsListing>
    </div>
  );
}
