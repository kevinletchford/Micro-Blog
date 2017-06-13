import React, { Component } from 'react';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <h1>microBLOG</h1>
        <div className="ui form">
          <div className="field">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="field">
            <textarea name="" id="" cols="30" rows="10"></textarea>
          </div>
                    <button className="ui button">
            Discard
          </button>
          <button className="ui primary button">
            Save
          </button>

        </div>
      </div>
    );
  }
}

export default App;
