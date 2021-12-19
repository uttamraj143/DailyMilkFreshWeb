import { Link } from "react-router-dom";
import fourooo from "404.gif";

export default function Fournotfour() {
  return (
    <div className="main-container">
      Not found
      <Link to="/">Home</Link>
      <img height="500px" width="400px" src={fourooo} alt="Daily"></img>{" "}
    </div>
  );
}
