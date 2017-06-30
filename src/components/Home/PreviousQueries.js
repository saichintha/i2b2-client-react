import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {blue400, grey900, grey500,grey800, grey300, green400, grey600, blue200, blue600, blue500, blueGrey300, amber300} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Masonry from 'react-masonry-component';
import QueryResult from './QueryResult';
import Empty from 'material-ui/svg-icons/action/find-in-page';

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
    var emptyMsg = (null);
    queryResultDivs = pastQueries.map((query) => {
        return (
            <QueryResult patientNum={query.patientNum} ages={query.ages} races={query.races} genders={query.genders} religions={query.religions} languages={query.languages} queryName={query.queryName} queryID={query.queryID} queryConceptInfo={query.queryConceptInfo} timeQueried={query.timeQueried}/>
        );
    })

    if(pastQueries.length === 0){
        emptyMsg = (
            <div style={{minWidth: 540}} className="row center-xs">
                <div className="col-xs-8" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{alignItems: 'center', justifyContent: 'center', marginTop: 40}}>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 240, height: 240, borderRadius: '50%', backgroundColor: grey300}}>
                            <Empty style={{height: 125, width: 125}} color={'#ffbd00'}/>
                        </div>
                        
                        <Paper style={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginTop: 34, color: grey600, marginLeft: 8}} zDepth={0}>
                            No previous queries.
                        </Paper>
                    </div>
                    
                </div>
            </div>
        );
    }

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

                {emptyMsg}
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
