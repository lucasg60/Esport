import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Match extends Component{

    constructor(props) {
        super(props);
        this.state = {
            matches: [],
        }
    } 
 
    async componentDidMount(){
        const reponse = await fetch('https://api.pandascore.co/rl/matches?filter[league_id]='+this.props.match.params.id+'&token=rRcdDE_NFYnsdPhB_SgRMlITTj29-tgl2hVxZvfwmvlb5DdDghU');
        const data = await reponse.json();
        this.setState({
            matches: data
            
        })
    }

  render() {
    return(
        <div>
            
            {this.state.matches.map(matche =>
                <div style={{border:'1px solid black'}}>
                    <p>{matche.name}</p>
                    
                    {matche.opponents.map(opponent =>
                        <Link key={opponent.opponent.id} to={`/equipe/${opponent.opponent.id}`}>
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

export default Match;