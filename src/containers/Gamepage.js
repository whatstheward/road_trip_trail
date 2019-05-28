import React from 'react'
import './Gamepage.css'
import Partybar from '../components/Partybar'
import Windshield from '../components/Windshield';
import { Grid } from 'semantic-ui-react'

class Gamepage extends React.Component{
    state={locations: []}
        
    render(){
        return(
        <div>
            <Windshield  characters={this.props.location.state.characters} vehicle={this.props.location.state.vehicle} items={this.props.location.state.items} locations={this.state.locations} />
        </div>
        )
    }
}

export default Gamepage