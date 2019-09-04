import React from 'react'
import './css/GameWindow.css'
import GameTracker from './GameTracker';
import Inventory from './Inventory'
import PartyBar from './Partybar'
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import Scoreboard from './Scoreboard'
import triviaCategories from '../helpers/triviaCategories'



class GameWindow extends React.Component {
    state={locations:[],
            background: "https://cdn.stocksnap.io/img-thumbs/960w/XJ2BKV9ASS.jpg",
            counter: 0,
            progress: 0,
            difficulty: "easy",
            questions: [],
            score: 0,
            randomAnswers: [],
            items: this.props.items
            }

    componentDidMount(){
    fetch('http://localhost:3000/locations')
    .then(res=>res.json())
    .then(locationsArray=>this.setState({locations: locationsArray}))
    fetch(`https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`)
        .then(res => res.json())
        .then(data => this.setState({questions: data.results}))
    }

    gameSetup=()=>{
        this.setState({ background: this.state.locations[this.state.counter].imageUrl,
                        counter: 1,
                        progress: 10})
    }

    forward = () => {
        this.setState({ background: this.state.locations[this.state.counter].imageUrl,
            counter: this.state.counter + 1,
            progress: this.state.progress + 10})
    }

    backward = (points) => {
        const x = this.getRandomCharacter()
        let characterObj = this.props.characters[x]
        let updateCharacters = this.props.characters.map(character=>{
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
            score: this.state.score - points})
    }

    useItem=(itemObj)=>{
        const characterObj = this.getLowestMorale()
        let toRemove = this.state.items.find(item => item.id == itemObj.id)
        debugger
        this.setState({items: this.state.items.filter(item => item.id != toRemove.id)})
        this.props.characters.find(character => character.id === characterObj.id).morale += 1

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
        fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)
        .then(res => res.json())
        .then(data =>{  if(data.response_code === 1){
                            alert(`Sorry, we don't have any ${difficulty} questions for ${categoryName}. Please pick again.`)
                            return null
                        }else{ 
                            this.setState({questions: data.results})}
                            this.gameSetup()})
        .catch(error => console.log(error))
        }

    gameStart(){
        return (
        <div id="gameWindow" className="ui card" style={{backgroundImage: `url(${this.state.background})`}} >
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
                <br/>
                <button type="submit" id="gameStartButton"><h3 id="gameCardText">Get questions</h3></button>
                </form>
                </div>
            </div>
        </div>
    )
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
        let points
        if(question.difficulty === 'easy'){
            points = 100
        }else if(question.difficulty === 'medium'){
            points = 200
        }else if(question.difficulty === 'hard'){
            points  = 300
        }
        if(question.correct_answer == answer){
            this.forward()
            this.setState({
                score: this.state.score + points,
                background: this.state.locations[this.state.counter].imageUrl,
                randomAnswers: []
            })
        } else {
            this.backward(points)
        }
    }

    gamePlay(){
        let trivia = this.state.questions[this.state.counter-1]
        let question = trivia.question.replace('"','')
        let answers = [...trivia.incorrect_answers, trivia.correct_answer]
        this.storeAnswers(answers)
        return (
        <div id="gameWindow" className="ui card" style={{backgroundImage: `url(${this.state.background})`}} >
            <h2 className="ui header block">Score: {this.state.score}</h2>
            <div id="gameCard">
                <h1 id="gameCardText">Question {this.state.counter}</h1>
                <h3 id="gameCardText" dangerouslySetInnerHTML={{__html: `${question}`}}></h3>
                <div id="gameCardAnswers">

                {this.state.randomAnswers.map(answer => {
                    return <button type="button" id="gameCardButton" onClick={()=>this.handleSelection(trivia, answer)}><h3 id="gameCardText" dangerouslySetInnerHTML={{__html: `${answer}`}}></h3></button>
                })}
                </div>
            </div>
        </div>
        )
    }

    storeAnswers(answers){
        for(let i = this.state.randomAnswers.length; i < 4; i++){
            let answer = answers[Math.floor(Math.random()*4)]
            if(this.state.randomAnswers.includes(answer)){
                this.storeAnswers(answers)
            }else{
                this.setState({randomAnswers: [...this.state.randomAnswers, answer]})
            }}
        }

    endGame=()=>{
        return(
            <div id="gameWindow" className="ui card" style={{backgroundImage: `url(${this.state.background})`}} >
                <div id="gameCard">
                    <h1 id="gameCardText">You've made it to your Destination!</h1>
                    <Link to={{
                        pathname: '/complete',
                        state:{
                                characters: this.props.characters,
                                vehicle: this.props.vehicle,
                                items: this.props.items,
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
                <PartyBar characters={this.props.characters} />
            </Grid.Column>
            <Grid.Column width={3}></Grid.Column>
            </Grid.Row>
            </Grid>
        )
    }
}

export default GameWindow
