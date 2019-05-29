import React from 'react'
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import CharacterCard from './CharacterCard';
import './css/Complete.css'
import { Grid } from 'semantic-ui-react'

class Complete extends React.Component{
    state={
        baseScore: this.props.location.state.score,
        moralePoints: this.props.location.state.characters.map(character=> parseInt(character.morale)).reduce(function(a,b){return a+b})*25
    }
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };
    
    render(){
        return(
            <div id="completeContainer">
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}></Grid.Column>
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
                        <h1>Total Score: {this.state.baseScore + this.state.moralePoints}</h1>
                    </Grid.Column>
                    <Grid.Column width={3}></Grid.Column>
                </Grid.Row>
            </Grid>
            </div>
        )
    }
}

export default withRouter(Complete)