import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Avatar from 'material-ui/Avatar';
import {blue500, grey900, grey500} from 'material-ui/styles/colors';
import axios from 'axios';
const apiURL = 'http://localhost:9000';
import Folder from './Folder';
class OntologyMain extends Component {

  constructor(props) {
    super(props);

    this.state = {
        folders: null,
        complete: false
    }
  }

  componentWillMount () {
    axios.get(apiURL + '/api/ontologyTree/1')
    .then((response) => {
        var folders = response.data.map(function(folder){
            return (
                <Folder name={folder.c_fullname.replace('\\i2b2\\', '').replace('\\', '')}/>
            );
        })
        this.setState({
            folders: folders,
            complete: true
        })
        
    })
    .catch((err) => console.log(err));
  }

  render() {

      if(this.state.complete) {
        return (
            <div className="row center-xs">
                <div className='col-xs-9' style={{padding:0, display:'flex', flexDirection:'column', height: '100%'}}>
                    <div style={{flexGrow: 1, overflow: 'auto'}}>
                            {this.state.folders}
                    </div>
                </div>
            </div>
        );
      } else {
          return (
            <div style={{display: 'inline-flex'}}>
                
            </div>
        );
      }
    
  }
}

export default OntologyMain;
