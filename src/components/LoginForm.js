import React from 'react'
import './css/LoginForm.css'
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Scoreboard from './Scoreboard';
import { Grid } from 'semantic-ui-react'

class LoginForm extends React.Component{
    state={
        username: "",
        password: "",
        errors: []
    }

    static propTypes = {
        history: PropTypes.object.isRequired
    };

    handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(data=>{
            if (data.errors){
                this.setState({errors: data.errors })
            } else {
                localStorage.setItem("token", data.token)
                localStorage.setItem("username", data.user)
                this.props.logIn()
                this.props.history.push('/gamesetup')
            }
        })
    }

    displayErrors = () => {
        return(
            <ul>
                {this.state.errors.map(error=> <li style={{color:'red'}}><h3>{error}</h3></li>)}
            </ul>
        )
    }

    render(){
        return(
            <Grid>
            <Grid.Column width={3}>
                <Scoreboard />
            </Grid.Column>
            <Grid.Column width={10}>
                <div>
                    <h2>Please Login to your account or create a new user:</h2>
                    {this.state.errors.length > 0 ? 
                        this.displayErrors()
                        :
                        null
                        }
                    <div id="loginForm" className="ui container">
                        <div id="login" className="ui card">
                            <form onSubmit={(e)=>this.handleSubmit(e)} className="ui form">
                                <div className="field">
                                    <label>Username</label><input onChange={(e)=>{this.setState({username: e.target.value})}} type="text" placeholder="First Name" />
                                </div>
                                <div className="field">
                                    <label>Password</label><input onChange={(e)=>{this.setState({password: e.target.value})}} type="password" placeholder="Last Name" />
                                </div>
                                <button type="submit" className="ui button">Submit</button>
                                <button className="ui button" onClick={()=>this.props.history.push('/register')}>New User</button>
                            </form>
                        </div>
                    </div>
                </div>
                </Grid.Column>
                <Grid.Column width={3}></Grid.Column>
            </Grid>
        )

    }
}

export default withRouter(LoginForm)