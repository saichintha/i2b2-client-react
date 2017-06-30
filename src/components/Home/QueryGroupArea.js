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
import RunQuery from './RunQuery';
import {connect} from 'react-redux';
import QueryName from './QueryName';
import AddGroup from './AddGroup';

class QueryGroupArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupState: props.groupState || []
    }
  }

  render() {
    var groupNum = 0;
    var queryGroups = (null);
    const {groupState} = this.props;
    var groupInfo = [[],[],[]];

    if(groupState != []) {
        for (var i in groupState) {
          // console.log('GroupState',groupState);
          // console.log('i', i, 'state[i]', groupState[i])
          const group = groupState[i];
          const conceptInfo = {
            conceptName: group.conceptName,
            conceptCode: group.conceptCode,
            patientNum: group.patientNum,
            elementID: group.elementID
          }

          groupInfo[group.groupNum-1].push(conceptInfo);
          // console.log('Group Info', groupInfo)
        }
        // console.log('Group Info', groupInfo)
    }

    queryGroups = groupInfo.map((group) => {
      groupNum = parseInt(groupNum) + 1;
      // console.log('Group in map',group)
      return (
        <QueryGroup num={groupNum} active={true} groupInfo={group}/>
      )
    })

    return (
              <div>
                <div className="row center-xs" style={{marginTop: 80, minWidth: 540}}>
                  <QueryName />
                </div>
                <div className="row center-xs" style={{height: 350, minWidth: 540}}>
                        {queryGroups}
                    </div>
                <RunQuery groupInfo={groupInfo}/>

              </div>
                    
    );
  }
}

export default connect((state) => {
  return {
    groupState: state.groupInfo
  }
})(QueryGroupArea);
