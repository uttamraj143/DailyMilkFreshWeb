import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserContext from "UserContext";
import Login from "components/login/Login";
import Dashboard from "components/Dashboard/Dashboard";
import Landing from "components/common/Landing";
require("dotenv").config({ path: "../.env" });

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <UserContext.Provider value="Here">
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact={true} path="*" component={Landing} />
          </UserContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}
