import logo from './logo.svg';
import './App.scss';
import Login from './components/login/login';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Login exact path="/login"></Login>
      </Router>
    </div>
  );
}

export default App;
