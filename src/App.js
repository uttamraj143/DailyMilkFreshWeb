import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './components/login/Login';
import FourZeroFour from './components/FourZeroFour';
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
          <Route exact={true} path="*" component={FourZeroFour} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
