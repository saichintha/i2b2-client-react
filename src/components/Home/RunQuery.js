import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Search from 'material-ui/svg-icons/action/search';
import Avatar from 'material-ui/Avatar';
import {blue400, grey900, grey500, grey300, blue100, blue200, blue600} from 'material-ui/styles/colors';
import axios from 'axios';
const apiURL = 'http://localhost:9000';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import PatientDemographics from './PatientDemographics';

class RunQuery extends Component {
  constructor(props) {
    super(props);

    this.state = {
        groupInfo: this.props.groupInfo,
        patientNum: null,
        complete: false,
    }
  }

  processDemographics = (rawDemJSON) => {
        var age = {}, lang = {}, race = {}, religion = {}, sex = {}, patientNum = 0;
        for (var i in rawDemJSON) {
            const dem = rawDemJSON[i];
           if (dem.concept_cd.includes('DEM|AGE')) {
                const ageNum = dem.concept_cd.split(':')[1];
                age[ageNum] = dem.count;
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
        var ageGroups = this.formatAges(age);
        this.setState({
            ages: ageGroups,
            races: race,
            genders: sex,
            religions: religion,
            languages: lang,
            patientNum: patientNum,
            complete: true
        })
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
          groupInfo[group.groupNum-1].push(group.conceptInfo.conceptCode);
        }
    }

    var queryGroups = [];
    for (var i in groupInfo) {
      if(groupInfo[i].length > 0){
        queryGroups.push(groupInfo[i])
      }
    }
    console.log(queryGroups)
    axios.post(apiURL + '/api/groupQuery', {
            queryGroups: JSON.stringify(queryGroups)
        })
        .then((results) => {
          // const patients = result.data[0].array_length;
          console.log(results.data);
          this.processDemographics(results.data);
        })
        .catch((err) => console.log(err));
  }

  render() {
    if(this.state.complete){
      return (
        <div className="row center-xs" style={{marginTop: 20, minWidth: 540, display: 'block'}}>
          <div style={{marginTop: 20, marginBottom: 20}} className="row center-xs">
            <FlatButton label="Search" primary={true} icon={<Search/>} backgroundColor={blue100} hoverColor={blue200} rippleColor={blue400} onTouchTap={this.handleRunQuery}/>
          </div>
            
          <div style={{padding: 32, borderRadius: 2, border: `1px solid ${blue600}`, marginTop: 20, marginBottom: 20, marginRight: '1.2em', marginLeft: '1.2em'}}>
              <div style={{minWidth: 540}} className="row center-xs">
                <Paper style={{color: blue600, fontSize: 28, backgroundColor: 'transparent', margintLeft: 20}} zDepth={0}>
                  <div style={{padding: 10, borderRadius: 2, fontWeight: 400, fontFamily: 'Roboto'}}>
                    <strong style={{fontFamily: 'Roboto Mono'}}>{this.state.patientNum}</strong> <span style={{fontSize: 18}}>patients</span>
                  </div>
                </Paper>
              </div>

              <div style={{marginTop: 20, minWidth: 540}} className="row center-xs">
                  <Paper zDepth={0} style={{backgroundColor: 'transparent', display: 'block'}}>
                    <PatientDemographics age={this.state.ages} race={this.state.races} gender={this.state.genders} religion={this.state.religions} lang={this.state.languages}/>
                  </Paper>
              </div>
                
          </div>
        </div>
      );
    } else {
        return (
            <div className="row center-xs" style={{marginTop: 20, minWidth: 540}}>
                <FlatButton label="Search" primary={true} icon={<Search/>} backgroundColor={blue100} hoverColor={blue200} rippleColor={blue400} onTouchTap={this.handleRunQuery}/>
            </div>
        );
    }
  }
}

export default connect((state) => {
  return {
    groupState: state.groupInfo
  }
})(RunQuery);
