import React from 'react'
import './css/Setup.css'
import VehicleCard from './VehicleCard'
import CharacterCard from './CharacterCard'
import ItemCard from './ItemCard'
import { Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Setup extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username: "",
            family: "",
            wallet: 100,
            characters:[],
            submittedVehicle: "",
            submittedCharacters: [],
            items: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/characters')
        .then(res => res.json())
        .then(chars => this.setState({characters: chars}))
    }

    handleChange=(e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    chooseVehicle=(e, vehicle)=>{
        e.preventDefault()
        this.setState({submittedVehicle: vehicle})
    }

    chooseCharacter=(e, character)=>{
        if(this.state.submittedCharacters.length < this.state.submittedVehicle.seats){
        this.setState({submittedCharacters:[...this.state.submittedCharacters, character]})
        } else {
            alert("Your vehicle can't hold that many people!")
        }
    }

    buyItem=(e, item)=>{
        if(this.state.wallet >= item.price){
            this.setState({
                wallet: this.state.wallet - item.price,
                items:[...this.state.items, item]})
        } else {
            alert("You can't afford that!")
        }
    }

    handleDeleteCharacter(e){
        this.setState({submittedCharacters: this.state.submittedCharacters.filter(character => character.id != e.target.dataset.id)})
    }
    
    handleDeleteItem(e){
        this.setState({items: this.state.items.filter(item => item.id != e.target.dataset.id)})
    }

    render(){
        return(
            <Grid id="setupForm" className="ui form">
                    <Grid.Row>
                    <Grid.Column width={3}></Grid.Column>
                        <Grid.Column width={10} >
                        <h2>Name your Family: </h2>
                        <input onChange={(e)=>this.handleChange(e)} type="text" name="family" placeholder="e.g. The Smiths" />
                        <h2>Please pick a vehicle: </h2>
                        <div id="setupVehicles">
                            {this.props.vehicles.map(vehicle => 
                            this.state.submittedVehicle == vehicle ? 
                            null
                            :
                            <VehicleCard vehicle={vehicle} chooseVehicle={this.chooseVehicle} />)}
                        </div>
                        </Grid.Column>
                        <Grid.Column width={3}>
                                {this.state.submittedVehicle ?
                                <div id="submittedVehicle">
                                    <VehicleCard vehicle={this.state.submittedVehicle} />
                                </div>
                                :
                                null
                                }
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                    <Grid.Column width={3}></Grid.Column>
                        <Grid.Column width={10} >
                        <h2>Pick {this.state.submittedVehicle ? this.state.submittedVehicle.seats : 5} characters to be in your family:</h2>
                        <div id="setupForm">
                            {this.state.characters.map(character => this.state.submittedCharacters.includes(character) ?
                            null
                            :
                            <CharacterCard handleClick={this.chooseCharacter} characterInfo={character} />)}
                        </div>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <div id="familyList" className="ui card">
                                <div className="header">Your Family</div>
                                <ul>
                                    {this.state.submittedCharacters.map(character=>{
                                    return(
                                    <li>{character.name} 
                                    <button data-id={character.id} onClick={(e)=>{this.handleDeleteCharacter(e)}}>X</button>
                                    </li>
                                    )})}
                                </ul>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                    <Grid.Column width={3}></Grid.Column>
                    <Grid.Column width={10} >
                        <div id="itemHeader">
                        <h2>Let's go shopping! You have ${this.state.wallet} left to spend!</h2>
                        </div>
                        <div id="setupInventory">
                            {this.props.items.map(item => this.state.items.includes(item) ?
                            null
                            :
                            <ItemCard buyItem={this.buyItem} itemData={item} />)}
                        </div>
                    </Grid.Column>
                    <Grid.Column width={3}>
                    <div  id="inventoryList" >
                            <div className="ui card">
                                <div className="header">Your Inventory:</div>
                                <div className="content">
                                    <ul>
                                        {this.state.items.map(item=>{
                                        return(
                                        <li>{item.name}
                                        <button data-id={item.id} onClick={(e)=>{this.handleDeleteItem(e)}}>X
                                        </button>
                                        </li>
                                        )})}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Grid.Column>
                    </Grid.Row>
                        <Link to={{
                                    pathname: "/game",
                                    state: {characters: this.state.submittedCharacters,
                                            vehicle: this.state.submittedVehicle,
                                            items: this.state.items,
                                            family: this.state.family}
                                }}
                                className="ui button primary"
                                >Let's Go</Link>
            </Grid>
        )
    }
}

export default Setup
