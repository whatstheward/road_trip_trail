import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Navbar = () => {

        return(
            <div className="ui inverted teal menu" style={{height: '7em'}}>
                <h2 className="ui header">
                    <i className="icon map" style={{padding:'1em'}}></i>
                    <div className="content">The Road Trip Trail
                    <div className="sub header">a modern expedition</div>
                    </div>
                </h2>
            <Menu.Item name='editorials'>
                {localStorage.getItem("token") ?
                <Link to="/" className="ui button" 
                onClick={(e)=>localStorage.clear()} > Logout </Link>
                    :
                <Link to="/login" className="ui button"> Login </Link>}
            </Menu.Item>
            </div>)
    }


export default Navbar