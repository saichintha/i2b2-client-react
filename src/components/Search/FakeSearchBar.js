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
        <div style={{width: '100%', display: 'flex', alignContent: 'center', alignItems: 'center'}}>
            <Paper style={{height: 48, minWidth: 250, borderRadius: 4, display: 'flex', alignItems: 'center', backgroundColor: blue400, color: 'white'}} zDepth={0}>
                    <div style={{width: '100%'}} id="searchBarID">
                    
                    <div style={{display: 'inline-flex', position: 'relative', top: 10, marginLeft: 16, marginRight: 4}}>
                      <Search color={grey100} style={{height: 30, width: 30}}/>
                    </div>
                    <div style={{display: 'inline-flex', width: 'calc(100% - 65px)'}}>
                      
                      <TextField
                      hintText="Search diagnoses, medications, lab tests, visit details etc..."
                      underlineStyle={{display: 'none'}}
                      style={{height: 56, marginLeft: 20, width: '80%', cursor: 'text', color: grey100}}
                      hintStyle={{top: 12, width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', color: grey100}}
                      onFocus={this.handleSearchClick}
                      inputStyle={{height: 48, color: grey100}}
                      />
                      
                    </div>
                    </div>

                  </Paper>
        </div>
    );
  }
}

export default connect()(FakeSearchBar);
