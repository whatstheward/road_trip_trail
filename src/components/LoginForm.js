import React from 'react'
import './LoginForm.css'

class LoginForm extends React.Component{
    state={
        username: "",
        password: ""
    }

    render(){
        return(
        <div id="loginForm" className="ui container">
            <div id="login" className="ui card">
                <form className="ui form">
                    <div className="field">
                        <label>Username</label><input type="text" placeholder="First Name" />
                    </div>
                    <div className="field">
                        <label>Password</label><input type="password" placeholder="Last Name" />
                    </div>
                    <button type="submit" className="ui button">Submit</button>
                </form>
            </div>
        </div>
        )

    }
}

export default LoginForm