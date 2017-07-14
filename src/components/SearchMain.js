import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HierarchyView from './Search/HierarchyView';
import SearchResultList from './Search/SearchResultList';
import Snackbar from 'material-ui/Snackbar';
import * as actions from './../redux/actions.js'
import {connect} from 'react-redux';

class SearchMain extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      msg: ''
    }
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  componentWillReceiveProps (nextProps) {
    this.setState({
      open: nextProps.snackBar.open,
      concept: nextProps.snackBar.concept,
      msg: nextProps.snackBar.prefix + nextProps.snackBar.concept,
      elementID: nextProps.snackBar.elementID
    })
  }

  handleActionTouchTap = () => {
    var {dispatch} = this.props;
    var {concept} = this.state;
    dispatch(actions.removeConceptFromGroup(this.state.elementID));
    dispatch(actions.openSnackBar(true, 'Removed – ', concept, 'aa'))
  }

  render() {
    return (
      <div className="row center-xs" style={{paddingTop: 30, paddingBottom: 50}}>
        <div className="col-xs-10" >
            <SearchResultList />
        </div>

        <Snackbar
          open={this.state.open}
          message={this.state.msg}
          action="undo"
          autoHideDuration={4000}
          onActionTouchTap={this.handleActionTouchTap}
          onRequestClose={this.handleRequestClose}
        />

      </div>
    );
  }
}

export default connect((state) => {
  return {
    snackBar: state.snackBar
  }
})(SearchMain);