// import React, { Component } from "react";
// import Form from "react-bootstrap/Form";
// import '../App.css';
// import axios from 'axios';

// export default class Login extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: ""
//     };
//   }

//   connexion = () =>{
//     const mail = this.state.email;
//     const pass = this.state.password;
//     const info = { mail, pass };
//     axios({
//         method: 'post',
//         url: 'http://localhost:3003/login',
//         data: info
//     })
//     .then(function (reponse) {
//         console.log(reponse);
//     })
//     .catch(function (erreur) {
//         console.log(erreur);
//     });
//   }

//   render() {
//     return (
//       <div className="Login">
//         <Form>
//           <Form.Group size="lg" controlId="email">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               autoFocus
//               type="email"
//               value={this.state.email}
//               onChange={(e) => this.setState({ email: e.target.value })}
//             />
//           </Form.Group>
//           <Form.Group size="lg" controlId="password">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               value={this.state.password}
//               onChange={(e) => this.setState({ password: e.target.value })}
//             />
//           </Form.Group>
//           <button block size="lg" onClick={() => this.connexion()}>
//             Login
//           </button>
//         </Form>
//       </div>
//     )
//   }
// }

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../component/home';

const App = () => {
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
    const reponse = await fetch('http://localhost:3003/users');
    const data = await reponse.json();
    for (let i = 0; i < data.length; i++) {
      if(data[i].email == username && data[i].password == password){
        setUser(data[i]);
        localStorage.setItem("user", JSON.stringify(data[i]));
      }
    }
  };

  if (user) {
    return (
      <div>
        <Route exact path="/">
          <Redirect to="/home" /> : <Home />
        </Route>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          value={username}
          placeholder="enter a username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <div>
          <label htmlFor="password">password: </label>
          <input
            type="password"
            value={password}
            placeholder="enter a password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default App;