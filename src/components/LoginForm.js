import React from 'react'
import './css/LoginForm.css'

class LoginForm extends React.Component{
    state={
        username: "",
        password: "",
        errors: []
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then(res => res.json())
        .then(data=>{
            if (data.errors){
                this.setState({errors: data.errors })
            } else {
                localStorage.setItem("token", data.token)
                localStorage.setItem("username", data.user)
                this.props.history.push({
                    pathname: '/gamesetup',
                    state: {username: this.state.username }
                })
            }
        })
    }

    render(){
        return(
        <div>
            <h2>Please Login to your account or create a new user:</h2>
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
        )

    }
}

export default LoginForm