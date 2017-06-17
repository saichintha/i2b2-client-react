import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {blue500, grey900, grey500} from 'material-ui/styles/colors';
import Sidebar from './Home/Sidebar.js';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleDrawer = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    return (
      <div>
        <AppBar
          title="i2b2"
          titleStyle={{flex:'initial', fontFamily:'Roboto Mono', fontWeight: 300, color: 'white', marginLeft: 10}}
          showMenuIconButton={true}
          zDepth={0}
          style={{position:'fixed', top:0}}
          
        />
        <Sidebar open={this.state.open}/>
      </div>
    );
  }
}

export default Header;
