import { ProjectActions } from '../actions/project.actions';
import { TaskActions } from '../actions/task.actions';



export function projectReducer(state = [] , action: any) {
  switch (action.type) {
    case ProjectActions.SET_PROJECTS:
       return action.payload;
    case ProjectActions.ADD_SINGLE_PROJECT:
      return [...state, action.payload];
    default:
      return state;
  }
}
