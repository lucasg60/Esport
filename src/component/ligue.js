import React, { Component, useState, useEffect } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import Login from '../pages/login';

class Ligue extends Component{

    handleCheckboxChange = event => {
        this.setState({ checked: event.target.checked })
    }

    constructor(props) {
        super(props);
        this.state = {
            ligues: [],
            data: [],
            checked: true
        }
    }

    async componentDidMount(){
        const reponse = await fetch('https://api.pandascore.co/'+this.props.match.params.game+'/leagues?token=rRcdDE_NFYnsdPhB_SgRMlITTj29-tgl2hVxZvfwmvlb5DdDghU');
        const data = await reponse.json();
        this.setState({
            ligues: data,
        })

        const reponse2 = await fetch('http://localhost:3003/users/'+localStorage.getItem("id"));
        const data2 = await reponse2.json();
        const data3 = data2.favoris;
        this.setState({
            data: data3,
        })

        const fav = [];
        for (let a = 0; a < this.state.ligues.length; a++) {
            for (let b = 0; b < this.state.data.length; b++) {
                if(this.state.ligues[a].id == this.state.data[b]) {
                    fav.push(this.state.ligues[a]);
                    this.state.ligues.splice(a, 1)
                }
            }
        }
        this.setState({
            data: fav,
        })

    }

    async handleInputChange(event) {
        
        const reponse1 = await fetch('http://localhost:3003/users/'+localStorage.getItem("id"));
        const data1 = await reponse1.json();
        if(document.getElementById(event).checked == true){
            this.setState({ checked: false });
        } else {
            this.setState({ checked: true });
        }
        if(document.getElementById(event).checked == true){
            data1.favoris.push(event);
        } else {
            for( var i = 0; i < data1.favoris.length; i++){ 
                                   
                if ( data1.favoris[i] === event) { 
                    data1.favoris.splice(i, 1);
                    i--;
                }
            }
        }
        
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: localStorage.getItem("email"), password: localStorage.getItem("password"), favoris:data1.favoris})
        };
        const reponse = await fetch('http://localhost:3003/users/'+localStorage.getItem("id"), requestOptions);
        const data = await reponse.json();

        
        
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
            return(
                <div>
                    <div id="favoris">
                        <p>Favoris</p>  
                        {this.state.data.map(datas => 
                            <div>
                                <div>
                                    <input id={datas.id} checked={this.state.checked} type="checkbox" onChange={() => this.handleInputChange(datas.id)} />
                                    <Link key={datas.id} game={this.props.match.params.game} to={`/${this.props.match.params.game}/ligues/${datas.id}`}>
                                        <img src={datas.image_url}></img>
                                        <p>{datas.name}</p>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                    <div style={{width:'100%', border: '2px solid black'}}></div>
                    <div>
                        {this.state.ligues.map(ligue => 
                            <div>
                                <div>
                                    <input id={ligue.id} type="checkbox" onChange={() => this.handleInputChange(ligue.id)} />
                                    <Link key={ligue.id} game={this.props.match.params.game} to={`/${this.props.match.params.game}/ligues/${ligue.id}`}>
                                        <img src={ligue.image_url}></img>
                                        <p>{ligue.name}</p>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>   
                         
                </div>
            )
        }
    }
}

export default Ligue;