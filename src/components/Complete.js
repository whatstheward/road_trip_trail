import React from 'react'
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom'
import CharacterCard from './CharacterCard';
import './css/Complete.css'
import { Grid } from 'semantic-ui-react'
import Scoreboard from './Scoreboard';

class Complete extends React.Component{
    state={
        score: this.props.location.state.score,
        moralePoints: this.props.location.state.characters.map(character=> parseInt(character.morale)).reduce(function(a,b){return a+b})*25
    }
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    componentDidMount(){
        let totalScore = this.state.score + this.state.moralePoints
        fetch("http://localhost:3000/scores",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Token': localStorage.token
            },
            body: JSON.stringify({username: localStorage.username,
                                  score: totalScore})
                        })
            .then(res=> res.json())
            .then(data=>console.log(data))
    }
    
    render(){
        return(
            <div id="completeContainer">
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Scoreboard />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <h1>Trip Summary:</h1>
                        <h2>{this.props.location.state.family}</h2>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                <Grid.Column width={3}></Grid.Column>
                <Grid.Column width={10}>
                <h2>Morale Points: {this.state.moralePoints}</h2>
                <div id="complete">
                {this.props.location.state.characters.map(character => <CharacterCard characterInfo={character}/>)}
                </div>
                </Grid.Column>
                <Grid.Column width={3}></Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={3}></Grid.Column>
                    <Grid.Column width={10}>
                        <h1>Total Score: {this.state.score + this.state.moralePoints}</h1>
                        <Link to='/gamesetup' className="ui button is-warning">Play again?</Link>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                </Grid.Row>
            </Grid>
            </div>
        )
    }
}

export default withRouter(Complete)