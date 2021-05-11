import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import '../App.css';
import axios from 'axios';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  connexion = () =>{
    const mail = this.state.email;
    const pass = this.state.password;
    const info = { email: mail, password: pass };
    axios({
        method: 'post',
        url: 'http://localhost:3003/login',
        data: info
    })
    .then(function (reponse) {
        console.log(reponse);
    })
    .catch(function (erreur) {
        console.log(erreur);
    });
  }

  render() {
    return (
      <div className="Login">
        <Form>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </Form.Group>
          <button block size="lg" onClick={() => this.connexion()}>
            Login
          </button>
        </Form>
      </div>
    )
  }
}
