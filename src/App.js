import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './pages/login';
import Ligue from './component/ligue';
import Match from './component/Match';
import Equipe from './component/Equipe';
import Home from './component/home';

function App() {
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <Router>

      <ul className="navbar-nav mr-auto">
        <li><Link to={'/'} className="nav-link"> Login </Link></li>
        <li><Link to={'/home'} className="nav-link"> Home </Link></li>
        <button onClick={handleLogout}>logout</button>
      </ul>

      <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path="/div/:game" component={Ligue}></Route>
          <Route path="/:game/ligues/:id" component={Match}></Route>
          <Route path="/:game/equipe/:id" component={Equipe}></Route>
      </Switch>
    </Router>
  );
}

export default App;
