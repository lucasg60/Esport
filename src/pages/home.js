import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {    

    return (
        <div>
            <Link key={'rl'} to={`rl/ligues`}>Rocket League</Link>
            <Link key={'lol'} to={`lol/ligues`}>League of Legends</Link>
        </div>
    );
}

export default Home;