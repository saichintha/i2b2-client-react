import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {blue400, grey900, grey500,grey800, grey300, green400, grey600, blue200, blue600, blue500, green600, amber300} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Masonry from 'react-masonry-component';
import QueryResult from './QueryResult';
import Empty from 'material-ui/svg-icons/action/list';
import SearchResult from './SearchResult';
import {connect} from 'react-redux';
import * as actions from './../../redux/actions.js'

class PreviousSearchConcepts extends Component {
  constructor(props) {
    super(props);
    this.state = {
        queryName: null,
        groupState: props.groupState || []
    }
    this.count = 1;
  }

  render() {
    const {pastConcepts} = this.props;
    const that = this;
    var searchConceptDivs = (null);
    var emptyMsg = (null);
    searchConceptDivs = pastConcepts.map((concept) => {
        return (
            <SearchResult conceptName={concept.conceptName} conceptFullName={concept.conceptFullName} visual={concept.visual} conceptCode={concept.conceptCode} conceptDimcode={concept.conceptDimcode} past={true} patientNum={concept.patientNum} key={that.count++}/>
        );
    })

    if(pastConcepts.length === 0){
        emptyMsg = (
            <div style={{minWidth: 540}} className="row center-xs">
                <div className="col-xs-8" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div style={{alignItems: 'center', justifyContent: 'center', marginTop: 40}}>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 240, height: 240, borderRadius: '50%', backgroundColor: grey300}}>
                            <Empty style={{height: 125, width: 125}} color={green600}/>
                        </div>
                        
                        <Paper style={{display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', marginTop: 34, color: grey600, marginLeft: 8}} zDepth={0}>
                            No previously searched concepts.
                        </Paper>
                    </div>
                    
                </div>
            </div>
        );
    }

    return (
        <div>
        <div style={{marginLeft: 15, fontSize: 20, color: grey800, fontFamily: 'Roboto'}}>
                Previously Searched Concepts
            </div>
            <div style={{marginTop: 25, marginBottom: 30}}>

                    {searchConceptDivs}
  

                {emptyMsg}
            </div>
        </div>
    );
  }
}

export default connect((state) => {
  return {
    pastConcepts: state.pastConcepts
  }
})(PreviousSearchConcepts);
