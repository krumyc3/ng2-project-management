import { Project } from '../../models/project';

import { ProjectActions } from '../actions/project.actions';
import { InitialAppState, INITIAL_STATE } from '../initialState';



export function projectReducer(state = [] , action: any) {
  switch (action.type) {
    case ProjectActions.ADD_PROJECT:
       return [...state, action.payload];
    default:
      return state;
    case ProjectActions.SET_TASKS:
      return state.map((project) => {
          if (project.id === action.payload.projectId) {
            return {
              ...project,
              tasks: action.payload.projectTasks,
            };
          } else {
            return {
              ...project
            };
          }
  });
  }
}
