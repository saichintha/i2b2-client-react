import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import axios from 'axios';

// const apiURL = 'https://35.190.186.6:8443';
const apiURL = 'http://localhost:9000';

import Group from 'material-ui/svg-icons/social/group';
import Paper from 'material-ui/Paper';
import {blue500, grey900, grey400, grey700, grey300,grey100, blue100, blue800, green400, green600, amber500, teal500} from 'material-ui/styles/colors';
import Arrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import DemIcon from 'material-ui/svg-icons/editor/pie-chart';
import Chart from 'material-ui/svg-icons/editor/insert-chart';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import Add from 'material-ui/svg-icons/content/add-circle';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import PatientDemographics from './PatientDemographics';
import IconButton from 'material-ui/IconButton';
import uuid from 'uuid/v4';
import {connect} from 'react-redux';
import * as actions from './../../redux/actions.js'
import Hierarchy from 'material-ui/svg-icons/content/filter-list';
import HierarchyView from './HierarchyView';
import QueryGroupArea from '../Home/QueryGroupArea';
import Close from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
        patientNum: this.props.patientNum,
        testPath: null,
        dirColor: grey300,
        complete: true,
        demDiv: false,
        demDone: false,
        treeDiv: false,
        groupDiv: false
    }
  }

   componentDidMount(){
        this.formatConceptPath();
    }

    getPatientDemInfo = () => {
        if(this.state.patientNum != null && !this.state.demDone){
            axios.post(apiURL + '/api/getPatientDem', {
                concept_basecode: this.props.conceptCode
            })
            .then((response) => {
                // console.log(response)
                this.processDemographics(response.data);
            })
        } else {
            this.setState({
                demDiv: !this.state.demDiv,
                treeDiv: false,
                groupDiv: false
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
            demDiv: true,
            treeDiv: false,
            groupDiv: false
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
            // addOpen: true,
            // anchorEl: event.currentTarget,
            groupDiv: true,
            demDiv: false,
            treeDiv: false
        });
    }

    handleRequestClose = () => {
        this.setState({
            addOpen: false,
        });
    };

    handleAddToGroup = (event, menuItem, index) => {
        var {dispatch} = this.props;
        // var elementID = uuid();
        // dispatch(actions.addConceptToGroup(index+1, 
        //     this.props.conceptName,
        //     this.props.conceptCode,
        //     this.state.patientNum,
        //     elementID
        // ));
        // this.setState({
        //     addOpen: false
        // });

        dispatch(actions.activeSearchResult(
            this.props.conceptName,
            this.props.conceptCode,
            this.state.patientNum,
            this.props.conceptFullName,
            this.props.conceptDimcode,
            this.props.visual,
        ))
        this.setState({
            // addOpen: true,
            // anchorEl: event.currentTarget,
            groupDiv: true,
            demDiv: false,
            treeDiv: false
        });
        
        // if(!this.props.past){
        //     var searchResultPackage = {
        //         conceptName: this.props.conceptName,
        //         conceptFullName: this.props.conceptFullName,
        //         conceptCode: this.props.conceptCode,
        //         conceptDimcode: this.props.conceptDimcode,
        //         visual: this.props.visual,
        //         patientNum: this.state.patientNum
        //     }
        //     dispatch(actions.addSearchResult(searchResultPackage))
        // }

        // dispatch(actions.openSnackBar(true, 'Added – ', this.props.conceptName, elementID))
    }

    viewHierarchy = () => {
        this.setState({
            treeDiv: !this.state.treeDiv,
            demDiv: false,
            groupDiv: false
        })
    }

    handleCloseGroup = () => {
        this.setState({
            groupDiv: false
        })
    }

  render() {
      var demDiv = (<div/>);
      var treeDiv = (<div/>);
      var groupDiv = (<div/>);
      var addGroupButton = (
        <IconButton tooltip="Add to group" onTouchTap={this.handleAddToGroup} style={{paddingLeft: 4, paddingRight: 4}} touch={true}>
            <Add color={green400}/>
        </IconButton>
      );
      if(this.state.demDiv){
        demDiv = (
            <div style={{backgroundColor: grey100}}>
                <Paper zDepth={0} style={{padding: 16, backgroundColor: teal500, color: 'white', fontSize: 16, fontWeight: 500, paddingLeft: 24, borderRadius: 0}}>
                    Patient Set Demographics
                </Paper>
                <PatientDemographics age={this.state.ages} race={this.state.races} gender={this.state.genders} religion={this.state.religions} lang={this.state.languages}/>
                <Divider/>
            </div>
        );
      }
      if(this.state.treeDiv){
          treeDiv = (
              <div style={{backgroundColor: grey100}}>
                <HierarchyView searchTerm={this.props.conceptName}/>
                <Divider/>
            </div>
          )
      }

      if(this.state.groupDiv){
          addGroupButton = (
            <IconButton tooltip="Close" onTouchTap={this.handleCloseGroup} style={{paddingLeft: 4, paddingRight: 4, backgroundColor: amber500, borderRadius: '50%', alignItems: 'center', width: 24, height: 20, marginTop: 5, marginLeft: 15, marginRight: 10}} touch={true} iconStyle={{position: 'relative', bottom: 11, right: 3, height: 22, width: 22}}>
                <Close color={'white'}/>
            </IconButton>
          )
          groupDiv=(
              <div style={{backgroundColor: grey100}}>
                <Paper zDepth={0} style={{backgroundColor: teal500, fontSize: 16, paddingTop: 16, position: 'relative', paddingRight: 24, paddingLeft: 25, color:'white', fontWeight: 500, paddingBottom: 16, borderRadius: 0}}>Current Group State</Paper> 
                <div style={{paddingLeft: 24, paddingRight: 24}}>
                    
                    <QueryGroupArea mainDashboard={false}/>
                    
                </div>
                <Divider style={{marginTop: 6}}/>
              </div>
          )
      }
      if(this.state.complete){
          var patientNum = (<span style={{ position: 'relative', color: blue800, fontWeight: 500, fontFamily: 'Roboto Mono'}}> - </span>);
          if(this.state.patientNum != null){
            patientNum = (<span style={{ position: 'relative', color: blue800, fontWeight: 500, fontFamily: 'Roboto Mono'}}>{this.state.patientNum}</span>);
          }
            return (
                <div style={{backgroundColor: 'white'}}>
                        <Paper style={{display: 'inline-flex', backgroundColor: 'transparent', width: '100%', padding: 14}} zDepth={0}>
                            <div style={{display: 'inline-flex', marginRight: 20}} ref={(input) => { this.addButton = input; }}>

                                    {addGroupButton}

                                    <Popover
                                    open={this.state.addOpen}
                                    anchorEl={this.addButton}
                                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                    onRequestClose={this.handleRequestClose}
                                    style={{marginTop: '-10px'}}
                                    >
                                    <Menu
                                    onItemTouchTap={this.handleAddToGroup}>
                                        <MenuItem primaryText="Group 1"/>
                                        <MenuItem primaryText="Group 2"/>
                                        <MenuItem primaryText="Group 3"/>
                                    </Menu>
                                    </Popover>
                            </div>

                            <div style={{width: '82%'}}>
                                <div style={{width: '82%', color: 'black', fontWeight: 500, display: 'inline-flex'}}>
                                    {this.props.conceptName}
                                </div>
                                <div style={{fontSize: 12, color: grey700, marginTop: 4, width: '82%'}}>
                                    {/*{this.props.conceptDimcode.replace(/\\/g, " > ")}*/}
                                    {this.state.testPath}
                                </div>
                            </div>
                            <div style={{display: 'inline-flex', right: 100, bottom: 8, alignItems: 'center'}}>
                                {/*<IconButton tooltip="Patient Demographics" onTouchTap={this.getPatientDemInfo} style={{paddingRight: 6}} onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>
                                    <DemIcon color={blue800} style={{padding: 0}}/>
                                </IconButton>*/}
                                
                                <IconButton tooltip="View Demographics" onTouchTap={this.getPatientDemInfo} style={{marginRight: 6}} onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave} touch={true}>
                                    <Chart color={blue800}/>
                                </IconButton>
                                <IconButton tooltip="View In Hierarchy" onTouchTap={this.viewHierarchy} style={{marginRight: 6}} onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave} touch={true}>
                                    <Hierarchy color={blue800}/>
                                </IconButton>
                                <div style={{display: 'inline-flex', marginRight:16}}>
                                    {patientNum}
                                </div>
                                {/*<Group style={{paddingRight: 16, paddingLeft: 12}} color={blue800}/>
                                    {patientNum}*/}
                            </div>
                        </Paper>
                    <Divider />

                        {demDiv} 
                        {treeDiv}
                        {groupDiv}

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

export default connect()(SearchResult);