import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Search from 'material-ui/svg-icons/action/search';
import Avatar from 'material-ui/Avatar';
import {blue500, grey900, grey500, grey300} from 'material-ui/styles/colors';
import axios from 'axios';
const apiURL = 'http://localhost:9000';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

class QueryGroup extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (      
        <div className="col-xs" style={{color: 'white', margin: 20, borderRadius: 2, opactity: 0.8, fontFamily: 'Roboto', fontSize: 14, paddingLeft: 0, paddingRight: 0, border: `1px solid ${blue500}`}}>
            <div style={{paddingLeft: 20, paddingTop: 14, paddingBottom: 14,backgroundColor: blue500}}>
                Group {this.props.num.toString()}
            </div>
            <Divider/>
        </div>
    );
  }
}

export default QueryGroup;
