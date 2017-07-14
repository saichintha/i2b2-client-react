import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Search from 'material-ui/svg-icons/action/search';
import Avatar from 'material-ui/Avatar';
import {blue500, blue800, grey900, grey500, grey300, blue100, amber500} from 'material-ui/styles/colors';
import axios from 'axios';
const apiURL = 'http://localhost:9000';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import GroupConcept from './GroupConcept';
import IconButton from 'material-ui/IconButton';
import Add from 'material-ui/svg-icons/content/add';
import {connect} from 'react-redux';
import * as actions from './../../redux/actions.js'
import uuid from 'uuid/v4';

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

  handleAddToGroup = () => {
    var {conceptName, conceptCode, patientNum, conceptFullName, conceptDimcode, visual} = this.props.activeSearchResult;
    var {dispatch} = this.props;
    var elementID = uuid();
    dispatch(actions.addConceptToGroup(this.props.num, conceptName, conceptCode, patientNum, elementID));
    var searchResultPackage = {
                conceptName: conceptName,
                conceptFullName: conceptFullName,
                conceptCode: conceptCode,
                conceptDimcode: conceptDimcode,
                visual: visual,
                patientNum: patientNum
            }
    dispatch(actions.addSearchResult(searchResultPackage))
    dispatch(actions.openSnackBar(true, 'Added – ', conceptName, elementID))
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
    
    var addDiv = (null);
    if(!this.props.mainDashboard){
      addDiv = (
        <div style={{display: 'inline-flex', float: 'right',right: 10, position: 'relative', bottom: 18}}>
            <IconButton tooltip={'Add To Group ' + this.props.num} onTouchTap={this.handleAddToGroup} touch={true} iconStyle={{width: 27, height: 27}}>
                  <Add color={amber500}/>
            </IconButton>
        </div>
      );
    }

    if (this.props.groupInfo.length) {
      
      var conceptDiv = this.props.groupInfo.map((concept) => {
        // console.log('concept to group concept', concept);
        return (
          <GroupConcept conceptName={concept.conceptName} patientNum={concept.patientNum} elementID={concept.elementID}/>
        )
      })
      return (
        
          <div className="col-xs">
            <Paper style={{color: 'white', margin: 20, borderRadius: 2, opactity: 0.8, fontFamily: 'Roboto', fontSize: 14, paddingLeft: 0, paddingRight: 0, height: 315, marginRight: 0, marginLeft: 0, backgroundColor: 'white'}}>
              <div style={{paddingLeft: 20, paddingTop: 14, paddingBottom: 14,backgroundColor: this.state.divColor}}>
                  <div style={{display: 'inline-flex'}}>Group {this.props.num}</div>
                  {addDiv}
              </div>
              <div style={{height: 273, overflowY: 'auto', width: '100%'}} className="scrollbar">
                  {conceptDiv}
              </div>
        </Paper>
        </div>
        
      );
    } else {
      return (
        <div className="col-xs">

        <Paper style={{color: 'white', margin: 20, borderRadius: 2, opactity: 0.8, fontFamily: 'Roboto', fontSize: 14, paddingLeft: 0, paddingRight: 0, height: 315, marginRight: 0, marginLeft: 0, backgroundColor: 'white'}}>
          
               <div style={{paddingLeft: 20, paddingTop: 14, paddingBottom: 14,backgroundColor: this.state.divColor}}>
                  <div style={{display: 'inline-flex'}}>Group {this.props.num}</div>

                  {addDiv}
              </div> 

              <div style={{display: 'flex', alignItems: 'center', height: 273, alignContent: 'center', justifyContent: 'center'}}>
                    
              </div>
              
        </Paper>
        </div>
      );
    }
  }
}

export default connect((state) => {
  return {
    activeSearchResult: state.activeSearchResult
  }
})(QueryGroup);
