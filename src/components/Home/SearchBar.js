import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Search from 'material-ui/svg-icons/action/search';
import Avatar from 'material-ui/Avatar';
import {blue500, grey900,grey700, grey500, grey300, blue200, blue400, grey100} from 'material-ui/styles/colors';
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

function toTreeData(tree) {
  return Object.keys(tree).map(function (title) {
    var o = { title: title };
    if (Object.keys(tree[title]).length > 0) {
      o.children = toTreeData(tree[title]);
    }
    return o;
  });
}

function prefix(arr1){
  var arr= arr1.concat().sort(),
  a1= arr[0], a2= arr[arr.length-1], L= a1.length, i= 0;
  while(i< L && a1.charAt(i)=== a2.charAt(i)) i++;
  return a1.substring(0, i);
}

class SearchBar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchText: '',
      dataSource: [],
      open: false,
      anchorEl: null,
      barWidth: null,
      loading: false,
      searchBarColor: blue500,
      listView: true,
      treeData: null,
      expanded: false,
      expandLabel: 'Expand',
      searchString: '',
      searchFocusIndex: 0,
      searchFoundCount: null
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

              var resArray = response.data.map(function(row) {
                    return (<SearchResult conceptName={row.c_name} conceptFullName={row.c_fullname} conceptCode={row.c_basecode} conceptDimcode={row.c_basecode} patientNum={row.patient_num} key={that.count++} closeSearch={that.toggleSearch} past={false}/>)
              });

                this.setState({
                    dataSource: resArray,
                    open: true
                });

                var filePathsArray = response.data.map(function(path) {
                // console.log(row.c_visualattributes);
                  // path = path.replace(/\\/g, '/');
                  // console.log(path)
                    var editedPath = path.c_fullname.replace(/\\/g, '/').slice(0,-1);
                    editedPath = editedPath.substring(0, editedPath.lastIndexOf('/')) + '/' + path.c_name;
                    editedPath = editedPath.replace(/\([0-9]\)/g, '');
                    editedPath += ' – ' + path.patient_num;
                    return editedPath;
                });

                const commonFilePath = prefix(filePathsArray);
                var tree = {};
                filePathsArray.forEach(function (path) {
                  var path = path.replace(commonFilePath, "");
                  var currentNode = tree;
                  path.split('/').forEach(function (segment) {
                    if (currentNode[segment] === undefined) {
                      currentNode[segment] = {};
                    }
                    currentNode = currentNode[segment];
                  });
                });

                var treeData = toTreeData(tree);
                this.setState({
                  treeData: treeData,
                  expanded: false,
                  expandLabel: 'Expand',
                })
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

    _onMouseMove = (e) => {
      this.setState({ x: e.clientX, y: e.clientY });
    }

    handleRequestClose = (e) => {
      // console.log(e);
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
      document.addEventListener("mousemove", this._onMouseMove);
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

    handleListView = () => {
      
        this.setState({
          listView: true
        })
      
    }

    handleHierarchy = () => {
      
        this.setState({
          listView: false
        })
      
    }

    expand = () => {
      var label = "Collapse";
      if(this.state.expanded){
        label = 'Expand';
      }
      this.setState({
        treeData: toggleExpandedForAll({
          treeData: this.state.treeData,
          expanded: !this.state.expanded,
          expandLabel: label
        }),
        expanded: !this.state.expanded,
        expandLabel: label
      });

    }

  render() {
    var searchResultsView = this.state.dataSource;
    const {
      treeData,
      searchString,
      searchFocusIndex,
      searchFoundCount,
    } = this.state;

    if (!this.state.listView) {
      const selectPrevMatch = () =>
      this.setState({
        searchFocusIndex: searchFocusIndex !== null
          ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
          : searchFoundCount - 1,
      });

    const selectNextMatch = () =>
      this.setState({
        searchFocusIndex: searchFocusIndex !== null
          ? (searchFocusIndex + 1) % searchFoundCount
          : 0,
      });

      searchResultsView = (
        <div style={{height: 400}}>

            <div style={{display: 'flex', width: '100%', overflowX: 'hidden', overflowY: 'hidden', paddingTop: 6, paddingBottom: 6}}>
                  <div style={{width: '85%', display: 'inline-flex',lineHeight: 1.4, paddingLeft: 24, alignItems: 'center', fontWeight: 600}}>
                      Search Results Hierarchy
                      <Paper zDepth={0} style={{marginLeft: 'auto', marginRight: 'auto', backgroundColor: grey300, borderRadius: 4, padding: 4, height: 36, display: 'flex', alignItems: 'center'}}>
                        <TextField
                        hintText="Search term"
                        hintStyle={{fontWeight: 400, color: grey700}}
                        inputStyle={{fontWeight: 400, color: grey900}}
                        value={this.state.searchString}
                        onChange={event =>
                          this.setState({ searchString: event.target.value })}
                        style={{marginLeft: 'auto', marginRight: 'auto', color: grey900, paddingLeft: 15, paddingRight: 15, minWidth: 330}}
                        underlineStyle={{display: 'none'}}
                        />
                      </Paper>
                      
                  </div>
                  <div style={{display: 'inline-flex', alignItems: 'center',  justifyContent: 'flex-end'}}>
                        
                        <FlatButton label={this.state.expandLabel} onTouchTap={this.expand} style={{marginRight: 20}}/>
                        
                  </div>
              </div>

            <Divider />
          
          <div style={{height: 330}} className="scrollbar">
            <SortableTree 
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
          canDrag={false}
          rowHeight={48}
          style={{fontFamily: 'Roboto', fontSize: 14, fontWeight: 400, paddingLeft: 16, paddingTop: 8}}
          isVirtualized={true}
          searchQuery={searchString}
          searchFocusOffset={searchFocusIndex}
          searchFinishCallback={matches =>
                this.setState({
                  searchFoundCount: matches.length,
                  searchFocusIndex: matches.length > 0
                    ? searchFocusIndex % matches.length
                    : 0,
                })}
          />
          </div>
          
        </div>
      );
    }

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
                      style={{height: 56, marginLeft: 20, width: '80%', cursor: 'text', color: this.props.barTextColor}}
                      hintStyle={{top: 12, width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', color: this.props.barTextColor}}
                      onChange={this.handleSearchText}
                      value={this.state.searchText}
                      onFocus={this.onFocus}
                      inputStyle={{height: 48, color: this.props.barTextColor}}
                      ref={(input) => { this.searchField = input; }}
                      onMouseEnter={this.mouseEnter}
                      onMouseLeave={this.mouseLeave}
                      />
                      <IconButton onTouchTap={this.handleListView} >
                          <ListView color={this.props.barTextColor}/>
                      </IconButton>

                      <IconButton onTouchTap={this.handleHierarchy}>
                          <Hierarchy color={this.props.barTextColor}/>
                      </IconButton>
                          
                          <Popover
                          open={this.state.open}
                          anchorEl={this.searchBar}
                          style={{width: this.state.barWidth, marginTop: 10}}
                          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                          targetOrigin={{horizontal: 'left', vertical: 'top'}}
                          onRequestClose={this.handleRequestClose}
                          useLayerForClickAway={false}
                          autoCloseWhenOffScreen={false}
                        >
                          <div style={{maxHeight: 400, overflowY: 'auto', padding: 0, margin: 0, width:'100%', overflowX: 'auto'}} className="scrollbar" id="popover">
                                {searchResultsView}
                          </div>
                        </Popover>
                          
                    </div>
                    </div>

                  </Paper>
      );
  }
}

export default SearchBar;
