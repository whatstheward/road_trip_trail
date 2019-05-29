import React from 'react'
import './css/CharacterCard.css'
import {Card, Image, Icon, Progress} from 'semantic-ui-react'
const CharacterCard =(props)=>{

    return(
        <div id="characterCard" className="ui card" onClick={(e)=>props.handleClick(e, props.characterInfo)}>
            <div id="cardContent" className=" ui content">
                <div className="frame">
                    <img className="ui small image" src={props.characterInfo.image_url}></img>
                </div>
                <h4> {props.characterInfo.name} </h4>
                <p><Icon name='heart' size='small' />Morale<Progress value={props.characterInfo.morale} total={4} size='tiny' indicating/></p>
            </div>
        </div>
    )
}

export default CharacterCard