import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/LoginForm'
import Register from './components/RegisterForm'
import Gamepage from './containers/Gamepage'


class App extends React.Component {

  render(){
    return (
      <div className="App">
        <Navbar color="teal" icon="map" />
        <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/game" component={Gamepage} />
        </Switch>
      </div>
  )}
}

export default App;
