import React from 'react'
import './Gamepage.css'
import Partybar from '../components/Partybar'
import Windshield from '../components/Windshield';
import { Grid } from 'semantic-ui-react'

class Gamepage extends React.Component{
    
    render(){
        return(
            <Grid>
                <Grid.Column width={3}>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Windshield />
                </Grid.Column>
            </Grid>
        )
    }
}

export default Gamepage