import React, { Component } from 'react';

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
    return(
        <div>
            
            {this.state.equipes.map(equipe =>
                <div>
                    <p>{equipe.name} ({equipe.acronym})</p>
                    <img src={equipe.image_url}></img>

                    {equipe.players.map(player =>
                        <div>
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

export default Equipe;