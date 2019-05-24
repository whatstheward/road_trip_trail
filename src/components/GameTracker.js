import React from 'react'
import './css/GameTracker.css'

const Car = () => {

    return(
        <img id="car" src='https://icons-for-free.com/iconfiles/png/512/auto+beach+car+holiday+summer+tourer+tourism+transportation-1320086842109311540.png' />
    )
}

class GameTracker extends React.Component{

    render(){
        return(
            <div class="ui progress" data-percent="55">
            <div class="bar" style="width:55%"></div>
            <div class="label">Label</div>
          </div>
        )
    }
}

export default GameTracker