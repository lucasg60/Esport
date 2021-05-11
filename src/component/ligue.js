import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

class Ligue extends Component{

    constructor(props) {
        super(props);
        this.state = {
            ligues: [],
        }
    }

    async componentDidMount(){
        const reponse = await fetch('https://api.pandascore.co/'+this.props.match.params.game+'/leagues?token=rRcdDE_NFYnsdPhB_SgRMlITTj29-tgl2hVxZvfwmvlb5DdDghU');
        const data = await reponse.json();
        this.setState({
            ligues: data,
        })
    }

    render() {
        return(
            <div>
                {this.state.ligues.map(ligue => 
                    <Link key={ligue.id} game={this.props.match.params.game} to={`/${this.props.match.params.game}/ligues/${ligue.id}`}>
                        <img src={ligue.image_url}></img>
                        <p>{ligue.name}</p>
                    </Link>
                )}
            </div>
        )
    }
}

export default Ligue;