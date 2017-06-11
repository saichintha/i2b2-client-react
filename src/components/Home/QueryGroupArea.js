import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Search from 'material-ui/svg-icons/action/search';
import Avatar from 'material-ui/Avatar';
import {blue500, grey900, grey500, grey300, blue300} from 'material-ui/styles/colors';
import axios from 'axios';
const apiURL = 'http://localhost:9000';
import TextField from 'material-ui/TextField';
import QueryGroup from './QueryGroup';

class QueryGroupArea extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
                    <div className="row center-xs" style={{height: 200, marginTop: 20, minWidth: 540}}>
                        <QueryGroup/>
                        <QueryGroup/>
                        <QueryGroup/>
                    </div>
    );
  }
}

export default QueryGroupArea;
