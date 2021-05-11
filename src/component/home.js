import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component{

    

    render() {
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

export default Home;