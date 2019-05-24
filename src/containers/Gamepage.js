import React from 'react'
import Partybar from '../components/Partybar'

class Gamepage extends React.Component{

    render(){
        return(
            <div className="ui container" style={{ marginTop: 50+'px' }}>
                <Partybar />
            </div>
        )
    }
}

export default Gamepage