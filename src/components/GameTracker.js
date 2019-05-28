import React from 'react'
import './css/GameTracker.css'
import { Progress } from 'semantic-ui-react'

const GameTracker =(props) => {
        return(
            <div id="gametracker">
                <Progress value={props.progress} percent={props.progress} indicating/>
            </div>
        )
    }

export default GameTracker