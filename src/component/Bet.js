import React, { Component} from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import Login from '../pages/login';

class Bet extends Component{

    constructor(props) {
        super(props);
        this.state = {
            bets: [],
            credits: 0,
            matchs: [],
        }
    }

    async componentDidMount(){
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser == null) {
            window.location = "http://localhost:3000/";
        } else {

            const reponse2 = await fetch('http://localhost:3003/users/'+localStorage.getItem("id"));
            const data2 = await reponse2.json();

            var match = [];
            for (let i = 0; i < data2.bet.length; i++) {
                const reponse = await fetch('https://api.pandascore.co/'+data2.bet[i].game+'/matches?filter[id]='+data2.bet[i].id_match+'&token=rRcdDE_NFYnsdPhB_SgRMlITTj29-tgl2hVxZvfwmvlb5DdDghU');
                const data = await reponse.json();
                
                match.push(data);
            }

            this.setState({
                matchs: match,
                bets: data2.bet,
                credits: data2.credit,
            })
        }
    }

    async verif() {

        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser == null) {
            window.location = "http://localhost:3000/";
        } else {

            const reponse8 = await fetch('http://localhost:3003/users/'+localStorage.getItem("id"));
            const data8 = await reponse8.json();
            
            
            for (let o = 0; o < data8.bet.length; o++) {
                var match2 = data8.bet[o].id_match;
                var winner2 = data8.bet[o].winner_id;
                var mise2 = data8.bet[o].mise;

                const reponse9 = await fetch('https://api.pandascore.co/'+data8.bet[o].game+'/matches?token=rRcdDE_NFYnsdPhB_SgRMlITTj29-tgl2hVxZvfwmvlb5DdDghU&filter[id]='+match2);
                const data9 = await reponse9.json();

                if(data9[0].winner_id != null) {
                    if (data9[0].winner_id == winner2) {
                        const requestOptions6 = {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: localStorage.getItem("email"), password: localStorage.getItem("password"), credit: data8.credit+(mise2*2)})
                        };
                        const reponse6 = await fetch('http://localhost:3003/users/'+localStorage.getItem("id"), requestOptions6);
                    }
                }
                
            }
        }
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
                    
                    <div style={{"text-align": "center", "margin": "50px 0"}}>
                        <p>Mes crédits : {this.state.credits}</p>
                        <button onClick={() => this.verif()}>Verifier paris</button>
                    </div>

                    {this.state.bets.map((bet, index) =>
                        <div class="ombre" style={{"text-align": "center"}}>
                            <div>
                                {this.state.matchs[index][0].opponents.map(opponent =>
                                    <img src={opponent.opponent.image_url}></img>
                                        
                                )}
                            </div>
                            
                            <p>Vous avez miser {bet.mise} crédits sur une victoire de {bet.name}</p>
                            {this.state.matchs[index][0].winner === null ? <p>Ce match n'a pas encore été jouer</p> : <p>Vainqueur du match : {this.state.matchs[index][0].winner.acronym}</p> }

                        </div>

                    )}
                        
                </div>
            )
        }
    }
}
export default Bet;