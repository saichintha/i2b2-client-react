import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import PatientDemographics from './PatientDemographics';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryContainer } from 'victory';
import {blue400, grey900, grey500,grey800, grey300, green400, green500, blue200, blue600, blue500, blueGrey300} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class FullQueryResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
            <Card>
                <CardTitle title="Query Name" titleStyle={{fontSize: 16, color: 'white'}} style={{backgroundColor: green400, paddingTop: 3, paddingBottom: 3}}/>
                <CardText style={{padding: 6, height: 100}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 6, fontSize: 40, fontFamily: 'Roboto Mono', justifyContent: 'center', marginRight: 5, height: 'inherit', color: grey800}}>
                        <div>{this.props.patientNum}</div>
                        <div style={{display: 'block', position: 'relative', marginTop: 10, color: grey500, textAlign: 'center', fontFamily: 'Roboto', fontSize: 16}}>
                            patients
                        </div>
                    </div>
                </CardText>
                <CardText style={{paddingTop: 0}}>
                    <PatientDemographics age={this.props.ages} race={this.props.races} gender={this.props.genders} religion={this.props.religions} lang={this.props.languages} showTitle={false}/>
                </CardText>
            </Card>
                
        </div>
    );
  }
}

export default FullQueryResult;
