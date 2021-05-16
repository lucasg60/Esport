import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import Login from '../pages/login';

class Equipe extends Component{

    constructor(props) {
        super(props);
        this.state = {
            equipes: [],
        }
    }
 
    async componentDidMount(){
        const reponse = await fetch('https://api.pandascore.co/'+this.props.match.params.game+'/teams?filter[id]='+this.props.match.params.id+'&token=rRcdDE_NFYnsdPhB_SgRMlITTj29-tgl2hVxZvfwmvlb5DdDghU');
        const data = await reponse.json();
        this.setState({
            equipes: data
            
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
                
                {this.state.equipes.map(equipe =>
                    <div style={{"text-align": "center"}}>
                        <div class="ombre" style={{"text-align": "center", "margin-bottom": "30px"}}>
                            <p>{equipe.name} ({equipe.acronym})</p>
                            <img src={equipe.image_url}></img>
                        </div>

                        {equipe.players.map(player =>
                            <div class="ligues" style={{"text-align": "center"}}>
                                <img src={player.image_url}></img>
                                <p>{player.name}</p>
                                <p>Nationality : {player.nationality}</p>
                            </div>
                        )}
                        
                    </div>
                )}
            </div>
        )
    }
  }
}

export default Equipe;