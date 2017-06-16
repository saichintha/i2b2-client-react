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

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
        patients: null,
        patientNum: '-',
        testPath: null,
        dirColor: grey300,
        complete: false,
        demDiv: false
    }

    
  }

   componentDidMount(){
        this.formatConceptPath();
        axios.post(apiURL + '/api/usingBasecode', {
            searchText: this.props.conceptCode
        })
        .then((response) => {
            this.setState({
                patients: response.data,
                patientNum: response.data.length.toString(),
                complete: true
            })
            // console.log('Patient set', response.data, typeof(response.data));
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getPatientDemInfo = () => {
        if(this.state.patients){
            var patientArray = this.state.patients.map((patient) => {
                return patient.patient_num
            });

            axios.post(apiURL + '/api/getPatientDem', {
                patientSet: patientArray.toString()
            })
            .then((response) => {
                // console.log('Patient Dem Info', response.data);
                this.parsePatientDemData(response.data);
            })
        }
        
    }

    parsePatientDemData = (patientDemArray) => {
        var patientArray = patientDemArray.map((patient) => {
            return patient.concept_cd;
        });
        // console.log(patientArray)
        var ageArray = [];
        var raceArray = [];
        var religionArray = [];
        var genderArray = [];
        var langArray = [];
        for (var i in patientArray) {
            const dem = patientArray[i];
            if (dem.includes('AGE') && !dem.includes('LANGUAGE')) {
                // console.log(dem.split(':')[1]);
                ageArray.push(parseInt(dem.split(':')[1]));
            } else if (dem.includes('RACE')) {
                raceArray.push(dem.split(':')[1]);
            } else if (dem.includes('RELIGION')) {
                religionArray.push(dem.split(':')[1]);
            } else if (dem.includes('LANGUAGE')) {
                langArray.push(dem.split(':')[1]);
            } else if (dem.includes('SEX')) {
                genderArray.push(dem.split(':')[1]);
            }
        }

        this.setState({
            ages: this.formatAgesToAgeGroups(ageArray),
            races: this.formatDemArray(raceArray),
            genders: this.formatGender(genderArray),
            religions: this.formatDemArray(religionArray),
            languages: this.formatDemArray(langArray)
        })

    }

    formatDemArray = (demArray) => {
        var dems = {}
        for (var i in demArray) {
            const dem = demArray[i];
            if(!dems[dem]){
                dems[dem] = 1;
            } else {
                dems[dem] = dems[dem] + 1;
            }
        }
        return dems;
    }

    formatGender = (genderArray) => {
        var males = 0;
        var females = 0;
        var unknown = 0;
        for (var i in genderArray) {
            if (genderArray[i] == 'm'){
                males++;
            } else if (genderArray[i] == 'f') {
                females++
            } else {
                unknown++;
            }
        }
        return [males, females, unknown];
    }

    formatAgesToAgeGroups = (ageArray) => {
        var ageGroupArray = [0,0,0,0,0,0,0,0,0];
        for (var i in ageArray) {
            const age = ageArray[i];
            if (age > 0 && age <= 9) {
                ageGroupArray[0]++;
            } else if (age > 9 && age <= 17) {
                ageGroupArray[1]++;
            } else if (age > 17 && age <= 34) {
                ageGroupArray[2]++;
            } else if (age > 34 && age <= 44) {
                ageGroupArray[3]++;
            } else if (age > 44 && age <= 54) {
                ageGroupArray[4]++;
            } else if (age > 54 && age <= 64) {
                ageGroupArray[5]++;
            } else if (age > 64 && age <= 74) {
                ageGroupArray[6]++;
            } else if (age > 74 && age <= 84) {
                ageGroupArray[7]++;
            } else if (age > 84) {
                ageGroupArray[8]++;
            }
        }
        this.setState({
            demDiv: true
        })
        return ageGroupArray;
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
        e.preventDefault();
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
                {this.state.age}
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