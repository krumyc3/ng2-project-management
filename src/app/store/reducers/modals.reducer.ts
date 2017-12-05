import { ModalsAction, ModalsActions } from '../actions/modals.actions';
import { InitialAppState } from '../initialState';

export function modalsReducer(state: InitialAppState, action: ModalsAction) {
  switch (action.type) {
    case ModalsActions.OPEN_MODAL:
    return {
      ...state,
      modalsState: [action.payload],
    };
    default:
      break;
  }
  return state;
}
