import React, { Component } from 'react';

import Dashboard from './Dashboard';
import Header from './Header'

class Main extends Component {
  render() {
    return (
          <div className="App">
                <Header/>
                <div style={{marginTop: '5rem'}}>
                    <Dashboard/>
                </div>
            </div>
    );
  }
}

export default Main;
