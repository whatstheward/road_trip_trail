import React from 'react'
import './css/GameWindow.css'
import GameTracker from './GameTracker';
import PartyBar from './Partybar'
import { Grid, Select } from 'semantic-ui-react';

class GameWindow extends React.Component {
    state={locations:[],
            background: "https://cdn.stocksnap.io/img-thumbs/960w/XJ2BKV9ASS.jpg",
            headerText: "Welcome to The Road Trip Trail",
            buttonText: "Let's go!",
            counter: 0,
            progress: 0,
            difficulty: "easy",
            questions: []}

    componentDidMount(){
        fetch('http://localhost:3000/locations')
        .then(res=>res.json())
        .then(locationsArray=>this.setState({locations: locationsArray}))
    }

    handleClick=()=>{
        this.setState({ headerText: `Stop ${this.state.counter+1}: ${this.state.locations[this.state.counter].name}`,
                        background: this.state.locations[this.state.counter].imageUrl,
                        buttonText: "Continue",
                        progress: this.state.progress+10,
                        counter: this.state.counter+1})
    }

    handleChange=(e)=>{
        this.setState({difficult: e.target.value})
        fetch(`https://opentdb.com/api.php?amount=10&category=9&difficulty=${this.state.difficulty}&type=boolean`)
        .then(res => res.json())
        .then(data => this.setState({questions: data.results}))
    }

    gameStart(){
        return <div id="gameWindow" className="ui card" style={{backgroundImage: `url(${this.state.background})`}} >
        <h2 className="ui header block">{this.state.headerText}</h2>
        <div id="gameCard">
        <h1 id="gameCardText">Start your road trip!</h1>
        <div>
        <h2 id="gameCardText">Select your difficulty</h2>
        <select onChange={(e)=> this.handleChange(e)} >
            <option value="" >Difficulty:</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
        </div>
        <button onClick={()=>this.handleClick()} id="gameCardButton"><h3 id="gameCardText">{this.state.buttonText}</h3></button>
        </div>
    </div>
    }

    gamePlay(){
        return (
        <div id="gameWindow" className="ui card" style={{backgroundImage: `url(${this.state.background})`}} >
            <h2 className="ui header block">{this.state.headerText}</h2>
            <div id="gameCard">
                <h1 id="gameCardText">Question {this.state.counter}</h1>
                <h3 id="gameCardText">{this.state.questions[this.state.counter].question}</h3>

                <button onClick={()=>this.handleClick()} id="gameCardButton"><h3 id="gameCardText">{this.state.buttonText}</h3></button>
            </div>
        </div>
        )
    }

    runGame(){
        if(this.state.counter === 0){
            return this.gameStart()
        }else{
            return this.gamePlay()
        }
    }

    render(){
        return(
            <Grid >
            <Grid.Row>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column width={16}>
                {this.runGame()}
            </Grid.Column>
            <Grid.Column width={3}></Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <GameTracker progress={this.state.progress} />
                <PartyBar characters={this.props.characters} />
            </Grid.Row>
            </Grid>
        )
    }
}

export default GameWindow