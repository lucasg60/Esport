import React, { Fragment } from "react";
import { BrowserRouter as Router, Redirect, Switch, Route, Link, useHistory  } from 'react-router-dom';
import Login from './pages/login';
import Ligue from './component/ligue';
import Match from './component/Match';
import Equipe from './component/Equipe';
import Home from './component/home';
import MatchPast from './component/MatchPast';
import MatchUpComing from './component/MatchUpComing';
import MatchRunning from './component/MatchRunning';

function App() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
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
          <Route path="/:game/past/:id" component={MatchPast}></Route>
          <Route path="/:game/upcoming/:id" component={MatchUpComing}></Route>
          <Route path="/:game/running/:id" component={MatchRunning}></Route>
          <Route path="/:game/equipe/:id" component={Equipe}></Route>
      </Switch>
    </Router>
  );
}

export default App;
