import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect , Link } from 'react-router-dom';
import Login from '../pages/login';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: [],
        }
    }

    render() {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser == null) {
            return (
                <div>
                    <Route exact path="/home">
                        <Redirect to="/" /> : <Login />
                    </Route>
                </div>
            );
        } else {
            var game = [{id:'rl', nom:'Rocket League'},{id:'lol', nom:'League of Legends'}];
            return(
            
                <div>
                    {game.map(game => 
                        <Link key={game.id} to={`/div/${game.id}`}>{game.nom}</Link>
                    )}
                    
                </div>
            )
        }
    }
}

export default Home;