import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Avatar from 'material-ui/Avatar';
import {blue500, grey900, grey500} from 'material-ui/styles/colors';
import axios from 'axios';
const apiURL = 'https://35.190.186.6:8443';
import PreviousQueries from './Home/PreviousQueries';
import QueryGroupArea from './Home/QueryGroupArea';
import RunQuery from './Home/RunQuery';
import PreviousSearchConcepts from './Home/PreviousSearchConcepts';
import SwipeableViews from 'react-swipeable-views';
import {connect} from 'react-redux';
import * as actions from './../redux/actions.js'
import SearchMain from './SearchMain';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slideIndex: 0
    }
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    var {activeTabIndex, searchActive} = this.props;
    if(!searchActive){
    return (
          <div className="row center-xs">
            <div className="col-xs-10">
                <SwipeableViews index={this.props.activeTabIndex} slideStyle={{overflow: 'none'}}>
                  <div style={{padding: 20, marginTop: 80, paddingTop: 0}}>
                    <QueryGroupArea mainDashboard={true}/>
                  </div>
                  

                  <div style={{padding: 20}}>
                    <PreviousQueries/>
                  </div>

                  <div style={{padding:20, marginTop: 80}}>
                    <PreviousSearchConcepts />
                  </div>
                </SwipeableViews>
            </div>
          </div>
    );
    } else {
      return (
        <SearchMain />
      )
    }
  }
}

export default connect((state) => {
  return {
    activeTabIndex: state.activeTabIndex,
    searchActive: state.searchActive
  }
})(Dashboard);
