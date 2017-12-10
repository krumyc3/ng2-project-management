import { TaskAction, TaskActions } from '../actions/task.actions';

export function taskReducer(state = [], action: TaskAction) {
  switch (action.type) {
    case TaskActions.SET_TASKS:
      return [...state.filter(val => false), action.payload];
  default:
    return state;
  }
}
