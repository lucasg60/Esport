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
            <div>
                
                {this.state.matches.map(matche =>
                    <div style={{border:'1px solid black'}}>
                        <p>{matche.name}</p>
                        
                        {matche.opponents.map(opponent =>
                            <Link key={opponent.opponent.id} game={this.props.match.params.game} to={`/${this.props.match.params.game}/equipe/${opponent.opponent.id}`}>
                                <img src={opponent.opponent.image_url}></img>
                            </Link>
                        )}

                        {matche.winner != null &&
                            <p>Winner : {matche.winner.name}</p>
                        }
                        
                        
                    </div>
                )}
            </div>
        )
    }
  }
}

export default Match;