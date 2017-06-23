import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import axios from 'axios';
const apiURL = 'http://localhost:9000';
import Group from 'material-ui/svg-icons/social/group';
import Paper from 'material-ui/Paper';
import {blue500, grey900, grey400, grey700, grey300, blue100, blue800, green400, green600} from 'material-ui/styles/colors';
import Arrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import Add from 'material-ui/svg-icons/content/add-circle';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import PatientDemographics from './PatientDemographics';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
        patientNum: '-',
        testPath: null,
        dirColor: grey300,
        complete: false,
        demDiv: false,
        demDone: false
    }

  }

   componentDidMount(){
        this.formatConceptPath();
        axios.post(apiURL + '/api/usingBasecode', {
            searchText: this.props.conceptCode
        })
        .then((response) => {
            this.setState({
                patientNum: response.data,
                complete: true
            })
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getPatientDemInfo = () => {
        if(this.state.patientNum != null && !this.state.demDone){
            axios.post(apiURL + '/api/getPatientDem', {
                concept_basecode: this.props.conceptCode
            })
            .then((response) => {
                this.processDemographics(response.data);
            })
        } else {
            this.setState({
                demDiv: !this.state.demDiv
            })
        }
    }

    processDemographics = (rawDemJSON) => {
        var age = {}, lang = {}, race = {}, religion = {}, sex = {};
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
               sex[sexName] = dem.count;
           } 
        }
        var ageGroups = this.formatAges(age);
        this.setState({
            ages: ageGroups,
            races: race,
            genders: sex,
            religions: religion,
            languages: lang,
            demDone: true,
            demDiv: true
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

    formatConceptPath = () => {
        // console.log(this.props.conceptFullName);
        var subDirectories = this.props.conceptFullName.split(/\\/g);
        // console.log(subDirectories);
        var formattedDirectories = subDirectories.map((directory) => {
            if(directory != '' && directory != 'i2b2'){
                // console.log(directory)
                return (
                    <div style={{display: 'inline-flex'}}>
                        <div style={{display: 'inline-flex', padding: 3, borderRadius: 2,color: grey900, margin: 3, marginLeft: 0, backgroundColor: blue100, marginRight: 6}}>
                            {directory}
                        </div>
                    </div>
                    
                );
            }
        });

        this.setState({
            testPath: formattedDirectories
        })
    }

    handleAdd = (e) => {
        this.setState({
            addOpen: true,
            anchorEl: event.currentTarget,
        });
    }

    handleRequestClose = () => {
        this.setState({
            addOpen: false,
        });
    };

  render() {
      var demDiv = (<div/>);
      if(this.state.demDiv){
        demDiv = (
            <div>
                <PatientDemographics age={this.state.ages} race={this.state.races} gender={this.state.genders} religion={this.state.religions} lang={this.state.languages}/>
            </div>
        );
      }
      if(this.state.complete){
            return (
                <div>
                    
                    <ListItem primaryText={
                        <Paper style={{display: 'inline-flex', backgroundColor:'transparent', width: '100%'}} zDepth={0}>
                            <div style={{display: 'inline-flex', marginRight: 20}} ref={(input) => { this.addButton = input; }}>
                                    <Add color={green400} style={{cursor: 'pointer'}} hoverColor={green600}
                                    onClick={() => {this.handleAdd()}}
                                    />

                                    <Popover
                                    open={this.state.addOpen}
                                    anchorEl={this.addButton}
                                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                    onRequestClose={this.handleRequestClose}
                                    style={{marginTop: '-10px'}}
                                    >
                                    <Menu>
                                        <MenuItem primaryText="Group 1" />
                                        <MenuItem primaryText="Group 2" />
                                        <MenuItem primaryText="Group 3" />
                                        <MenuItem primaryText="Add Group" />
                                    </Menu>
                                    </Popover>
                            </div>

                            <div style={{width: '87%'}}>
                                <div style={{width: '87%', color: 'black', fontWeight: 500, display: 'inline-flex'}}>
                                    {this.props.conceptName}
                                    {/*<div style={{display: 'inline-flex', backgroundColor: green400, borderRadius: 2, padding: 3, marginLeft: 15, position: 'relative', bottom: 3, color: 'white', fontSize: 12}}>
                                        ADD
                                    </div>*/}
                                </div>
                                <div style={{fontSize: 12, color: grey700, marginTop: 4, width: '87%'}}>
                                    {/*{this.props.conceptDimcode.replace(/\\/g, " > ")}*/}
                                    {this.state.testPath}
                                </div>
                            </div>
                            <div style={{display: 'inline-flex', right: 50, bottom: 8, alignItems: 'center'}}>
                                <Group style={{paddingRight: 16}} color={blue800}/>
                            <span style={{ position: 'relative', color: blue800, fontWeight: 500}}>{this.state.patientNum}</span>
                            </div>
                        </Paper>
                    }
                    style={{width: '100%'}}
                    onTouchTap={this.getPatientDemInfo}
                    />
                
                    <Divider/>

                    <div>
                           {demDiv} 
                    </div>

                </div> 
                
            );
      } else {
          return (
                <div>
                    <ListItem primaryText={
                        <Paper style={{display: 'inline-flex', backgroundColor:'transparent', width: '100%'}} zDepth={0}>
                            <div style={{display: 'inline-flex', marginRight: 20, backgroundColor: green400, width: 24, height: 24, borderRadius: '50%'}}>
                                
                            </div>
                            <div style={{width: '87%'}}>
                                <div style={{width: '87%', color: 'black', fontWeight: 500}}>
                                    <div style={{width: 250, backgroundColor: grey400, padding: 6, borderRadius: 2}}>

                                    </div>
                                </div>

                                <div style={{fontSize: 12, color: grey700, marginTop: 4, width: '87%'}}>
                                    <div style={{display: 'inline-flex'}}>
                                        <div style={{display: 'inline-flex', padding: 10, borderRadius: 2,color: grey900, margin: 3, marginLeft: 0, backgroundColor: blue100, marginRight: 6, width: 80}}>
                                            
                                        </div>

                                        <div style={{display: 'inline-flex', padding: 10, borderRadius: 2,color: grey900, margin: 3, marginLeft: 0, backgroundColor: blue100, marginRight: 6, width: 80}}>
                                            
                                        </div>

                                        <div style={{display: 'inline-flex', padding: 10, borderRadius: 2,color: grey900, margin: 3, marginLeft: 0, backgroundColor: blue100, marginRight: 6, width: 80}}>
                                            
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div style={{display: 'inline-flex', right: 50, bottom: 8, alignItems: 'center'}}>
                                <div style={{width: 40, padding: 12, backgroundColor: blue100, borderRadius: 2}}>

                                </div>
                            </div>
                        </Paper>
                    }
                    style={{width: '100%'}}
                    />

                    <Divider/>

                </div> 
          );
      }
    
  }
}

export default SearchResult;