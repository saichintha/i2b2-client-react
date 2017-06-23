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
import {connect} from 'react-redux';

class RunQuery extends Component {
  constructor(props) {
    super(props);

    this.state = {
        groupInfo: this.props.groupInfo
    }
  }

  handleRunQuery = () => {
    const {groupState} = this.props;
    var groupInfo = [[],[],[]];

    if(groupState != []) {
        for (var i in groupState) {
          const group = groupState[i];
          groupInfo[group.groupNum-1].push(group.conceptInfo.conceptCode);
        }
    }

    var queryGroups = [];
    for (var i in groupInfo) {
      if(groupInfo[i].length > 0){
        queryGroups.push(groupInfo[i])
      }
    }
    console.log(queryGroups)
    axios.post(apiURL + '/api/groupQuery', {
            queryGroups: JSON.stringify(queryGroups)
        })
        .then((result) => {
          const patients = result.data[0].array_length;
          console.log(patients)
        })
        .catch((err) => console.log(err));
  }

  render() {
    return (
                    <div className="row center-xs" style={{marginTop: 20, minWidth: 540}}>
                        <FlatButton label="Search" primary={true} icon={<Search/>} backgroundColor={blue100} hoverColor={blue200} rippleColor={blue400} onTouchTap={this.handleRunQuery}/>
                    </div>
    );
  }
}

export default connect((state) => {
  return {
    groupState: state.groupInfo
  }
})(RunQuery);
