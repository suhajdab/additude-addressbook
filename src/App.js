import React, { Component } from 'react';
import './App.css';
import './Addressbook';
import Addressbook from './Addressbook';

/**
 * https://randomuser.me/api/?results=50&seed=additude-addressbook&exc=login
 */

class App extends Component {
  render() {
    return (
      <div className="App">
        <Addressbook />
      </div>
    );
  }
}

export default App;
