import React from 'react'
import { Menu } from 'semantic-ui-react'
import {Button} from 'semantic-ui-react'

class Navbar extends React.Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    
    render(){
    const { activeItem }=this.state
        return(
            <div className="ui top attached menu" style={{height: '7em'}}>
            <Menu.Item
                name='editorials'
                active={activeItem === 'editorials'}
                onClick={this.handleItemClick}
            >
            About
            </Menu.Item>
            <Menu.Item
                name='editorials'
                active={activeItem === 'editorials'}
                onClick={this.handleItemClick}
            >
            Home
            </Menu.Item>
            <Menu.Item name='editorials'>
            <Button>Login</Button>
            </Menu.Item>
            </div>)
    }
}

export default Navbar