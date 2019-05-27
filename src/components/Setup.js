import React from 'react'
import './css/Setup.css'
import VehicleCard from './VehicleCard'
import CharacterCard from './CharacterCard'

class Setup extends React.Component{
    constructor(props){
        super(props)    
        this.state={
            username: "",
            family: "",
            wallet: 1000,
            submittedVehicle: "",
            submittedCharacters: []
        }
    }
        
    componentDidMount(){
        fetch('http://localhost:3000/vehicles')
        .then(res => res.json())
        .then(cars => this.setState({vehicles: cars}))
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

    render(){
        return(
            <div id="container" className="ui container">
                    <form id="setupForm" className="ui form">
                        <label>Name your Family: </label>
                        <input onChange={(e)=>this.handleChange(e)} type="text" name="family" placeholder="e.g. The Smiths" />
                        <h4>Please pick a vehicle: </h4>
                        <div id="setupForm">
                            {this.props.vehicles.map(vehicle => <VehicleCard vehicle={vehicle} chooseVehicle={this.chooseVehicle} />)}
                        </div>
                        <h4>Pick {this.state.submittedVehicle ? this.state.submittedVehicle.seats : 5} characters to be in your family:</h4>
                        <div id="setupForm">
                            {this.props.characters.map(character => <CharacterCard handleClick={this.chooseCharacter} characterInfo={character} />)}
                        </div>
                        <button type="submit" className="ui button primary">Let's Go!</button>
                    </form>
            </div>
        )
    }
}

export default Setup