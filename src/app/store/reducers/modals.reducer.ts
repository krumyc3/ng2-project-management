import { ModalsAction, ModalsActions, ModalTypes } from '../actions/modals.actions';
import { InitialAppState, INITIAL_STATE } from '../initialState';

const modalState = {
  newProjectModalActive: false,
  newTaskModalActive: false,
};
export function modalsReducer(state = modalState,  action: ModalsAction) {
  switch (action.type) {
    case ModalsActions.OPEN_MODAL:
      return {
        ...state,
        [action.payload]: true,
      };
    case ModalsActions.CLOSE_MODAL:
      return {
        ...state,
        [action.payload]: false,
      };
    default:
      return state;
  }
}
