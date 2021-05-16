import React, { Component} from 'react';
import { Link } from 'react-router-dom';

class Match extends Component{

    constructor(props) {
        super(props);
        this.state = {
            matchs: [],
        }
    }

    async componentDidMount(){
        const reponse = await fetch('https://api.pandascore.co/'+this.props.match.params.game+'/matches/running?filter[league_id]='+this.props.match.params.id+'&token=rRcdDE_NFYnsdPhB_SgRMlITTj29-tgl2hVxZvfwmvlb5DdDghU');
        const data = await reponse.json();
        this.setState({
            matchs: data

        })
    }

    render() {
        return(
            <div class="ombre" style={{"text-align": "center"}}>
                {this.state.matchs.map(match =>
                    <div className={"match"}>
                        <p className={"title-match"}>{match.name}</p>
                        {match.opponents.map(opponent =>
                            <Link key={opponent.opponent.id} game={this.props.match.params.game} to={`/${this.props.match.params.game}/equipe/${opponent.opponent.id}`}>
                                <img id={"img-equipe"} src={opponent.opponent.image_url}></img>
                            </Link>
                        )}
                        {match.winner != null &&
                        <p className={"vainqueur"}>Vainqueur : {match.winner.name}</p>
                        }
                    </div>

                )}
            </div>
        )
    }
}
export default Match;