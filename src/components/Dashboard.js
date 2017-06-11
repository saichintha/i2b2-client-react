import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Avatar from 'material-ui/Avatar';
import {blue500, grey900, grey500} from 'material-ui/styles/colors';
import axios from 'axios';
const apiURL = 'http://localhost:9000';
import SearchBar from './Home/SearchBar';
import QueryGroupArea from './Home/QueryGroupArea';
import RunQuery from './Home/RunQuery';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
          <div className="row center-xs">
            <div className="col-xs-9" >
                <SearchBar/>
                <QueryGroupArea/>
                <RunQuery/>
            </div>
          </div>
    );
  }
}

export default Dashboard;
