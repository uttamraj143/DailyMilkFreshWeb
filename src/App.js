import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/login/Login';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Landing from './components/Landing';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={AdminDashboard} />
          <Route exact={true} path="*" component={Landing} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
