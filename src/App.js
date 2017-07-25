import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/children/Search';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>New York Times Article Search Thing</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Search />
      </div>
    );
  }
}

export default App;
