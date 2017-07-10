import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Search from 'material-ui/svg-icons/action/search';
import Avatar from 'material-ui/Avatar';
import {blue500, grey900,grey700, grey500, grey300, blue200, blue400, grey200, green500, grey100} from 'material-ui/styles/colors';
import axios from 'axios';
const apiURL = 'http://localhost:9000';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import SearchResult from './SearchResult';
import LinearProgress from 'material-ui/LinearProgress';
import Divider from 'material-ui/Divider';
import Hierarchy from 'material-ui/svg-icons/content/filter-list';
import ListView from 'material-ui/svg-icons/action/list';
import Expand from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import Collapse from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import SortableTree, {toggleExpandedForAll} from 'react-sortable-tree';
import Add from 'material-ui/svg-icons/content/add';
import Drawer from 'material-ui/Drawer';
import {Link} from 'react-router-dom';
import * as actions from '../../redux/actions.js'
import {connect} from 'react-redux';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchText: '',
      dataSource: [],
      open: false,
      barWidth: null,
      loading: false,
      searchBarColor: blue500,
      listView: true,
      treeData: null,
    }

    this.count = 1;
  }

    

  handleSearchText = (e) => {
      const that = this;
      const searchText = e.target.value;
      
      this.setState({
          searchText: searchText
      });
      // console.log('searchText – ', searchText)
      if(searchText.length >= 1){
          axios.post(apiURL + '/api/awesome', {
              searchText: searchText.toLowerCase()
          })

          .then((response) => {
            if(response.data.length > 0){

              // var resArray = response.data.map(function(row) {
              //       return (<SearchResult conceptName={row.c_name} conceptFullName={row.c_fullname} conceptCode={row.c_basecode} conceptDimcode={row.c_basecode} patientNum={row.patient_num} key={that.count++} closeSearch={that.toggleSearch} past={false}/>)
              // });

              //   this.setState({
              //       dataSource: resArray,
              //       open: true
              //   });

                var {dispatch} = this.props;
                dispatch(actions.updateTreeData(response.data))
                
            } else {
              this.setState({
                dataSource: (<Paper zDepth={0} style={{backgroundColor: 'transparent', textAlign: 'center', padding: 20}}>
                    <h3>No results to display.</h3>
                </Paper>),
                open: true
              })
            }
            
          })
          .catch((err) => console.log(err));
      }

    }

    // _onMouseMove = (e) => {
    //   this.setState({ x: e.clientX, y: e.clientY });
    // }

    handleRequestClose = (e) => {
      if (this.state.y > 55 && e == 'clickAway'){
          this.setState({
            open: false
          });
      }
    };

    toggleSearch = () => {
      this.setState({
        open: false
      })
    }

    handleNewRequest = () => {
      this.setState({
        searchText: '',
        dataSource: (<Paper zDepth={0} style={{backgroundColor: 'transparent', textAlign: 'center', padding: 20}}>
                    <h3>No results to display.</h3>
                </Paper>)
      });
    };

    componentDidMount (){
      // this.searchField.focus();
      this.setState({
        barWidth: this.searchBar.offsetWidth,
        anchorEL: this.searchBar.getBoundingClientRect()
      });
      window.addEventListener("resize", this.updateDimensions);
      // document.addEventListener("mousemove", this._onMouseMove);
      this.searchField.focus();
    }

    updateDimensions = () => {
      this.setState({
        barWidth: this.searchBar.offsetWidth
      });
    }

    onFocus = () => {
      // console.log('focused');
      this.setState({
        open: true
      })
    }



  render() {
      return (
                  <Paper style={{height: 48, minWidth: 250, borderRadius: 4, display: 'flex', alignItems: 'center', backgroundColor: this.props.barColor, color: 'white'}} zDepth={0}>
                    <div ref={(input) => { this.searchBar = input; }} style={{width: '100%'}} id="searchBarID">

                    
                    <div style={{display: 'inline-flex', position: 'relative', top: 10, marginLeft: 16, marginRight: 4}}>
                      <Search color={this.props.barTextColor} style={{height: 30, width: 30}}/>
                    </div>
                    <div style={{display: 'inline-flex', width: 'calc(100% - 65px)'}}>
                      
                      <TextField
                      hintText="Search diagnoses, medications, lab tests, visit details etc..."
                      underlineStyle={{display: 'none'}}
                      style={{height: 56, marginLeft: 20, width: '80%', cursor: 'text', color: this.props.barTextColor, fontWeight: 300}}
                      hintStyle={{top: 12, width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', color: this.props.barTextColor, fontWeight: 300}}
                      onChange={this.handleSearchText}
                      value={this.state.searchText}
                      onFocus={this.onFocus}
                      inputStyle={{height: 48, color: this.props.barTextColor, fontWeight: 300}}
                      ref={(input) => { this.searchField = input; }}
                      onMouseEnter={this.mouseEnter}
                      onMouseLeave={this.mouseLeave}
                      />
                          
                    </div>
                    </div>

                  </Paper>
      );
  }
}

export default connect()(SearchBar);
