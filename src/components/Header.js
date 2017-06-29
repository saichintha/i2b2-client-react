import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {blue500, grey900, grey500} from 'material-ui/styles/colors';
import Sidebar from './Home/Sidebar.js';
import SearchBar from './Home/SearchBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import * as actions from './../redux/actions.js'
import {connect} from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);

  }

  handleTab = (index) => {
    var {dispatch} = this.props;
    dispatch(actions.changeTab(index));
  }

  render() {
    return (
      <div>
        <AppBar
          title={
            <div>
              <div className="row" style={{alignItems: 'center', flexWrap: 'wrap',}}>
                  <div className="col-xs-2" style={{paddingLeft: 60, fontWeight: 400}}>
                      i2b2
                  </div>
                  <div className="col-xs-7">
                      <SearchBar />
                  </div>
              </div>

              
            </div>
          }
          titleStyle={{flex:'initial', fontFamily:'Roboto Mono', fontWeight: 300, color: 'white', marginLeft: 10, width: '100%'}}
          showMenuIconButton={false}
          zDepth={2}
          style={{position:'fixed', top:0, flexWrap: 'wrap'}}
          
        >
          
            <div className="row center-xs" style={{width: '100%', paddingTop: 4}}>
                  <Tabs style={{width: 600, marginRight: 30}} inkBarStyle={{backgroundColor: 'white'}} tabTemplateStyle={{width: 200}}>
                    <Tab label={'Query'} style={{fontWeight: 400}} onClick={() => {this.handleTab(0)}}/>
                    <Tab label={'Recent Queries'} style={{fontWeight: 400}} onClick={() => {this.handleTab(1)}}/>
                    <Tab label={'Searched Concepts'} style={{fontWeight: 400}} onClick={() => {this.handleTab(2)}}/>
                  </Tabs>
              </div>



        </AppBar>
      
      </div>
    );
  }
}

export default connect()(Header);
