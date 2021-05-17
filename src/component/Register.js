import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import Home from '../component/home';
import jwt_decode from "jwt-decode";
import '../App.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password: password, credit: 100, favoris: [], bet: [] })
    };
    const reponse = await fetch('http://localhost:3003/register', requestOptions);
    const data = await reponse.json();
    if(data.accessToken != null){
      setUser(data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.accessToken));
      localStorage.setItem("email", username);
      localStorage.setItem("password", password);
      var decoded = jwt_decode(data.accessToken);
      localStorage.setItem("id", decoded.sub);
    }

    if (data == "Email already exists"){
      alert("Email already exists");
    }
  };

  if (user) {
    return (
      <div>
        <Route exact path="/register">
          <Redirect to="/home" /> : <Home />
        </Route>
      </div>
    );
  }

  return (
    <div class="container">
    
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Adresse mail: </label>
        <input
          type="text"
          value={username}
          placeholder="enter a username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <div>
          <label htmlFor="password">Mot de passe: </label>
          <input
            type="password"
            value={password}
            placeholder="enter a password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">inscription</button>
      </form>
    </div>
  );
};

export default Register;