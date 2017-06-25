import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Search from 'material-ui/svg-icons/action/search';
import Divider from 'material-ui/Divider';
import {blue600, grey900, grey500, grey300, blue100, blue500} from 'material-ui/styles/colors';
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
                    <Paper style={{display: 'block', width: '100%', padding: 0, backgroundColor: 'transparent'}} zDepth={0}>
                        <div style={{paddingBottom: 12, color: blue500, fontWeight: 400, letterSpacing: 0.5, lineHeight: 1.3}}> 
                          <div style={{marginLeft: 14, marginRight: 14}}>
                            {this.props.conceptName}
                          </div>
                          <Divider color={blue600} style={{marginTop: 12, backgroundColor: blue500}}/>
                        </div>
                    </Paper>
    );
  }
}

export default GroupConcept;
