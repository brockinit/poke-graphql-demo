import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import './App.css';
import { Trainers } from './components';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed: 'trainers'
    };
  }
  render() {
    return (
      <div className="container">
        <div className="App-header">
          <AppBar title="Gotta query 'em all" />
        </div>
        <Trainers className="cards" />
      </div>
    );
  }
}

export default App;
