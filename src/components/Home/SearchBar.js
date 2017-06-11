import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Search from 'material-ui/svg-icons/action/search';
import Avatar from 'material-ui/Avatar';
import {blue500, grey900, grey500, grey300, blue200} from 'material-ui/styles/colors';
import axios from 'axios';
const apiURL = 'http://localhost:9000';
import TextField from 'material-ui/TextField';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';


class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      dataSource: [],
      open: false,
      anchorEl: null,
      barWidth: null
    }
  }

  handleSearchText = (searchText) => {
      this.setState({
          searchText: searchText
      });

      if(searchText.length > 2){
        console.log(searchText)
          axios.post(apiURL + '/api/search', {
              searchText: searchText.toLowerCase()
          })

          .then((response) => {
            if(response.data != []){
              var resArray = response.data.map(function(row) {
                return row.c_name.toString();
              });
              console.log(resArray)
                this.setState({
                    dataSource: resArray,
                });
            } else {
              this.setState({
                dataSource: ['No results']
              })
            }
            
          })
          .catch((err) => console.log(err));
      } else {
        this.setState({
          dataSource: []
        })
      }

    }

    // handleRequestClose = () => {
    //   this.setState({
    //     open: false
    //   });
    // };

    handleNewRequest = () => {
      console.log('Im called')
      this.setState({
        searchText: '',
        dataSource: []
      });
    };

    componentDidMount (){
      window.addEventListener("resize", this.updateDimensions)
    }

    updateDimensions = () => {
      console.log(this.searchBar)
      this.setState({
        barWidth: this.searchBar.offsetWidth
      });
    }

  render() {
    return (
                <Paper style={{height: 56, minWidth: 500, borderRadius: 4}} zDepth={1}>
                  <div ref={(input) => { this.searchBar = input; }}>

                  
                  <div style={{display: 'inline-flex', position: 'relative', top: 11, marginLeft: 16, marginRight: 4}}>
                    <Search color={blue500} style={{height: 30, width: 30}}/>
                  </div>
                  <div style={{display: 'inline-flex', width: 'calc(100% - 55px)'}}>
                    {/*<TextField
                    hintText="Search for diagnoses, medications, lab tests, visit details etc..."
                    underlineStyle={{display: 'none'}}
                    style={{height: 56, marginLeft: 20, width: 'inherit'}}
                    hintStyle={{bottom: 14, width: 'inherit', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}
                    onChange={this.handleSearchText}
                    value={this.state.searchText}
                  />
                  <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                  >
                    <Menu>
                      {this.state.result}
                    </Menu>
                  </Popover>*/}

                  <AutoComplete
                  hintText='Search diagnoses, medications, lab tests, visit details etc...'
                  dataSource={this.state.dataSource}
                  onUpdateInput={(searchText) => {this.handleSearchText(searchText)}}
                  onNewRequest={this.handleNewRequest}
                  fullWidth={true}
                  filter={(searchText, key) => true}
                  dataSourceConfig={{text: 'text'}}
                  textFieldStyle={{height: 56, paddingLeft: 20, width: 'inherit'}}
                  underlineStyle={{display: 'none'}}
                  hintStyle={{bottom: 14, width: 'inherit', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}
                  searchText={this.state.searchText}
                  maxSearchResults={10}
                  openOnFocus={true}
                  popoverProps={{style: {
                    marginLeft: '-50px',
                    width: this.state.barWidth,
                    marginTop: 10
                  }}}
                  />
                  </div>
                  </div>

                </Paper>
    );
  }
}

export default SearchBar;
