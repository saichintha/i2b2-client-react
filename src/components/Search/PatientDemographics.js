import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {grey200, grey300, grey400, grey800, grey100, grey50, blue500, green500, orange500, red500, teal500} from 'material-ui/styles/colors';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const tableColumnStyles = {
  height: 24,
  paddingLeft: 6,
  paddingRight: 6
}

class PatientDemographics extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var raceDiv = [];
    var religionDiv = [];
    var langDiv = [];
    var ageDiv = [];
    for (var key in this.props.race) {
        raceDiv.push(<div style={{lineHeight: 1.8}}>{key.replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase()})} - {this.props.race[key]}</div>)
    }
    for (var key in this.props.religion) {
        religionDiv.push(<div style={{lineHeight: 1.8}}>{key.replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase()})} - {this.props.religion[key]}</div>)
    }
    for (var key in this.props.lang) {
        langDiv.push(<div style={{lineHeight: 1.8}}>{key.replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase()})} - {this.props.lang[key]}</div>)
    }

    var titleDiv = (<h4 style={{fontFamily: 'Roboto'}}>Patient Set Demographics</h4> );
    if(!this.props.showTitle){
      titleDiv = (null)
    }
    return (
            <Paper style={{display: 'inline-flex', backgroundColor: 'transparent', width: '100%', padding: 10, borderRadius: 0}} zDepth={0}>
                
                <div style={{display: 'inline-flex', marginRight: 20, backgroundColor: 'transparent', width: 30, marginBottom: 50}} />
                <div style={{width: '100%'}}>
                  
                    <div style={{width: '100%', color: 'black', fontWeight: 400, fontFamily: 'Roboto Mono', marginRight: 50}}>
                            

                            <Paper style={{marginTop: 14, fontSize: 13, color: grey800, display: 'inline-flex', borderRadius: 2, padding: 10, marginRight: 20}}>
                              
                              <div style={{marginTop: 4}}>
                                <Paper zDepth={0} style={{padding: 16,paddingTop:0, fontSize: 14, color: red500, marginBottom: 10}}>Gender</Paper>
                                 {/* <h6 style={{color: red500, paddingBottom: 12, fontSize: 14}}>Gender</h6> */}
                                 {/* <Divider/>   */}
                                <div style={{lineHeight: 1.8}}>Male - {this.props.gender.m|| '0'}</div>
                                <div style={{lineHeight: 1.8}}>Female - {this.props.gender.f || '0'}</div>
                                <div style={{lineHeight: 1.8}}>Unknown - {this.props.gender[2] || '0'}</div>
                              </div>
                            </Paper>

                            <Paper style={{marginTop: 14, fontSize: 13, color: grey800, display: 'inline-flex', marginRight: 20, padding: 10}}>
                              
                              <div style={{marginTop: 4}}>
                                <Paper zDepth={0} style={{padding: 16,paddingTop:0, fontSize: 14, color: teal500}}>Age</Paper>
                                {/* <h6 style={{color: teal500, paddingBottom: 12, fontSize: 14}}>Age</h6> */}
                                {/* <Divider/> */}
                                <div style={{lineHeight: 1.8}}>&lt; 9 - {this.props.age[0]}</div>
                                <div style={{lineHeight: 1.8}}>10-17 - {this.props.age[1]}</div>
                                <div style={{lineHeight: 1.8}}>18-34 - {this.props.age[2]}</div>
                                <div style={{lineHeight: 1.8}}>35-44 - {this.props.age[3]}</div>
                                <div style={{lineHeight: 1.8}}>45-54 - {this.props.age[4]}</div>
                                <div style={{lineHeight: 1.8}}>55-64 - {this.props.age[5]}</div>
                                <div style={{lineHeight: 1.8}}>65-74 - {this.props.age[6]}</div>
                                <div style={{lineHeight: 1.8}}>75-84 - {this.props.age[7]}</div>
                                <div style={{lineHeight: 1.8}}>&ge; 85 - {this.props.age[8]}</div>
                              </div>
                            </Paper>

                            <Paper style={{marginTop: 14, color: grey800, fontSize: 13, display: 'inline-flex', marginRight: 20, border: `solid 1px ${grey300}`, borderRadius: 2, padding: 10}}>
                              
                              <div style={{marginTop: 4}}>
                                <Paper zDepth={0} style={{padding: 16,paddingTop:0, fontSize: 14, color: blue500}}>Race</Paper>
                                {/* <h6 style={{color: blue500, paddingBottom: 12, fontSize: 14}}>Race</h6> */}
                                {/* <Divider/> */}
                                {raceDiv}
                              </div>
                            </Paper>

                            <Paper style={{marginTop: 14, color: grey800, fontSize: 13, display: 'inline-flex', marginRight: 20, border: `solid 1px ${grey300}`, borderRadius: 2, padding: 10}}>
                              
                              <div style={{marginTop: 4}}>
                                <Paper zDepth={0} style={{padding: 16,paddingTop:0, fontSize: 14, color: green500}}>Religion</Paper>
                                {/* <h6 style={{color: green500, paddingBottom: 12, fontSize: 14}}>Religion</h6> */}
                                {/* <Divider/> */}
                                {religionDiv}
                              </div>
                            </Paper>

                            <Paper style={{marginTop: 14, fontSize: 13, color: grey800, display: 'inline-flex', marginRight: 20, border: `solid 1px ${grey300}`, borderRadius: 2, padding: 10}}>
                              
                              <div style={{marginTop: 4}}>
                                <Paper zDepth={0} style={{padding: 16,paddingTop:0, fontSize: 14, color: orange500}}>Language</Paper>
                                {/* <h6 style={{color: orange500, paddingBottom: 5, fontSize: 14}}>Language</h6> */}
                                {/* <Divider/> */}
                                {langDiv}
                              </div>
                            </Paper>

                            
                    </div>  
                              
                </div>
            </Paper>
    );
  }
}

export default PatientDemographics;
