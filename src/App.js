import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/LoginForm'
import Register from './components/RegisterForm'
import Gamepage from './containers/Gamepage'
import Setup from './components/Setup'


class App extends React.Component {
  state={
    vehicles: [],
    characters: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/vehicles')
    .then(res => res.json())
    .then(cars => this.setState({vehicles: cars}))
    fetch('http://localhost:3000/characters')
    .then(res => res.json())
    .then(chars => this.setState({characters: chars}))
}

  render(){
    return (
      <div className="App">
        <Navbar color="teal" icon="map" />
        <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/gamesetup" render={()=><Setup characters={this.state.characters} vehicles={this.state.vehicles}/>} />
        <Route path="/game" component={Gamepage} />
        </Switch>
      </div>
  )}
}

export default App;
