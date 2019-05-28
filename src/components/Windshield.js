import React from 'react'
import GameWindow from './GameWindow'
import Partybar from './Partybar'
import { Container, Header, Grid } from 'semantic-ui-react'

class Windshield extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user: "" || this.props.user,
            locations: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/locations')
        .then(res=>res.json())
        .then(locationsArray=>this.setState({locations: locationsArray}))
    }

    

    render(){
        return(
            <div className="ui container">
                <GameWindow locations={this.state.locations} characters={this.props.characters} />
            </div>

        )
    }
}

export default Windshield
