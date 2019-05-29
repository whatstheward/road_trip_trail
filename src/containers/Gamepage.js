import React from 'react'
import './Gamepage.css'
import GameWindow from '../components/GameWindow';
import PropTypes from "prop-types";
import { withRouter } from "react-router";


class Gamepage extends React.Component{
    state={locations: []}


    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      };
    
    componentDidMount(){
        // console.log(this.location.state)
        fetch('http://localhost:3000/locations')
        .then(res=>res.json())
        .then(locationsArray=>this.setState({locations: locationsArray}))
    }
       
    render(){
        return(
        <div>
            <GameWindow  push={this.props.history.push} locations={this.state.locations} items={this.props.location.state.items} characters={this.props.location.state.characters} family={this.props.location.state.family} vehicle={this.props.location.state.vehicle} />  
        </div>
        )
    }
}

export default withRouter(Gamepage)