import React, { Component } from 'react';
import { Link, Redirect, Route } from 'react-router-dom';
import Login from '../pages/login';

class Match extends Component{

    constructor(props) {
        super(props);
        this.state = {
            matches: [],
        }
    } 
 
    async componentDidMount(){
        const reponse = await fetch('https://api.pandascore.co/'+this.props.match.params.game+'/matches?filter[league_id]='+this.props.match.params.id+'&token=rRcdDE_NFYnsdPhB_SgRMlITTj29-tgl2hVxZvfwmvlb5DdDghU');
        const data = await reponse.json();
        this.setState({
            matches: data
            
        })
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
            <div class="ombre">

                <Link class={"lien-jeux lien"} key='rl' id={this.props.match.params.id} to={`/${this.props.match.params.game}/past/${this.props.match.params.id}`}><button class="jeux">Match passé</button></Link>
            
            
                <Link class={"lien-jeux lien"} key='rl' id={this.props.match.params.id} to={`/${this.props.match.params.game}/upcoming/${this.props.match.params.id}`}><button class="jeux">Match à venir</button></Link>
            
            
                <Link class={"lien-jeux lien"} key='rl' id={this.props.match.params.id} to={`/${this.props.match.params.game}/running/${this.props.match.params.id}`}><button class="jeux">Match en cours</button></Link>
            
                
            </div>
        )
    }
  }
}

export default Match;