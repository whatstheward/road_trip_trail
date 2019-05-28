import React from 'react'
import './Gamepage.css'
import Partybar from '../components/Partybar'
import Windshield from '../components/Windshield';
import { Grid } from 'semantic-ui-react'

const Gamepage =(props)=>{
        
            return(
                <Grid>
                <Grid.Column width={3}>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Windshield  characters={props.location.state.characters} vehicle={props.location.state.vehicle} items={props.location.state.items} />
                </Grid.Column>
            </Grid>
        )
    }

export default Gamepage