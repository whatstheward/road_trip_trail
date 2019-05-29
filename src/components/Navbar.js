import React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {

    render(){
        return(
            <div className="ui inverted teal menu" style={{height: '7em'}}>
                <h2 className="ui header">
                    <i className="icon map" style={{padding:'1em'}}></i>
                    <div className="content">The Road Trip Trail
                    <div className="sub header">a modern expedition</div>
                    </div>
                </h2>
                {
                    this.props.loggedIn ?
                    <>
                <Link to="/about" className="item"> About</Link>    
                <Link to="/gamesetup" className="item"> New Game</Link>
                <Link to="/login" className="ui item"
                onClick={(e)=>{ this.props.logIn()
                                localStorage.clear()}} > <div className="content">Logout</div> </Link>
                </>
                :
                <Link to="/login" className="ui item"> <div className="content">Login</div> </Link>
                }
            </div>)
    }
}


export default Navbar
