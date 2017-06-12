import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import axios from 'axios';
const apiURL = 'http://localhost:9000';
import Group from 'material-ui/svg-icons/social/group';
import Paper from 'material-ui/Paper';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
        patients: '-'
    }
  }

  async componentDidMount(){
      var patients = null;
    await axios.post(apiURL + '/api/getp', {
        concept_dimcode: this.props.conceptDimcode
    })
    .then((response) => {
        patients = response.data;
        this.setPatientNum(patients);
    })
    .catch((err) => {
        console.log(err);
    })
  }

  setPatientNum = (patients) => {
    this.setState({
        patients: patients
    })
  }

  render() {
    return (
        <div>
            <ListItem primaryText={
                <Paper style={{display: 'inline', backgroundColor:'transparent'}} zDepth={0}>
                    <div style={{display: 'inline'}}>
                        {this.props.conceptName}
                    </div>
                    <div style={{display: 'inline', position: 'absolute', right: 50, bottom: 8}} onClick={() => this.getPatientNum()}>
                        <Group style={{paddingRight: 16}}/>
                       <span style={{ position: 'relative', bottom: 5}}>{this.state.patients}</span>
                    </div>
                </Paper>
            }/>

        </div> 
        
    );
  }
}

export default SearchResult;