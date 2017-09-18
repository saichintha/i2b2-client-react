import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Avatar from 'material-ui/Avatar';
import {blue500, grey900, grey500} from 'material-ui/styles/colors';

import axios from 'axios';
// const apiURL = 'https://35.190.186.6:8443';
const apiURL = 'http://localhost:9000';

class Folder extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
          <Paper style={{display: 'inline-flex', height: 50, width: 180, marginLeft: 20, marginRight: 20, marginTop: 14, marginBottom: 14}}>
            <div style={{display: 'inline-flex', float: 'left', alignItems: 'center', paddingLeft: 12, paddingRight: 12}}>
                <Avatar icon={<FileFolder />} size={30}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', float: 'left', alignItems: 'center', paddingLeft: 6}}>
                <div style={{minWidth: 0, width: 100, fontSize: 14, fontWeight: 500, display: 'flex', height: '100%', justifyContent: 'center', alignContent: 'center', flexDirection: 'column'}}>
                   <p style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', height: '100%', marginTop: '1.2em'}}>{this.props.name}</p>
                </div>
            </div>
          </Paper>
    );
  }
}

export default Folder;
