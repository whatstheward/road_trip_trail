import React from 'react'
import './css/GameTracker.css'
import { Progress } from 'semantic-ui-react'

const GameTracker =(props) => {
        return(
            <div id="gametracker">
                <Progress value={props.progress} percent={props.progress} indicating/>
                {props.location ? 
                <label>{props.location.name}</label>
                :
                null}
            </div>
        )
    }

export default GameTracker