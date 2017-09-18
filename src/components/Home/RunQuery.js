import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Search from 'material-ui/svg-icons/action/search';
import Clear from 'material-ui/svg-icons/action/cached';
import Avatar from 'material-ui/Avatar';
import {blue400, grey900, grey500,grey800, grey300, blue100, blue200, blue600, blue500, blueGrey300} from 'material-ui/styles/colors';

import axios from 'axios';
// const apiURL = 'https://35.190.186.6:8443';
const apiURL = 'http://localhost:9000';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Masonry from 'react-masonry-component';
import FullQueryResult from './FullQueryResult';
import {connect} from 'react-redux';
import * as actions from './../../redux/actions.js'
import Divider from 'material-ui/Divider';
import uuid from 'uuid/v4';
import QueryResult from './QueryResult';
import PatternTable from './PatternTable';

class RunQuery extends Component {
  constructor(props) {
    super(props);

    this.state = {
        groupInfo: this.props.groupInfo,
        patientNum: null,
        complete: false,
        open: false,
        patternResult: null,
    }
  }

  processDemographics = (rawDemJSON) => {
        var age = {}, lang = {}, race = {}, religion = {}, sex = {}, patientNum = 0, ageJSON = [];
        for (var i in rawDemJSON) {
            const dem = rawDemJSON[i];
           if (dem.concept_cd.includes('DEM|AGE')) {
                const ageNum = dem.concept_cd.split(':')[1];
                age[ageNum] = dem.count;
                ageJSON.push({age: parseInt(ageNum), patients: parseInt(dem.count)});
           } else if (dem.concept_cd.includes('DEM|LANGUAGE')) {
               const langName = dem.concept_cd.split(':')[1];
                lang[langName] = dem.count;
           } else if (dem.concept_cd.includes('DEM|RACE')) {
               const raceName = dem.concept_cd.split(':')[1];
               race[raceName] = dem.count;
           } else if (dem.concept_cd.includes('DEM|RELIGION')) {
               const religionName = dem.concept_cd.split(':')[1];
               religion[religionName] = dem.count;
           } else if (dem.concept_cd.includes('DEM|SEX')) {
               const sexName = dem.concept_cd.split(':')[1];
               sex[sexName] = parseInt(dem.count);
               patientNum += parseInt(dem.count);
           }
        }
        // console.log('AgeJSON', ageJSON);
        var ageGroups = this.formatAges(age);
        this.setState({
            ages: ageGroups,
            races: race,
            genders: sex,
            religions: religion,
            languages: lang,
            patientNum: patientNum,
            ageJSON: ageJSON,
            queryName: this.props.queryName,
            complete: true,
        })

        var {dispatch} = this.props;
        var queryResultPackage = {
            ages: ageGroups,
            races: race,
            genders: sex,
            religions: religion,
            languages: lang,
            patientNum: patientNum,
            queryName: this.props.queryName,
            queryConceptInfo: this.state.queryConceptInfo,
            queryID: uuid(),
            timeQueried: new Date()
        };
        dispatch(actions.addQueryResult(queryResultPackage))
    }

    formatAges = (ageJSON) => {
        var ageGroups = [0,0,0,0,0,0,0,0,0];
        for (var age in ageJSON) {
            const count = parseInt(ageJSON[age]);
            if (age > 0 && age <= 9) {
                ageGroups[0] += count;
            } else if (age > 9 && age <= 17) {
                ageGroups[1] += count;
            } else if (age > 17 && age <= 34) {
                ageGroups[2] += count;
            } else if (age > 34 && age <= 44) {
                ageGroups[3] += count;
            } else if (age > 44 && age <= 54) {
                ageGroups[4] += count;
            } else if (age > 54 && age <= 64) {
                ageGroups[5] += count;
            } else if (age > 64 && age <= 74) {
                ageGroups[6] += count;
            } else if (age > 74 && age <= 84) {
                ageGroups[7] += count;
            } else if (age > 84) {
                ageGroups[8] += count;
            }
        }
        return ageGroups;
    }

  handleRunQuery = () => {
    const {groupState} = this.props;
    var groupInfo = [[],[],[]];

    if(groupState != []) {
        for (var i in groupState) {
          const group = groupState[i];
          groupInfo[group.groupNum-1].push(group.conceptCode);
        }
    }

    var queryGroups = [];
    for (var i in groupInfo) {
      if(groupInfo[i].length > 0){
        queryGroups.push(groupInfo[i])
      }
    }

    this.setState({
        queryConceptInfo: queryGroups
    });
    // console.log('Queryyy', queryGroups)
    axios.post(apiURL + '/api/groupQuery', {
            queryGroups: JSON.stringify(queryGroups)
        })
        .then((results) => {
          // const patients = result.data[0].array_length;
        //   console.log(results.data);
          this.processDemographics(results.data);
        })
        .catch((err) => console.log(err));
  }

  handleCommonPattern = () => {
    axios.post(apiURL + '/api/commonPattern', {
            queryGroups: JSON.stringify(this.state.queryConceptInfo)
        })
        .then((results) => {
          // const patients = result.data[0].array_length;
        //   console.log(results.data);
          // console.log(results.data);
          this.setState({
            patternResult: results.data,
            open: true
          })
        })
        .catch((err) => console.log(err));
  }

  handleResetGroups = () => {
      var {dispatch} = this.props;
      dispatch(actions.resetAllGroups());
      this.setState({
          complete: false
      })
  }

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    if(this.state.complete){
      return (
        <div className="row center-xs" style={{marginTop: 20, minWidth: 540, display: 'block'}}>
          <div style={{marginTop: 20, marginBottom: 20}} className="row center-xs">
              <RaisedButton label="Reset" icon={<Clear/>} backgroundColor={blueGrey300} onTouchTap={this.handleResetGroups} labelStyle={{color: 'white'}} style={{marginRight: 20}}/>

            <RaisedButton label="Search" icon={<Search/>} backgroundColor={blue500} onTouchTap={this.handleRunQuery} labelStyle={{color: 'white'}}/>
          </div>

          <div className="row center-xs" style={{marginTop: 40, marginBottom: 40}}>
            <FullQueryResult patientNum={this.state.patientNum} ages={this.state.ages} races={this.state.races} genders={this.state.genders} religions={this.state.religions} languages={this.state.languages} ageJSON={this.state.ageJSON} queryName={this.state.queryName} handleCommonPattern={this.handleCommonPattern}/>

              <Dialog
              title="Common Patterns"
              actions={<FlatButton
              label="Close"
              primary={true}
              onClick={this.handleClose}/>}
              modal={true}
              open={this.state.open}
              autoScrollBodyContent={true}
            >
              <Paper zDepth={0}>
                <PatternTable patternResult={this.state.patternResult}/>
              </Paper>
            </Dialog>
          </div>

        </div>
      );
    } else {
        return (
            <div>
            <div className="row center-xs" style={{marginTop: 20, minWidth: 540}}>
                <div>
                    <RaisedButton label="Reset" icon={<Clear/>} backgroundColor={blueGrey300} onTouchTap={this.handleResetGroups} labelStyle={{color: 'white'}} style={{marginRight: 20}}/>

                <RaisedButton label="Search" icon={<Search/>} backgroundColor={blue500} onTouchTap={this.handleRunQuery}  labelStyle={{color: 'white'}}/>
                </div>

            </div>
            </div>
        );
    }
  }
}

export default connect((state) => {
  return {
    groupState: state.groupInfo,
    queryName: state.queryName
  }
})(RunQuery);
