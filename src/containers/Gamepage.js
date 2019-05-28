import React from 'react'
import './Gamepage.css'
import Windshield from '../components/Windshield';
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
            <Windshield  characters={this.props.characters} locations={this.state.locations} />
        </div>
        )
    }
}

export default withRouter(Gamepage)