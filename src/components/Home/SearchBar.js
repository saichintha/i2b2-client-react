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
      searchBarColor: blue500
    }

    this.count = 1;
  }

  handleSearchText = (e) => {
      const that = this;
      const searchText = e.target.value;
      this.setState({
          searchText: searchText
      });

      if(searchText.length >= 1){
          axios.post(apiURL + '/api/search', {
              searchText: searchText.toLowerCase()
          })

          .then((response) => {
            if(response.data.length > 0){

              // var resArray = response.data.map(function(row) {
              //   return row.c_name.toString();
              // });

              var resArray = response.data.map(function(row) {
                // return {
                //   text: row.c_name,
                //   value: (<SearchResult conceptName={row.c_name} conceptDimcode={row.c_fullname}/>),
                // };
                    return (<SearchResult conceptName={row.c_name} conceptFullName={row.c_fullname} visual={row.c_visualattributes} conceptCode={row.c_basecode} conceptDimcode={row.c_dimcode}key={that.count++} closeSearch={that.toggleSearch}/>)
              });

                this.setState({
                    dataSource: resArray,
                    open: true
                });
                // this.props.handleGroupPosition(this.state.open); 
            } else {
              this.setState({
                dataSource: (<Paper zDepth={0} style={{backgroundColor: 'transparent', textAlign: 'center', padding: 20}}>
                    <h3>No results to display.</h3>
                </Paper>),
                open: true
              })
              // this.props.handleGroupPosition(this.state.open);
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
      console.log('focused');
      this.setState({
        open: true
      })
    }

    // mouseEnter = () => {
    //   this.setState({
    //     searchBarColor: blue400
    //   })
    // }

    // mouseLeave = () => {
    //   this.setState({
    //     searchBarColor: blue500
    //   })
    // }

  render() {
    return (
                <Paper style={{height: 48, minWidth: 250, borderRadius: 4, display: 'flex', alignItems: 'center', backgroundColor: blue400, color: 'white'}} zDepth={0}>
                  <div ref={(input) => { this.searchBar = input; }} style={{width: '100%'}}>

                  
                  <div style={{display: 'inline-flex', position: 'relative', top: 8, marginLeft: 16, marginRight: 4}}>
                    <Search color={grey100} style={{height: 30, width: 30}}/>
                  </div>
                  <div style={{display: 'inline-flex', width: 'calc(100% - 80px)'}}>
                    
                    <TextField
                    hintText="Search for diagnoses, medications, lab tests, visit details etc..."
                    underlineStyle={{display: 'none'}}
                    style={{height: 56, marginLeft: 20, width: '100%', cursor: 'text', color: grey100}}
                    hintStyle={{top: 11, width: '100%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', color: grey100}}
                    onChange={this.handleSearchText}
                    value={this.state.searchText}
                    onFocus={ this.onFocus }
                    inputStyle={{height: 48, bottom: 2, color: grey100}}
                    ref={(input) => { this.searchField = input; }}
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
                    />
                            <Popover
                              open={this.state.open}
                              anchorEl={this.searchBar}
                              style={{width: this.state.barWidth, marginTop: 10}}
                              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                              targetOrigin={{horizontal: 'left', vertical: 'top'}}
                              onRequestClose={this.handleRequestClose}
                            >
                              <div style={{maxHeight: 400, overflowY: 'auto', padding: 0, margin: 0, width:'100%', overflowX: 'hidden'}} className="scrollbar">
                                {this.state.dataSource}
                              </div>
                            </Popover>
                        
                  </div>
                  </div>

                </Paper>
    );
  }
}

export default SearchBar;
