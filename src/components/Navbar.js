import React from 'react'
import { Menu } from 'semantic-ui-react'
import {Button} from 'semantic-ui-react'

class Navbar extends React.Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    
    render(){
    const { activeItem }=this.state
    const menuClasses = `ui inverted ${this.props.color} menu`
    const iconClasses = `icon ${this.props.icon}`
        return(
            <div className={menuClasses} style={{height: '7em'}}>
                <h2 className="ui header">
                    <i className={iconClasses} style={{padding:'1em'}}></i>
                    <div className="content">The Road Trip Trail
                    <div className="sub header">a modern expedition</div>
                    </div>
                </h2>
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