import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Search from 'material-ui/svg-icons/action/search';
import Avatar from 'material-ui/Avatar';
import {blue400, grey900, grey500, grey300, blue100, blue200} from 'material-ui/styles/colors';
import axios from 'axios';
const apiURL = 'http://localhost:9000';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class RunQuery extends Component {
  constructor(props) {
    super(props);

    this.state = {
        searchText: '',
        result: ''
    }
  }

  render() {
    return (
                    <div className="row center-xs" style={{height: 200, marginTop: 20, minWidth: 540}}>
                        <FlatButton label="Search" primary={true} icon={<Search/>} backgroundColor={blue100} hoverColor={blue200} rippleColor={blue400}/>
                    </div>
    );
  }
}

export default RunQuery;
