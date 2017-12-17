import { ModalsAction, ModalsActions, ModalTypes } from '../actions/modals.actions';
import { InitialAppState, INITIAL_STATE } from '../initialState';

export interface IModalState {
  newProjectModalActive: boolean;
  newTaskModalActive: boolean;
  newClientModalActive: boolean;
  editProjectModalActive: boolean;

}
const modalState: IModalState = {
  newProjectModalActive: false,
  newTaskModalActive: false,
  newClientModalActive: true,
  editProjectModalActive: false,
};
export function modalsReducer(state: IModalState = modalState,  action: ModalsAction) {
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
