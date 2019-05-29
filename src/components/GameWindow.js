import React from 'react'
import './css/GameWindow.css'
import GameTracker from './GameTracker';
import Inventory from './Inventory'
import PartyBar from './Partybar'
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import Scoreboard from './Scoreboard'

class GameWindow extends React.Component {
    state={locations:[],
            background: "https://cdn.stocksnap.io/img-thumbs/960w/XJ2BKV9ASS.jpg",
            counter: 0,
            progress: 0,
            difficulty: "easy",
            questions: [],
            score: 0,
            characters: this.props.characters,
            items: this.props.items
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
                        counter: 1,
                        progress: 10})
    }
    useItem=(itemObj)=>{
        const characterObj = this.getLowestMorale()
        let index = this.state.items.indexOf(itemObj)
        console.log(index)
        let updateCharacters = this.state.characters.map(character=>{
            if(character.id === characterObj.id){
                character.morale = character.morale+1
                return character
            }else{
                return character
            }
        })
        let updateItems = [...this.state.items]
        updateItems.splice(index, 1)
        this.setState({characters: updateCharacters,
                        items: updateItems})
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

    getRandomCharacter=()=>{
        return Math.floor(Math.random()* Math.floor(this.props.characters.length))
    }

    getLowestMorale=()=>{
        let x = this.state.characters.reduce(function(a, b){
            return a.morale < b.morale ? a : b
        })
        return x
    }

    handleSelection = (question, answer) => {
        if(question.correct_answer == answer){
            this.setState({
                score: this.state.score + 100,
                counter: this.state.counter+1,
                progress: this.state.progress+10,
                background: this.state.locations[this.state.counter].imageUrl
            })
        } else {
            const x = this.getRandomCharacter()
            let characterObj = this.state.characters[x]
            let updateCharacters= this.state.characters.map(character=>{
                if(character.id === characterObj.id){
                    character.morale = character.morale - 1
                    if(character.morale < 1){
                        alert("YOU LOSE!")
                    }else{
                    return character}
                }else{
                    return character
                }
            })
            this.setState({characters: updateCharacters,
                            score: this.state.score - 100,
                            counter: this.state.counter+1,
                            progress: this.state.progress+10,
                            background: this.state.locations[this.state.counter].imageUrl})
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

    endGame=()=>{
        return(
            <div id="gameWindow" className="ui card" style={{backgroundImage: `url(${this.state.background})`}} >
                <div id="gameCard">
                    <h1 id="gameCardText">You've made it to your Destination!</h1>
                    <Link to={{
                        pathname: '/complete',
                        state:{
                                characters: this.state.characters,
                                vehicle: this.props.vehicle,
                                items: this.state.items,
                                family: this.props.family,
                                score: this.state.score
                        }
                    }} id="gameCardButton" className="ui button"><h3 id="gameCardText">Finish!</h3></Link>
                </div>
            </div>
        )
    }

    runGame(){
        if(this.state.counter === 0){
            return this.gameStart()
        }else if(this.state.counter === 10){
            return this.endGame()
        }else{
            return this.gamePlay()
        }
    }

    render(){
        return(
            <Grid >
            <Grid.Row>
            <Grid.Column width={3}>
                <Inventory useItem={this.useItem} items={this.state.items} />
            </Grid.Column>
            <Grid.Column width={10}>
                {this.runGame()}
            </Grid.Column>
            <Grid.Column width={3}>

            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column width={10}>
                <GameTracker location={this.state.locations[this.state.counter-1]} progress={this.state.progress} />
                <PartyBar characters={this.state.characters} />
            </Grid.Column>
            <Grid.Column width={3}></Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column>
                <Scoreboard />
              </Grid.Column>
            </Grid.Row>
            </Grid>
        )
    }
}

export default GameWindow
