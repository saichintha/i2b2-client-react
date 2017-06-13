import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import axios from 'axios';
const apiURL = 'http://localhost:9000';
import Group from 'material-ui/svg-icons/social/group';
import Paper from 'material-ui/Paper';
import {blue500, grey900, grey400, grey700, grey300, blue100, blue800} from 'material-ui/styles/colors';
import Arrow from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
        patients: '-',
        testPath: null,
        dirColor: grey300,
        complete: false
    }

    
  }

   componentDidMount(){
        var patients = null;
        this.formatConceptPath();
        axios.post(apiURL + '/api/getp', {
            concept_dimcode: this.props.conceptDimcode
        })
        .then((response) => {
            patients = response.data;
            this.setState({
                patients: response.data,
                complete: true
            })
        })
        .catch((err) => {
            console.log(err);
        });
    //  this.setPatientNum({patients: patients});
    }

    formatConceptPath = () => {
        // console.log(this.props.conceptFullName);
        var subDirectories = this.props.conceptFullName.split(/\\/g);
        // console.log(subDirectories);
        var formattedDirectories = subDirectories.map((directory) => {
            if(directory != '' && directory != 'i2b2'){
                console.log(directory)
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

  render() {
      if(this.state.complete){
            return (
                <div>
                    <ListItem primaryText={
                        <Paper style={{display: 'inline-flex', backgroundColor:'transparent', width: '100%'}} zDepth={0}>
                            <div style={{width: '90%'}}>
                                <div style={{width: '90%', color: 'black', fontWeight: 500}}>
                                    {this.props.conceptName}
                                </div>
                                <div style={{fontSize: 12, color: grey700, marginTop: 4, width: '90%'}}>
                                    {/*{this.props.conceptDimcode.replace(/\\/g, " > ")}*/}
                                    {this.state.testPath}
                                </div>
                            </div>
                            <div style={{display: 'inline-flex', right: 50, bottom: 8, alignItems: 'center'}} onClick={() => this.getPatientNum()}>
                                <Group style={{paddingRight: 16}} color={blue800}/>
                            <span style={{ position: 'relative', color: blue800, fontWeight: 500}}>{this.state.patients} {this.props.visual}</span>
                            </div>
                        </Paper>
                    }
                    style={{width: '100%'}}
                    />

                    <Divider/>

                </div> 
                
            );
      } else {
          return (
                <div>
                    <ListItem primaryText={
                        <Paper style={{display: 'inline-flex', backgroundColor:'transparent', width: '100%'}} zDepth={0}>
                            <div style={{width: '90%'}}>
                                <div style={{width: '90%', color: 'black', fontWeight: 500}}>
                                    <div style={{width: 250, backgroundColor: grey400, padding: 6, borderRadius: 2}}>

                                    </div>
                                </div>

                                <div style={{fontSize: 12, color: grey700, marginTop: 4, width: '90%'}}>
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
                                <div style={{width: 50, backgroundColor: grey700, padding: 3, borderRadius: 2}}>

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