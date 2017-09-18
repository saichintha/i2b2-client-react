import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Search from 'material-ui/svg-icons/action/search';
import {blue500, grey900,grey700, grey500, grey300, blue200, blue400, grey200, green500, grey100} from 'material-ui/styles/colors';
import axios from 'axios';
// const apiURL = 'https://35.190.186.6:8443';
const apiURL = 'http://localhost:9000';
import TextField from 'material-ui/TextField';
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
      const searchText = e.target.value;

      this.setState({
          searchText: searchText
      });

      if(searchText.length >= 1){
          axios.post(apiURL + '/api/awesome', {
              searchText: searchText.toLowerCase()
          })

          .then((response) => {
                var {dispatch} = this.props;
                dispatch(actions.updateTreeData(response.data))
          })
          .catch((err) => console.log(err));
      }
    }

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
