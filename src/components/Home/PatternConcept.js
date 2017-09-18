import React, { Component }  from 'react';
import {ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {blue500, grey900, grey400, grey700, grey300,grey100, blue100, blue800, green400, green600, amber500, teal500} from 'material-ui/styles/colors';

class PatternConcept extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
          <ListItem primaryText={
              <Paper style={{display: 'inline-flex', backgroundColor:'transparent', width: '100%'}} zDepth={0}>
                  <div style={{width: '87%'}}>
                      <div style={{width: '87%', color: 'black', fontWeight: 500}}>
                          <div style={{width: 250, padding: 6, borderRadius: 2}}>
                            {this.props.conceptName}
                          </div>
                      </div>

                      <div style={{fontSize: 12, color: grey700, marginTop: 4, width: '87%'}}>
                          <div style={{display: 'inline-flex'}}>
                              <div style={{display: 'inline-flex', padding: 10, borderRadius: 2,color: grey900, margin: 3, marginLeft: 0, marginRight: 6, width: 80}}>
                                {this.props.conceptCode}
                              </div>
                          </div>
                      </div>
                  </div>
                  <div style={{display: 'inline-flex', right: 70, bottom: 8, alignItems: 'center'}}>
                      <div style={{width: 40, padding: 12}}>
                          {this.props.percentage} %
                      </div>
                  </div>
              </Paper>
          }
          style={{width: '100%'}}
          />

          <Divider/>

      </div>
      );
    };
};

export default PatternConcept;
