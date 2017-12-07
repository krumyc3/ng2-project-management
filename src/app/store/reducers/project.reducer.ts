import { Project } from '../../models/project';

import { ProjectActions } from '../actions/project.actions';
import { InitialAppState, INITIAL_STATE } from '../initialState';
import { TaskActions } from '../actions/task.actions';



export function projectReducer(state = [] , action: any) {
  switch (action.type) {
    case ProjectActions.SET_PROJECTS:
       return action.payload;
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
