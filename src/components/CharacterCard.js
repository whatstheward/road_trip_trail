import React from 'react'
import './css/CharacterCard.css'
import {Card, Image, Icon} from 'semantic-ui-react'
const CharacterCard =(props)=>{

    return(
        <div id="characterCard" className="ui card" onClick={(e)=>props.handleClick(e, props.characterInfo)}>
            <div id="cardContent" className=" ui content">
                <div className="frame">
                    <img className="ui small image" src={props.characterInfo.image_url}></img>
                </div>
                <h4> {props.characterInfo.name} </h4>
                <p><Icon name='heart' size='small' /> {props.characterInfo.morale}/10 </p>
            </div>
        </div>
    )
}

export default CharacterCard