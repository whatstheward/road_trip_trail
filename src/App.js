import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/LoginForm'
import Register from './components/RegisterForm'
import Gamepage from './containers/Gamepage'
import Setup from './components/Setup'
import Complete from './components/Complete'


class App extends React.Component {
  state={
    vehicles: [],
    characters: [],
    items: [],
    loggedIn: !!localStorage.getItem("token")
  }

  componentDidMount(){
    fetch('http://localhost:3000/vehicles')
    .then(res => res.json())
    .then(cars => this.setState({vehicles: cars}))
    fetch('http://localhost:3000/items')
    .then(res => res.json())
    .then(itemsData => this.setState({items: itemsData}))
}

logIn=()=>{
  this.setState({loggedIn: !this.state.loggedIn})
}

  render(){
    return (
      <div className="App">
        <Navbar color="teal" icon="map" loggedIn={this.state.loggedIn} logIn={this.logIn} />
        <Switch>
        <Route path="/login" render={()=><Login logIn={this.logIn} />} />
        <Route path="/register" render={()=><Register logIn={this.logIn}/>}  />
        <Route path="/complete" component={Complete} />
        <Route path="/gamesetup" render={()=>(
                                              !this.state.loggedIn ? (
                                                <Redirect to='/login'/>
                                                ):(
                                                <Setup items={this.state.items} characters={this.state.characters} vehicles={this.state.vehicles}/>))} />
        <Route exact path="/game" render={()=>(
                                              !this.state.loggedIn ? (
                                                <Redirect to='/login'/>
                                                ):(
                                                <Gamepage />)
                                                        )}/>
        </Switch>
      </div>
  )}
}

export default App;
