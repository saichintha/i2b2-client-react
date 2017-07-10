import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as actions from '../../redux/actions.js'
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import SearchResult from './SearchResult';

class SearchResultList extends Component {
    constructor(props){
        super(props);
        this.count = 1;
        this.state = {
            resArray: null
        }
    }

    componentWillReceiveProps (nextProps) {
        console.log(nextProps.resultData);
        var that = this;
        if(nextProps.resultData.length > 0){
            var resArray = nextProps.resultData.map(function(row) {
                return (<SearchResult conceptName={row.c_name} conceptFullName={row.c_fullname} conceptCode={row.c_basecode} conceptDimcode={row.c_basecode} patientNum={row.patient_num} key={that.count++} past={false}/>)
            });
            this.setState({
                resArray: resArray
            })
        } else {
            this.setState({
                resArray: (<Paper zDepth={0} style={{backgroundColor: 'transparent', textAlign: 'center', padding: 20}}>
                    <h3>No results to display.</h3>
                </Paper>)
            })
        }
    }

    render() {
        var resArray = (<Paper zDepth={0} style={{backgroundColor: 'transparent', textAlign: 'center', padding: 20}}>
                    <h3>No results to display.</h3>
                </Paper>);

        if(this.state.resArray){
            resArray = this.state.resArray;
        }
        return (
        <Paper zDepth={1}>
            {resArray}
        </Paper>
        );
    }
}

export default connect((state) => {
  return {
    resultData: state.treeData
  }
})(SearchResultList);
