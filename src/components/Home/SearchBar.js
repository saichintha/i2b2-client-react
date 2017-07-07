import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Search from 'material-ui/svg-icons/action/search';
import Avatar from 'material-ui/Avatar';
import {blue500, grey900, grey500, grey300, blue200, blue400, grey100} from 'material-ui/styles/colors';
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
import ListView from 'material-ui/svg-icons/action/view-list';
import IconButton from 'material-ui/IconButton';
import SortableTree from 'react-sortable-tree';

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
      treeData: null
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
          axios.post(apiURL + '/api/search', {
              searchText: searchText.toLowerCase()
          })

          .then((response) => {
            if(response.data.length > 0){

              var resArray = response.data.map(function(row) {
                    return (<SearchResult conceptName={row.c_name} conceptFullName={row.c_fullname} visual={row.c_visualattributes} conceptCode={row.c_basecode} conceptDimcode={row.c_dimcode}key={that.count++} closeSearch={that.toggleSearch} past={false}/>)
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
                console.log('Tree for ' + searchText , treeData);
                this.setState({
                  treeData: treeData
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

    handleRequestClose = () => {
      this.setState({
        open: false
      });
      // this.props.handleGroupPosition(this.state.open);
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
      if (!this.state.listView) {
        this.setState({
          listView: true
        })
      }
    }

    handleHierarchy = () => {
      if(this.state.listView){
        this.setState({
          listView: false
        })
      }
    }
  render() {
    var searchResultsView = (
        <Popover
          open={this.state.open}
          anchorEl={this.searchBar}
          style={{width: this.state.barWidth, marginTop: 10}}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <div style={{maxHeight: 400, overflowY: 'auto', padding: 0, margin: 0, width:'100%', overflowX: 'hidden'}} className="scrollbar">
             <Paper zDepth={0} style={{padding: 8, float: 'right', paddingRight: 20}}>
                                      
                                      
                 <IconButton tooltip="List View" onTouchTap={this.handleListView}>
                     <ListView color={grey500}/>
                 </IconButton>

                 <IconButton tooltip="Hierarchial View" onTouchTap={this.handleHierarchy}>
                     <Hierarchy color={grey500}/>
                 </IconButton>
             </Paper>
             <Divider />
                 {this.state.dataSource}
          </div>
        </Popover>
    );

    if (!this.state.listView) {
      searchResultsView = (
        <Popover
            open={this.state.open}
            anchorEl={this.searchBar}
            style={{width: this.state.barWidth, marginTop: 10}}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
            <div style={{height: 400, overflowY: 'auto', padding: 0, margin: 0, width:'100%', overflowX: 'hidden'}} className="scrollbar">
              <Paper zDepth={0} style={{padding: 8, float: 'right', paddingRight: 20}}>
                                        
                                        
                  <IconButton tooltip="List View" onTouchTap={this.handleListView}>
                      <ListView color={grey500}/>
                  </IconButton>

                  <IconButton tooltip="Hierarchial View" onTouchTap={this.handleHierarchy}>
                      <Hierarchy color={grey500}/>
                  </IconButton>
              </Paper>
              <Divider />
                  <SortableTree treeData={this.state.treeData} onChange={treeData => this.setState({ treeData })} />
            </div>
          </Popover>
      );
    }

      return (
                  <Paper style={{height: 48, minWidth: 250, borderRadius: 4, display: 'flex', alignItems: 'center', backgroundColor: this.props.barColor, color: 'white'}} zDepth={0}>
                    <div ref={(input) => { this.searchBar = input; }} style={{width: '100%'}}>

                    
                    <div style={{display: 'inline-flex', position: 'relative', top: 8, marginLeft: 16, marginRight: 4}}>
                      <Search color={this.props.barTextColor} style={{height: 30, width: 30}}/>
                    </div>
                    <div style={{display: 'inline-flex', width: 'calc(100% - 80px)'}}>
                      
                      <TextField
                      hintText="Search for diagnoses, medications, lab tests, visit details etc..."
                      underlineStyle={{display: 'none'}}
                      style={{height: 56, marginLeft: 20, width: '100%', cursor: 'text', color: this.props.barTextColor}}
                      hintStyle={{top: 11, width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', color: this.props.barTextColor}}
                      onChange={this.handleSearchText}
                      value={this.state.searchText}
                      onFocus={ this.onFocus }
                      inputStyle={{height: 48, bottom: 2, color: this.props.barTextColor}}
                      ref={(input) => { this.searchField = input; }}
                      onMouseEnter={this.mouseEnter}
                      onMouseLeave={this.mouseLeave}
                      />
                              {searchResultsView}
                          
                    </div>
                    </div>

                  </Paper>
      );
  }
}

export default SearchBar;
