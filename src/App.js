import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import themeColors from './colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';
import './flexboxgrid.min.css';
import './reset.css';
import './App.css';

import Main from './components/Main'
import OntologyMain from './components/OntologyHome/OntologyMain'
import Dashboard from './components/Dashboard';
import SearchMain from './components/SearchMain';

var {Provider} = require('react-redux');
var store = require('./redux/storeConfig').configure();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider muiTheme={getMuiTheme(themeColors)}>
            <div>
                <Route exact path='/' component={Main}/>
            </div>
          </MuiThemeProvider>
          </Router>
      </Provider> 
    );
  }
}
export default App;
