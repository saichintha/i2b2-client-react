import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {blue500, grey900, grey500, blue600, amber700, amber300, grey100, blue400, green600, green400} from 'material-ui/styles/colors';
import Sidebar from './Home/Sidebar.js';
import SearchBar from './Search/SearchBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import * as actions from './../redux/actions.js'
import {connect} from 'react-redux';
import FakeSearchBar from './Search/FakeSearchBar';
import Back from 'material-ui/svg-icons/navigation/arrow-back';
import IconButton from 'material-ui/IconButton';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  handleTab = (index) => {
    var {dispatch} = this.props;
    dispatch(actions.changeTab(index));
  }

  handleTabsChange = (e) => {
    // console.log('Tabs change', e)
  }

  handleBack = () => {
    var {dispatch} = this.props;
    dispatch(actions.toMain());
  }


  render() {

    var {activeTabIndex, searchActive} = this.props;
    if(searchActive){
      return (
        <AppBar
          title={
              <div className="row center-xs" style={{alignItems: 'center', flexWrap: 'wrap',}}>
                  <div className="col-xs-8">
                      <SearchBar barColor={blue400} barTextColor={grey100}/>
                  </div>
              </div>
          }

          zDepth={2}
          iconElementLeft={<IconButton><Back color={'white'}/></IconButton>}
          onLeftIconButtonTouchTap={this.handleBack}
          iconStyleLeft={{position: 'relative', left: '2em', bottom: 3}}
          style={{position:'fixed', top:0, flexWrap: 'wrap', backgroundColor: blue600, paddingTop: 8, height: 65}}   
        />
      )
    } else {
    var headerColor = blue600, textColor = 'white', barColor = blue400, barTextColor = grey100;
    if (activeTabIndex === 1) {
      headerColor = '#ffbc00';
      textColor = grey900;
      barColor = amber300;
      barTextColor = grey900;
    } else if (activeTabIndex === 2) {
      headerColor = green600,
      textColor = 'white',
      barColor = green400,
      barTextColor = grey100
    }

    return (
      <div>
        <AppBar
          title={
            <div>
              <div className="row" style={{alignItems: 'center', flexWrap: 'wrap',}}>
                  <div className="col-xs-2" style={{paddingLeft: 60, fontWeight: 400, color: textColor}}>
                      i2b2
                  </div>
                  <div className="col-xs-7" style={{paddingTop: 6}}>
                      {/*<SearchBar barColor={barColor} barTextColor={barTextColor}/>*/}
                      <FakeSearchBar/>
                  </div>
              </div>

              
            </div>
          }
          titleStyle={{flex:'initial', fontFamily:'Roboto Mono', fontWeight: 300, color: 'white', marginLeft: 10, width: '100%'}}
          showMenuIconButton={false}
          zDepth={2}
          style={{position:'fixed', top:0, flexWrap: 'wrap', backgroundColor: headerColor}}
          
        >
          
            <div className="row center-xs" style={{width: '100%', paddingTop: 4}}>
                  <Tabs style={{width: 600, marginRight: 30, backgroundColor: headerColor}} inkBarStyle={{backgroundColor: textColor}} tabTemplateStyle={{width: 200, color: textColor}}
                  tabItemContainerStyle={{backgroundColor: headerColor, color: textColor}} onChange={this.handleTabsChange}>
                      <Tab label={'Query'} buttonStyle={{fontWeight: 400, color: textColor}} onClick={() => {this.handleTab(0)}}/>
                    <Tab label={'Recent Queries'} buttonStyle={{fontWeight: 400, color: textColor}} onClick={() => {this.handleTab(1)}}/>
                    <Tab label={'Searched Concepts'} buttonStyle={{fontWeight: 400, color: textColor}} onClick={() => {this.handleTab(2)}}/>
                  </Tabs>
              </div>
        </AppBar>
      </div>
    );
    }
  }
}

export default connect((state) => {
  return {
    activeTabIndex: state.activeTabIndex,
    searchActive: state.searchActive
  }
})(Header);
