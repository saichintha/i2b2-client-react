import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {blue500, grey900, grey500} from 'material-ui/styles/colors';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AppBar
        title="i2b2"
        titleStyle={{flex:'initial', fontFamily:'Roboto Mono', fontWeight: 300, color: 'white', marginLeft: 50}}
        showMenuIconButton={false}
        zDepth={0}
        style={{position:'fixed', top:0}}
      />
    );
  }
}

export default Header;
