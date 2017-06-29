import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {blue400, grey900, grey500,grey800, grey300, green400, green500, blue200, blue600, blue500, blueGrey300} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Masonry from 'react-masonry-component';
import QueryResult from './QueryResult';

import {connect} from 'react-redux';
import * as actions from './../../redux/actions.js'

class PreviousQueries extends Component {
  constructor(props) {
    super(props);

    this.state = {
        queryName: null,
        groupState: props.groupState || []
    }
  }

  render() {
    const {pastQueries} = this.props;
    var queryResultDivs = (null);

    queryResultDivs = pastQueries.map((query) => {
        return (
            <QueryResult patientNum={query.patientNum} ages={query.ages} races={query.races} genders={query.genders} religions={query.religions} languages={query.languages} queryName={query.queryName} queryID={query.queryID} queryConceptInfo={query.queryConceptInfo} timeQueried={query.timeQueried}/>
        );
    })
    return (
        <div>
        <div style={{marginTop: 80, marginLeft: 15, fontSize: 20, color: grey800, fontFamily: 'Roboto'}}>
                Previous Query Results
            </div>
            <div style={{marginTop: 25, marginBottom: 30}}>
                <Masonry
                elementType={'div'}
                className={'queryResult'}
                >
                    {/*<QueryResult/>
                    <QueryResult/>
                    <QueryResult/>
                    <QueryResult/>*/}
                    {queryResultDivs}
                </Masonry>
            </div>
        </div>
    );
  }
}

export default connect((state) => {
  return {
    pastQueries: state.pastQueries
  }
})(PreviousQueries);
