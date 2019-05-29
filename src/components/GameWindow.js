import React from 'react'
import './css/GameWindow.css'
import GameTracker from './GameTracker';
import Inventory from './Inventory'
import PartyBar from './Partybar'
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import Scoreboard from './Scoreboard'

const triviaCategories = 
    [{"id": 0, "name": "All"},
    {"id": 9, "name": "General Knowledge"},
    {"id": 10, "name": "Entertainment: Books"},
    {"id": 11, "name": "Entertainment: Film"},
    {"id": 12, "name": "Entertainment: Music"},
    {"id": 13, "name": "Entertainment: Musicals & Theatres"},
    {"id": 14, "name": "Entertainment: Television"},
    {"id": 15, "name": "Entertainment: Video Games"},
    {"id": 16, "name": "Entertainment: Board Games"},
    {"id": 17, "name": "Science & Nature"},
    {"id": 18, "name": "Science: Computers"},
    {"id": 19, "name": "Science: Mathematics"},
    {"id": 20, "name": "Mythology"},
    {"id": 21, "name": "Sports"},
    {"id": 22, "name": "Geography"},
    {"id": 23, "name": "History"},
    {"id": 24, "name": "Politics"},
    {"id": 25, "name": "Art"},
    {"id": 26, "name": "Celebrities"},
    {"id": 27, "name": "Animals"},
    {"id": 28, "name": "Vehicles"},
    {"id": 29, "name": "Entertainment: Comics"},
    {"id": 30, "name": "Science: Gadgets"},
    {"id": 31, "name": "Entertainment: Japanese Anime & Manga"},
    {"id": 32, "name": "Entertainment: Cartoon & Animations"}
    ]

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
    fetch(`https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean`)
        .then(res => res.json())
        .then(data => this.setState({questions: data.results}))
    }

    gameSetup=()=>{
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

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    getQuestions=(e)=>{
        e.preventDefault()
        let difficulty = e.target.difficulty.value
        let category = e.target.category.value
        let categoryName = e.target.category[e.target.category.selectedIndex].text
        if (category === 0){
            fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
            .then(data =>{  if(data.response_code === 1){
                alert(`Sorry, we don't have any ${difficulty} questions for ${categoryName}. Please pick again.`)
                return null
            }else{ 
                this.setState({questions: data.results})}
                this.gameSetup()})
        }else{
        fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=boolean`)
        .then(res => res.json())
        .then(data =>{  if(data.response_code === 1){
                            alert(`Sorry, we don't have any ${difficulty} questions for ${categoryName}. Please pick again.`)
                            return null
                        }else{ 
                            this.setState({questions: data.results})}
                            this.gameSetup()})
        .catch(error => console.log(error))
        }}

    gameStart(){
        return <div id="gameWindow" className="ui card" style={{backgroundImage: `url(${this.state.background})`}} >
        <h2 className="ui header block">Welcome to The Road Trip Trail</h2>
        <div id="gameCard">
        <h1 id="gameCardText">Start your road trip!</h1>
        <div>
        <form onSubmit={(e)=>this.getQuestions(e)}>
        <h2 id="gameCardText">Select your difficulty</h2>
        <select name="difficulty">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
        <h2 id="gameCardText">Select your category</h2>
        <select name="category">
            {triviaCategories.map(category=> <option value={category.id}>{category.name}</option>)}
        </select>
        <br></br>
        <button type="submit" id="gameCardButton"><h3 id="gameCardText">Get questions</h3></button>
        </form>
        </div>
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
        let points = 0
        if(question.difficulty === 'easy'){
            points = 100
        }else if(question.difficulty === 'medium'){
            points = 200
        }else if(question.difficulty === 'hard'){
            points  = 300
        }
        if(question.correct_answer == answer){
            this.setState({
                score: this.state.score + points,
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
                            score: this.state.score - points,
                            counter: this.state.counter+1,
                            progress: this.state.progress+10,
                            background: this.state.locations[this.state.counter].imageUrl})
        }
    }

    gamePlay(){
        let trivia = this.state.questions[this.state.counter-1]
        let question = trivia.question.replace('"','')
        return (
        <div id="gameWindow" className="ui card" style={{backgroundImage: `url(${this.state.background})`}} >
            <h2 className="ui header block">Score: {this.state.score}</h2>
            <div id="gameCard">
                <h1 id="gameCardText">Question {this.state.counter}</h1>
                <h3 id="gameCardText" dangerouslySetInnerHTML={{__html: `${question}`}}></h3>
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
                <Scoreboard />
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column width={3}></Grid.Column>
            <Grid.Column width={10}>
                <GameTracker location={this.state.locations[this.state.counter-1]} progress={this.state.progress} />
                <h2 style={{margin: '-.5em'}}>{this.props.family}</h2>
                <PartyBar characters={this.state.characters} />
            </Grid.Column>
            <Grid.Column width={3}></Grid.Column>
            </Grid.Row>
            </Grid>
        )
    }
}

export default GameWindow
