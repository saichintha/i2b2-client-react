import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {blue400, grey900, grey500,grey800, grey300, green400, green500, blue200, blue600, blue500, blueGrey300} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

import {connect} from 'react-redux';
import * as actions from './../../redux/actions.js'

class QueryName extends Component {
  constructor(props) {
    super(props);

    this.state = {
        queryName: '',
        groupState: props.groupState || []
    }
  }

  processStateFromRedux = (groupState) => {
    var groupInfo = [[],[],[]];
    if(groupState != []) {
        for (var i in groupState) {
          const group = groupState[i];
          groupInfo[group.groupNum-1].push(group.conceptCode);
        }

        var queryGroups = [];
        for (var i in groupInfo) {
            if(groupInfo[i].length > 0){
                queryGroups.push(groupInfo[i])
            }
        }

        var queryName = ''
        var fullGroupNames = queryGroups.toString().split(',');
        for (var i in fullGroupNames) {
            const groupName = fullGroupNames[i];
            queryName += groupName.substring(0,4) + '.' + groupName.substring(groupName.length - 4)
        }

        return queryName
    }
  }

  render() {
    // var queryName = this.processStateFromRedux(this.props.groupState);
    var {groupState} = this.props;
    var groupInfo = [[],[],[]];
    if(groupState != []) {
        for (var i in groupState) {
          const group = groupState[i];
          groupInfo[group.groupNum-1].push(group.conceptName);
        }

        var queryGroups = [];
        for (var i in groupInfo) {
            if(groupInfo[i].length > 0){
                queryGroups.push(groupInfo[i])
            }
        }

        var queryNameArray = [];
        console.log(queryGroups);
        for (var j in queryGroups) {
            for (var k in queryGroups[j]) {
                const name = queryGroups[j][k];
                queryNameArray.push(name.substring(0,5));
            }
        }
        var queryName = queryNameArray.toString().replace(/,/g, '–');
    }

    return (
        <Paper zDepth={0} style={{backgroundColor: 'transparent', width: '100%', marginRight: '1em', marginLeft: '1em'}}>
            <TextField
            value={queryName}
            floatingLabelText="Query Name"
            fullWidth={true}
            />          
        </Paper>
    );
  }
}

export default connect((state) => {
  return {
    groupState: state.groupInfo
  }
})(QueryName);
