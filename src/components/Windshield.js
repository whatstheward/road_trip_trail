import React from 'react'
import GameTracker from './GameTracker'
import GameWindow from './GameWindow'
import Partybar from './Partybar'
import { Container, Header, Grid } from 'semantic-ui-react'

class Windshield extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user: "" || this.props.user
        }
    }

    

    render(){
        return(
            <Grid>
                <Grid.Row >
                    <GameWindow />
                </Grid.Row>
                <Grid.Row >
                    <GameTracker />
                </Grid.Row>
                <Grid.Row >
                    <Partybar characters={this.props.characters} />
                </Grid.Row>
            </Grid>

        )
    }
}

export default Windshield
