import { EditingAction, EditingActions } from '../actions/editing.actions';

const editingState = {
  project: {},
};

export function editingReducer(state = editingState, action: EditingAction) {
  switch (action.type) {
    case EditingActions.EDIT_PROJECT:
      return {
        ...state,
        project: action.payload,
      };
    default:
      return state;
  }
}
