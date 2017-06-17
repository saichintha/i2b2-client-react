import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';


class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
          <Drawer open={this.props.open}>
            <MenuItem>Menu Item</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
    );
  }
}

export default Dashboard;
