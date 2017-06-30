import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Avatar from 'material-ui/Avatar';
import {blue500, grey900, grey500} from 'material-ui/styles/colors';
import axios from 'axios';
const apiURL = 'http://localhost:9000';
import PreviousQueries from './Home/PreviousQueries';
import QueryGroupArea from './Home/QueryGroupArea';
import RunQuery from './Home/RunQuery';
import PreviousSearchConcepts from './Home/PreviousSearchConcepts';
import SwipeableViews from 'react-swipeable-views';
import {connect} from 'react-redux';
import * as actions from './../redux/actions.js'


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
    return (
          <div className="row center-xs">
            <div className="col-xs-10">
                <SwipeableViews index={this.props.activeTabIndex} slideStyle={{overflow: 'none'}}>
                  <div style={{padding: 20}}>
                    <QueryGroupArea/>
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
  }
}

export default connect((state) => {
  return {
    activeTabIndex: state.activeTabIndex,
  }
})(Dashboard);
