import { Project } from '../../models/project';

import { ProjectActions } from '../actions/project.actions';
import { InitialAppState, INITIAL_STATE } from '../initialState';


export function projectReducer(state: InitialAppState = INITIAL_STATE , action: any) {
  switch (action.type) {
    case ProjectActions.ADD_PROJECT:
      return {
        ...state,
        projectsList: [...state.projectsList, action.payload],
      };
  }
  return state;
}
