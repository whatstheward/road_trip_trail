import React from 'react'
import './css/Partybar.css'
import CharacterCard from './CharacterCard.js'
// import { Header, Icon, Image, Menu, Segment, Sidebar, Card } from 'semantic-ui-react'

class Partybar extends  React.Component{

    handleClick = () =>{
        console.log('clicked')
    }

    render(){
        return(
                <div id="partybar">
                    <div id="partycards">
                        {this.props.characters.map(character => <CharacterCard handleClick={this.handleClick} characterInfo={character}/>)}
                    </div>
                </div>
        )
    }
}

export default Partybar