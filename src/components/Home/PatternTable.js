import React, { Component }  from 'react';
import {List} from 'material-ui/List';
import PatternConcept from './PatternConcept';

class PatternTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
          <List
          displayRowCheckbox={false}>
              {this.props.patternResult.map( (row, index) => (
                <PatternConcept
                  conceptName={row.name_char}
                  conceptCode={row.common_concepts}
                  percentage={Math.round(100*(row.patients/this.props.patientNum))}
                />
              ))}
          </List>
      );
    };
};

export default PatternTable;
