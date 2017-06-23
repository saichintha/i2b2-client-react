import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Search from 'material-ui/svg-icons/action/search';
import Avatar from 'material-ui/Avatar';
import {blue500, blue800, grey900, grey500, grey300, blue100} from 'material-ui/styles/colors';
import axios from 'axios';
const apiURL = 'http://localhost:9000';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import GroupConcept from './GroupConcept';

class QueryGroup extends Component {
  constructor(props) {
    super(props);

    if(this.props.active){
      this.state = {
        active: this.props.active,
        divColor: blue500
      }
    } else {
      this.state = {
        active: this.props.active,
        divColor: grey500
      }
    }
    
  }

  render() {
    var empty = (
      <div style={{display: 'flex', marginLeft: '1em', marginRight: '1em', alignItems: 'center', width: '100%', textAlign: 'center', alignContent: 'center', justifyContent: 'center'}}> 
          <div style={{textAlign: 'center', padding: 5, borderRadius: 2, backgroundColor: blue100}}>
            <p style={{fontSize: 13, color: blue800}}>Search and add concept</p>
          </div>
        </div>
    );
    if(!this.state.active){
      empty = (
        <div style={{display: 'flex', marginLeft: '1em', marginRight: '1em', alignItems: 'center', width: '100%', textAlign: 'center', alignContent: 'center', justifyContent: 'center'}}> 
          <div style={{textAlign: 'center', padding: 5, borderRadius: 2, backgroundColor: grey300}}>
            <p style={{fontSize: 13, color: grey900}}>Group is currently inactive</p>
          </div>
        </div>
      ) 
    }

    if (this.props.groupInfo.length) {

      var conceptDiv = this.props.groupInfo.map((concept) => {
        return (
          <GroupConcept conceptName={concept.conceptName}/>
        )
      })
      return (
        <div className="col-xs" style={{color: 'white', margin: 20, borderRadius: 2, opactity: 0.8, fontFamily: 'Roboto', fontSize: 14, paddingLeft: 0, paddingRight: 0, border: `1px solid ${this.state.divColor}`}}>
              <div style={{paddingLeft: 20, paddingTop: 14, paddingBottom: 14,backgroundColor: this.state.divColor}}>
                  Group {this.props.num.toString()}
              </div>
              <div style={{display: 'flex', height: '87%'}}>
                    {conceptDiv}
              </div>
          </div>
      );
    } else {
      return (      
          <div className="col-xs" style={{color: 'white', margin: 20, borderRadius: 2, opactity: 0.8, fontFamily: 'Roboto', fontSize: 14, paddingLeft: 0, paddingRight: 0, border: `1px solid ${this.state.divColor}`}}>
              <div style={{paddingLeft: 20, paddingTop: 14, paddingBottom: 14,backgroundColor: this.state.divColor}}>
                  Group {this.props.num.toString()}
              </div>
              <div style={{display: 'flex', alignItems: 'center', height: '87%', alignContent: 'center', justifyContent: 'center'}}>
                    {empty}
              </div>
          </div>
      );
    }
  }
}

export default QueryGroup;
