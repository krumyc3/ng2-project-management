import { ProjectActions } from '../actions/project.actions';
import { TaskActions } from '../actions/task.actions';



export function projectReducer(state = [] , action: any) {
  switch (action.type) {
    case ProjectActions.SET_PROJECTS:
       return action.payload;
    case ProjectActions.ADD_SINGLE_PROJECT:
      return [...state, action.payload];
    case ProjectActions.UPDATE_PROJECT:
      return state.map((singleProject) => {
        if (singleProject.id === action.payload.id) {
          return action.payload;
        } else {
          return singleProject;
        }
      });
    case ProjectActions.DELETE_PROJECT:
      return state.filter(singleProject => singleProject.id !== action.payload);
    case ProjectActions.ADD_TASK_TO_PROJECT:
      return state.map((singleProject) => {
        if (singleProject.id === action.payload.projectId) {
          return {
            ...singleProject,
            tasks: [
              ...singleProject.tasks,
              action.payload.task
            ]
          };
        } else {
          return singleProject;
        }
      });
    default:
      return state;
  }
}
