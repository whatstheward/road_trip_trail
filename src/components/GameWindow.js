import React from 'react'
import './css/GameWindow.css'
import GameTracker from './GameTracker';
import PartyBar from './Partybar'
import { Grid, Select } from 'semantic-ui-react';

class GameWindow extends React.Component {
    state={locations:[],
            background: "https://cdn.stocksnap.io/img-thumbs/960w/XJ2BKV9ASS.jpg",
            counter: 0,
            progress: 0,
            difficulty: "easy",
            questions: [],
            score: 0,
            }
        componentDidMount(){
        fetch('http://localhost:3000/locations')
        .then(res=>res.json())
        .then(locationsArray=>this.setState({locations: locationsArray}))
        fetch(`https://opentdb.com/api.php?amount=10&category=9&difficulty=${this.state.difficulty}&type=boolean`)
        .then(res => res.json())
        .then(data => this.setState({questions: data.results}))
    }

    handleClick=()=>{
        this.setState({ headerText: `Stop ${this.state.counter+1}: ${this.state.locations[this.state.counter].name}`,
                        background: this.state.locations[this.state.counter].imageUrl,
                        counter: this.state.counter+1})
    }

    handleChange=(e)=>{
        this.setState({difficult: e.target.value})
        fetch(`https://opentdb.com/api.php?amount=11&category=9&difficulty=${this.state.difficulty}&type=boolean`)
        .then(res => res.json())
        .then(data => this.setState({questions: data.results}))
    }

    gameStart(){
        return <div id="gameWindow" className="ui card" style={{backgroundImage: `url(${this.state.background})`}} >
        <h2 className="ui header block">Welcome to The Road Trip Trail</h2>
        <div id="gameCard">
        <h1 id="gameCardText">Start your road trip!</h1>
        <div>
        <h2 id="gameCardText">Select your difficulty</h2>
        <select onChange={(e)=> this.handleChange(e)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
        </div>
        <button onClick={()=>this.handleClick()} id="gameCardButton"><h3 id="gameCardText">Let's Go!</h3></button>
        </div>
    </div>
    }

    handleSelection = (question, answer) => {
        if(question.correct_answer == answer){
            this.setState({
                score: this.state.score + 100,
                counter: this.state.counter+1,
                progress: this.state.progress+10,
                background: this.state.locations[this.state.counter].imageUrl
            })
        }
    }

    gamePlay(){
        let trivia = this.state.questions[this.state.counter-1]
        return (
        <div id="gameWindow" className="ui card" style={{backgroundImage: `url(${this.state.background})`}} >
            <h2 className="ui header block">Score: {this.state.score}</h2>
            <div id="gameCard">
                <h1 id="gameCardText">Question {this.state.counter}</h1>
                <h3 id="gameCardText">{trivia.question}</h3>
                <button type="button" id="gameCardButton" onClick={()=>this.handleSelection(trivia, "True")}><h3 id="gameCardText">True</h3></button>
                <button id="gameCardButton" onClick={()=>this.handleSelection(trivia, "False")}><h3 id="gameCardText">False</h3></button>
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
                {/* <PartyBar characters={this.props.characters} /> */}
            </Grid.Row>
            </Grid>
        )
    }
}

export default GameWindow