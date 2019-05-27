import React from 'react'
import './css/Partybar.css'
import CharacterCard from './CharacterCard.js'
// import { Header, Icon, Image, Menu, Segment, Sidebar, Card } from 'semantic-ui-react'

class Partybar extends  React.Component{
    constructor(){
        super()
        this.state={
            sessionCharacters: []
        }
    }
    handleClick = () =>{
        console.log('clicked')
    }

    componentDidMount(){
        fetch("http://localhost:3000/characters")
        .then(res => res.json())
        .then(characters => this.setState({sessionCharacters: characters}))
    }

    render(){
        return(
                <div id="partybar">
                    <div id="partycards">
                        {this.state.sessionCharacters.map(character => <CharacterCard handleClick={this.handleClick} characterInfo={character}/>)}
                    </div>
                </div>
        )
    }
}

export default Partybar