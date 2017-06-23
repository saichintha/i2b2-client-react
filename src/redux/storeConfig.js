import * as redux from 'redux';
import {addConceptReducer} from './reducers.js';
import thunk from 'redux-thunk';

export var configure = (initialState) => {
  var reducer = redux.combineReducers({
    groupInfo: addConceptReducer,
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
      redux.applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    
  return store;
};
