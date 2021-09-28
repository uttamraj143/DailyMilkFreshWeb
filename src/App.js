import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "components/login/Login";
import Dashboard from "components/Dashboard/Dashboard";
import Landing from "components/common/Landing";
require("dotenv").config({ path: "../.env" });

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact={true} path="*" component={Landing} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
