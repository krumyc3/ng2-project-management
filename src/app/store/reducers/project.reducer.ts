import { Project } from '../../models/project';

import { ProjectActions } from '../actions/project.actions';
import { InitialAppState } from '../initialState';


export function projectReducer(state: InitialAppState , action: any) {
  switch (action.type) {
    case ProjectActions.ADD_PROJECT:
      return {
        ...state,
        projectsList: [...state.projectsList, action.payload],
      };
  }
  return state;
}
