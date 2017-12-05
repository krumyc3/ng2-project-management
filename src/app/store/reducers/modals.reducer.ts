import { ModalsAction, ModalsActions } from '../actions/modals.actions';
import { InitialAppState, INITIAL_STATE } from '../initialState';

const modalState = {
  newProjectModalActive: false,
};
export function modalsReducer(state = modalState,  action: ModalsAction) {
  switch (action.type) {
    case ModalsActions.OPEN_MODAL:
      return {
        ...state,
        newProjectModalActive: true,
      };
    case ModalsActions.CLOSE_MODAL:
      return {
        ...state,
        newProjectModalActive: false,
      };
    default:
      return state;
  }
}
