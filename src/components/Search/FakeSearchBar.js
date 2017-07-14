import React, { Component } from 'react';
import {blue400, grey100} from 'material-ui/styles/colors';
import {Link} from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Search from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import * as actions from './../../redux/actions.js'

class FakeSearchBar extends Component {

    handleSearchClick = () => {
      var {dispatch} = this.props;
        dispatch(actions.toSearch());
    }

  render() {
    return (
            <Paper style={{height: 48, minWidth: 250, borderRadius: 4, display: 'flex', alignItems: 'center', backgroundColor: this.props.barColor}} zDepth={0}>
                    <div style={{width: '100%'}} id="searchBarID">
                    
                    <div style={{display: 'inline-flex', position: 'relative', top: 10, marginLeft: 16, marginRight: 4}}>
                      <Search color={this.props.barTextColor} style={{height: 30, width: 30}}/>
                    </div>
                    <div style={{display: 'inline-flex', width: 'calc(100% - 65px)'}}>
                      
                      <TextField
                      hintText="Search diagnoses, medications, lab tests, visit details etc..."
                      underlineStyle={{display: 'none'}}
                      style={{height: 56, marginLeft: 20, width: '80%', cursor: 'text', color: this.props.barTextColor}}
                      hintStyle={{top: 12, width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', color: this.props.barTextColor}}
                      onFocus={this.handleSearchClick}
                      inputStyle={{height: 48, color: this.props.barTextColor}}
                      />
                      
                    </div>
                    </div>

                  </Paper>
    );
  }
}

export default connect()(FakeSearchBar);
