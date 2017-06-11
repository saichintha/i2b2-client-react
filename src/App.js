import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import themeColors from './colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
import './index.css';
import './flexboxgrid.min.css';
import './reset.css';
import './App.css';

import Header from './components/Header'
import OntologyMain from './components/OntologyHome/OntologyMain'
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
          <MuiThemeProvider muiTheme={getMuiTheme(themeColors)}>
            <div className="App">
                <Header/>
                <div style={{marginTop: '5rem'}}>
                    <Dashboard/>
                </div>
            </div>
          </MuiThemeProvider> 
    );
  }
}
export default App;
