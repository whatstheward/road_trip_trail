import React from 'react'
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import './css/RegisterForm.css'


class RegisterForm extends React.Component{
    state={
        username: "",
        password: "",
        confirmPassword: "",
        errors: []
    }

    static propTypes = {
        history: PropTypes.object.isRequired
    };

    handleSubmit=(e)=>{
        e.preventDefault()
        if(this.state.password === this.state.confirmPassword){
            fetch("http://localhost:3000/users", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user: {
                    username: this.state.username,
                    password: this.state.password}
                })
            })
            .then(res => res.json())
            .then(data =>{
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
    }

    render(){
        return(
            <div>
                <h1>Create a new User:</h1>
                <div id="loginForm" className="ui container">
                    <div id="register" className="ui card">
                        <form onSubmit={(e)=>this.handleSubmit(e)}className="ui form">
                            <div className="field">
                                <label>Username</label><input id="lineItem" onChange={(e)=>{this.setState({username: e.target.value})}} type="text" name="username" placeholder="username" required />
                            </div>
                            <div className="field">
                                <label>Password</label><input id="lineItem" onChange={(e)=>{this.setState({password: e.target.value})}} type="password" name="password" placeholder="password" required />
                                <label>Confirm Password</label><input id="lineItem" onChange={(e)=>{this.setState({confirmPassword: e.target.value})}} name="confirmPassword" type="password" placeholder="confirm password" required />
                            </div>
                            <button type="submit" className="ui button">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(RegisterForm)