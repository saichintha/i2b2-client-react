import * as redux from 'redux';
import {conceptReducer, queryNameReducer, queryResultReducer, tabChange, searchResultReducer, searchActiveReducer, treeDataReducer, snackBarReducer, activeSearchResultReducer} from './reducers.js';
import thunk from 'redux-thunk';

export var configure = (initialState) => {
  var reducer = redux.combineReducers({
    groupInfo: conceptReducer,
    queryName: queryNameReducer,
    pastQueries: queryResultReducer,
    pastConcepts: searchResultReducer,
    activeTabIndex: tabChange,
    searchActive: searchActiveReducer,
    treeData: treeDataReducer,
    snackBar: snackBarReducer,
    activeSearchResult: activeSearchResultReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
      redux.applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    
  return store;
};
