import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HierarchyView from './Search/HierarchyView';
import SearchResultList from './Search/SearchResultList';

const padding = '5em';

class SearchMain extends Component {
  render() {
    return (
      <div className="row center-xs" style={{paddingTop: 30}}>
        {/*<div className="col-xs-5" style={{paddingLeft: 20, paddingRight: 12, overflowY: 'hidden'}}>
            <HierarchyView />
        </div>*/}

        <div className="col-xs-10" >
            <SearchResultList />
        </div>


      </div>
    );
  }
}

export default SearchMain;
