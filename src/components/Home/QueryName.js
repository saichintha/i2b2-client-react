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
        queryName: null,
        groupState: props.groupState || []
    }
  }

  handleValue = (event) => {
    this.setState({
        queryName: event.target.value
    })
  }

  updateQueryNameRedux = (queryName) => {
      var {dispatch} = this.props;
      dispatch(actions.updateQueryName(queryName));
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
        // console.log(queryGroups);
        for (var j in queryGroups) {
            for (var k in queryGroups[j]) {
                const name = queryGroups[j][k];
                queryNameArray.push(name.substring(0,5));
                // queryNameArray.push(name.split(" ")[0].replace(/,/g, '').replace(/\(|\)/g, ''));
            }
        }
        var queryName = queryNameArray.toString().replace(/,/g, '–');
    }

    this.updateQueryNameRedux(this.state.queryName || queryName);

    return (
        <Paper zDepth={0} style={{backgroundColor: 'transparent', width: '100%', marginRight: '1em', marginLeft: '1em'}}>
            <TextField
            value={this.state.queryName || queryName}
            hintText="Query Name"
            hintStyle={{fontSize: 24}}
            inputStyle={{fontSize: 24}}
            fullWidth={true}
            onChange={this.handleValue}
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
