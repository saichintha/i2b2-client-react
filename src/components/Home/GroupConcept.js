import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Search from 'material-ui/svg-icons/action/search';
import Divider from 'material-ui/Divider';
import {blue600, grey900, grey500, grey300, blue100, blue500, blueGrey900, red400, green600, teal500} from 'material-ui/styles/colors';
import axios from 'axios';
const apiURL = 'http://localhost:9000';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Group from 'material-ui/svg-icons/social/group';
import IconButton from 'material-ui/IconButton';
import Remove from 'material-ui/svg-icons/content/remove-circle';
import Move from 'material-ui/svg-icons/action/swap-horiz';
import {connect} from 'react-redux';
import * as actions from './../../redux/actions.js'

class GroupConcept extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showRemove: false
    }
  }

  handleEnter = () => {
    this.setState({
      showRemove: true
    })
  }

  handleLeave = () => {
    this.setState({
      showRemove: false
    })
  }

  handleRemove = () => {
    console.log('Remove');
    var {dispatch} = this.props;
    console.log(this.props.elementID);
    dispatch(actions.removeConceptFromGroup(this.props.elementID))
  }


  render() {
    var removeDiv = (null);
    if(this.state.showRemove){
      removeDiv = (
        <div style={{display: 'inline-flex', alignItems: 'center'}}>
            {/*<IconButton style={{paddingLeft: 4, paddingRight: 4, padding: 0}} iconStyle={{width:20, height: 20}}>
              <Remove color={red400}/>
            </IconButton>*/}
            <Remove color={red400} style={{paddingLeft: 8, paddingRight: 2, height: 20, width: 20, cursor: 'pointer'}} onClick={() => {this.handleRemove()}}/>
        </div>
      );
    }
    return (
                    <Paper style={{display: 'block', width: '100%', padding: 0, backgroundColor: 'transparent'}} zDepth={0} onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>

                          <div style={{display: 'flex', width: '100%', overflowX: 'hidden', overflowY: 'hidden', paddingTop: 6, paddingBottom: 6}}>
                            {removeDiv}
                                <div style={{width: '78%', color: blueGrey900, display: 'inline-flex', letterSpacing: 0.4, lineHeight: 1.4, paddingLeft: 12, alignItems: 'center'}}>
                                    {this.props.conceptName}
                                </div>
                                <div style={{display: 'inline-flex', alignItems: 'center', paddingLeft: 10}}>
                                    <Group color={teal500} style={{paddingRight: 8, width: 20,height: 20}}/>
                                    <div style={{display: 'inline-flex', paddingRight: 12, color: teal500, fontFamily: 'Roboto Mono'}}>
                                        {this.props.patientNum}
                                    </div>
                                </div>
                            </div>
                            
                          <Divider/>
                    </Paper>
    );
  }
}
export default connect()(GroupConcept);
