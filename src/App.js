import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import Gamepage from './containers/Gamepage'


function App() {
  return (
    <div className="App">
      <Navbar />
      <Gamepage />
    </div>
  );
}

export default App;
