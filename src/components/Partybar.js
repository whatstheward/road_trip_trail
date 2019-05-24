import React from 'react'
import './Partybar.css'
import CharacterCard from './CharacterCard.js'
import { Header, Icon, Image, Menu, Segment, Sidebar, Card } from 'semantic-ui-react'

class Partybar extends  React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    render(){
        return(
                <div>
                    <CharacterCard />

                </div>
        )
    }
}

export default Partybar