import React, { Component} from 'react';
import { Link } from 'react-router-dom';

class Match extends Component{

    constructor(props) {
        super(props);
        this.state = {
            matchs: [],
            bet: [],
            credit: 0
        }
    }

    async componentDidMount(){
        const reponse = await fetch('https://api.pandascore.co/'+this.props.match.params.game+'/matches/upcoming?filter[league_id]='+this.props.match.params.id+'&token=rRcdDE_NFYnsdPhB_SgRMlITTj29-tgl2hVxZvfwmvlb5DdDghU');
        const data = await reponse.json();
        this.setState({
            matchs: data
        })

        const reponse2 = await fetch('http://localhost:3003/users/'+localStorage.getItem("id"));
        const data2 = await reponse2.json();
        
        var bet = [];
        for (let z = 0; z < data2.bet.length; z++) {
            bet.push(data2.bet[z].id_match);
        }
        this.setState({
            bet: bet,
            credit: data2.credit
        })
    }

    async handleInputChange(event) {

        const reponse1 = await fetch('http://localhost:3003/users/'+localStorage.getItem("id"));
        const data1 = await reponse1.json();

        var winner = "";
        var name = "";
        var mise = document.getElementsByClassName(event)[0].children[1].children[0].value;
        if (document.getElementsByClassName(event)[0].children[0].children[0].children[0].checked == true) {
            winner = document.getElementsByClassName(event)[0].children[0].children[0].children[0].id;
        } else {
            winner = document.getElementsByClassName(event)[0].children[0].children[1].children[0].id;
        }
        
        for (let l = 0; l < this.state.matchs.length; l++) {
            for (let m = 0; m < this.state.matchs[l].opponents.length; m++) {
                if(winner == this.state.matchs[l].opponents[m].opponent.id) {
                    name = this.state.matchs[l].opponents[m].opponent.name;
                }
            }
        }

        var object = new Object();
        object.id_match = event;
        object.winner_id = winner;
        object.mise = mise;
        object.name = name;
        object.game = this.props.match.params.game;
        
        
        if (data1.bet.length == 0) {
            data1.bet.push(object);
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: localStorage.getItem("email"), password: localStorage.getItem("password"), bet: data1.bet})
            };
            const reponse = await fetch('http://localhost:3003/users/'+localStorage.getItem("id"), requestOptions);
            
            const requestOptions4 = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: localStorage.getItem("email"), password: localStorage.getItem("password"), credit: data1.credit-object.mise})
            };
            const reponse4 = await fetch('http://localhost:3003/users/'+localStorage.getItem("id"), requestOptions4);
        } else {
            var cont = 0;
            for (let i = 0; i < data1.bet.length; i++) {

                if (data1.bet[i].id_match == object.id_match) {
                    cont = 1;
                }
                
            }

            if (cont == 0) {
                data1.bet.push(object);
                const requestOptions = {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: localStorage.getItem("email"), password: localStorage.getItem("password"), bet: data1.bet})
                };
                const reponse = await fetch('http://localhost:3003/users/'+localStorage.getItem("id"), requestOptions);
                
                const requestOptions4 = {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: localStorage.getItem("email"), password: localStorage.getItem("password"), credit: data1.credit-object.mise})
                };
                const reponse4 = await fetch('http://localhost:3003/users/'+localStorage.getItem("id"), requestOptions4);
            }

        }

        document.location.reload();
        
    }

    render() {
        if(this.state.matchs.length == 0) {
            return (
                <div style={{margin: "50px 0", display: "flex" ,"justify-content": "center"}}>
                    <p>Il n'y a pas de match à venir pour cette ligue.</p>
                </div>
            )
        } else {
            return(
                <div>
                    {this.state.matchs.map(match =>
                        <div>
                            {match.opponents.length > 0 && 
                                <div class="ombre">
                                    <p className={"title-match"}>{match.name}</p>
                                    <div className={match.id}>
                                        <div style={{margin: "50px 0", display: "flex" ,"justify-content": "center"}}>
                                        {match.opponents.map(opponent =>
                                            
                                            <div class="team">
                                                {this.state.bet.indexOf(match.id) === -1 ? <input id={opponent.opponent.id} type="radio" name={match.id} value={opponent.opponent.id} /> : <div></div> }
                                                
                                                <Link key={opponent.opponent.id} game={this.props.match.params.game} to={`/${this.props.match.params.game}/equipe/${opponent.opponent.id}`}>
                                                    <img id={"img-equipe"} src={opponent.opponent.image_url}></img>
                                                </Link>
                                            </div> 
                                            
                                            
                                        )}
                                        </div>
                                        
                                        {this.state.bet.indexOf(match.id) === -1 ? <div class="mise"><input type="number" min="1" max={this.state.credit} /><button style={{"margin-top": "10px",width: "100%"}} onClick={() => this.handleInputChange(match.id)}>Validez</button></div> : <div class="mise">Vous avez deja parier sur ce match</div> }
                                    </div>
                                    
                                </div>
                            }
                        </div>

                    )}
                </div>
            )
        }
    }
}
export default Match;