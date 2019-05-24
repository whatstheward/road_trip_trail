import React from 'react'
import './Gamepage.css'
import Partybar from '../components/Partybar'
import GameTracker from '../components/GameTracker';

class Gamepage extends React.Component{

    render(){
        return(
                <React.Fragment>
                    <Partybar />
                    <GameTracker />
                </React.Fragment>
        )
    }
}

export default Gamepage