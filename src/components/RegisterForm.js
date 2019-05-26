import React from 'react'


class RegisterForm extends React.Component{
    state={

    }

    render(){
        return(
            <div className="ui container">
                <form className="ui form">
                    <div className="field">
                        <label>Username: </label><input style={{width: '20em'}} type="text" name="username" placeholder="First Name" />
                        <label>Password </label><input style={{width: '20em'}} type="password" name="username" placeholder="First Name" />
                    </div>
                    <button type="submit" className="ui button">Submit</button>
                </form>
            </div>
        )
    }
}

export default RegisterForm