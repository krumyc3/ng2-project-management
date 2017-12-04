import { Action } from 'redux';
import { Project } from '../models/project';

import { ProjectActions } from './actions/project.actions';

export interface InitialAppState {
  projectsList: Project[];
}

export const INITIAL_STATE: InitialAppState = {
  projectsList: [],
};

export function rootReducer(state: InitialAppState, action: any) {
  switch (action.type) {
    case ProjectActions.ADD_PROJECT:
      return {
        ...state,
        projectsList: [...state.projectsList, action.payload],
      };
    default:
      break;
  }
  return state;
}
