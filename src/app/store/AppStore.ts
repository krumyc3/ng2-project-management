import { projectReducer } from './reducers/project.reducer';
import { modalsReducer } from './reducers/modals.reducer';

import { combineReducers, createStore } from 'redux';
import { INITIAL_STATE } from './initialState';

export const rootReducer = combineReducers({
  projectsList: projectReducer,
  modalsState: modalsReducer,
});


