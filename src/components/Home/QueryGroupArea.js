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
    var i = 1;
    return (
                    <div className="row center-xs" style={{height: 350, marginTop: 20, minWidth: 540}}>
                        <QueryGroup num={i++} active={true}/>
                        <QueryGroup num={i++} active={false}/>
                        <QueryGroup num={i++} active={false}/>
                    </div>
    );
  }
}

export default QueryGroupArea;
