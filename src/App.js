import './App.css';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import Register from './Components/Register';

function App() {
  return (
    <div className="App">
      <Router>
      <div className="header">
        <NavLink exact activeClassname="active" to="/">Home</NavLink>
          <NavLink activeClassname="active" to="/login">Login</NavLink>
          <NavLink  activeClassname="active" to="/register">Register</NavLink>
        <NavLink  activeClassname="active" to="/dashboard">Dashboard</NavLink>
      </div>
      <div className="content">
        <Switch>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path='/register' component={Register}></Route>
            <Route exact path='/dashboard' component={Dashboard}></Route>
        </Switch>
      </div>
          </Router>
    </div>

  );
}

export default App;
