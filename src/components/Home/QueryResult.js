import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import PatientDemographics from './PatientDemographics';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryContainer } from 'victory';
import {blue400, grey900, grey500,grey800, grey300, green400, green500, blue200, blue600, blue500, blueGrey300} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class QueryResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div style={{width: 200, height: 225, marginRight: 10, marginLeft: 10}}>

            {/*<Paper zDepth={1} style={{height: 'inherit', width: 'inherit'}}>
                <div style={{paddingLeft: 20, paddingTop: 14, paddingBottom: 14,backgroundColor: green600, fontSize: 14, color: 'white'}}>
                        Query Name
                </div>
                  <div style={{padding: 10,height: '73%'}}>
                    <div style={{fontFamily: 'Roboto Mono', fontSize: 26, textAlign: 'center'}}>29</div>
                    <div style={{fontSize: 18, textAlign: 'center', paddingTop: 10}}>patients</div>
                  </div>

                  <div style={{}}>

                  </div>
            </Paper>*/}

            <Card>
                <CardTitle title="Query Name" titleStyle={{fontSize: 16, color: grey900}} style={{backgroundColor: grey300, paddingTop: 3, paddingBottom: 3}}/>
                <CardText style={{padding: 6, height: 100}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 6, fontSize: 40, fontFamily: 'Roboto Mono', justifyContent: 'center', marginRight: 5, height: 'inherit', color: grey800}}>
                        <div>89</div>
                        <div style={{display: 'block', position: 'relative', marginTop: 10, color: grey500, textAlign: 'center', fontFamily: 'Roboto', fontSize: 16, marginBottom: 10}}>
                            patients
                        </div>
                    </div>
                </CardText>
                <Divider/>
                <CardActions>
                    <FlatButton label="More Info" labelStyle={{color: grey900}}/>
                </CardActions>
            </Card>
                
        </div>
    );
  }
}

export default QueryResult;
