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
import Bet from './component/Bet';
import Register from './component/Register';

function App() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  
  return (
    <Router>

      <ul class="navbar-nav">
        <Link to={'/home'} className="nav-link"><button class="nav-link"> Home </button></Link>
        <Link to={'/bet'} className="nav-link"><button class="nav-link"> Mes paris </button></Link>
        <button id="deco" onClick={handleLogout}>Déconnexion</button>
      </ul>

      <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route exact path='/register'>
            <Register />
          </Route>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/bet'>
            <Bet />
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
