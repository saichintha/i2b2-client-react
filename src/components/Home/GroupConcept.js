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

class GroupConcept extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
                    <Paper style={{display: 'flex', width: '100%', padding: 14, backgroundColor: blue100, maxHeight: 48}} zDepth={0}>
                        <div> 
                          {this.props.conceptName}
                        </div>
                    </Paper>
    );
  }
}

export default GroupConcept;
