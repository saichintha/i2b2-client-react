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

    this.state = {
      marginValue: 0
    }
  }

  handleGroupPosition = (searchOpen) => {
    // if(searchOpen){
    //   this.setState({
    //     marginValue: 420
    //   });
    // } else {
    //   this.setState({
    //     marginValue: 0
    //   })
    // }   
  }

  render() {
    return (
          <div className="row center-xs">
            <div className="col-xs-9" ref={(input) => { this.searchDiv = input; }}>
                <SearchBar handleGroupPosition={this.handleGroupPosition}/>
                <div style={{marginTop: this.state.marginValue}}>
                  <QueryGroupArea/>                  
                </div>
                
            </div>
          </div>
    );
  }
}

export default Dashboard;
