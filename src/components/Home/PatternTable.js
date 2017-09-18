import React, { Component }  from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class PatternTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // var tableRows = [];
    // console.log("Pattern Result");
    // console.log(this.props.patternResult);
    // for (var row in this.props.patternResult) {
    //   tableRows.push(
    //     <TableRow>
    //       <TableRowColumn>{row.common_concepts}</TableRowColumn>
    //       <TableRowColumn>{row.name_char}</TableRowColumn>
    //       <TableRowColumn>{row.patients}</TableRowColumn>
    //     </TableRow>
    //   )
    // }
    return (
        <Table>
          <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Concept Code</TableHeaderColumn>
              <TableHeaderColumn>Concept Name</TableHeaderColumn>
              <TableHeaderColumn>No. of Patients</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
          displayRowCheckbox={false}>
              {this.props.patternResult.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{row.common_concepts}</TableRowColumn>
                <TableRowColumn>{row.name_char}</TableRowColumn>
                <TableRowColumn>{row.patients}</TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      );
    };
};

export default PatternTable;
