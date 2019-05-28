import React from 'react'
import './Gamepage.css'
import Partybar from '../components/Partybar'
import Windshield from '../components/Windshield';
import { Grid } from 'semantic-ui-react'
import Inventory from '../components/Inventory'

const Gamepage =(props)=>{
console.log("handleclick", props.location.state.handleClick)
            return(
                <Grid>
                <Grid.Column width={3}>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Windshield  characters={props.location.state.characters} vehicle={props.location.state.vehicle} items={props.location.state.items} />
                    <Inventory items={props.location.state.items} handleClick={props.handleClick}/>
                </Grid.Column>
            </Grid>
        )
    }

export default Gamepage
