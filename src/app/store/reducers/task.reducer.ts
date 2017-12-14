import { TaskAction, TaskActions } from '../actions/task.actions';

export function taskReducer(state = [], action: TaskAction) {
  switch (action.type) {
    case TaskActions.SET_PROJECT_TASKS:
      return action.payload;
    case TaskActions.ADD_TASK_TO_PROJECT:
      return [...state, action.payload];
    case TaskActions.DELETE_TASK:
      return state.filter((task => task.id !== action.payload.taskId));
  default:
    return state;
  }
}
