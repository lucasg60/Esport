import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './pages/login';
import Ligue from './pages/ligue';
import Match from './component/Match';
import Equipe from './component/Equipe';
import Home from './pages/home';

function App() {
  return (
    <Router>

      <ul className="navbar-nav mr-auto">
        <li><Link to={'/'} className="nav-link"> Login </Link></li>
        <li><Link to={'/home'} className="nav-link"> Home </Link></li>
      </ul>

      <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route exact path='/home'>
            <Home />
          </Route>
          <Route path='/:id/ligues'>
            <Ligue />
          </Route>
          <Route path="/ligues/:id" component={Match}></Route>
          <Route path="/equipe/:id" component={Equipe}></Route>
      </Switch>
    </Router>
  );
}

export default App;
