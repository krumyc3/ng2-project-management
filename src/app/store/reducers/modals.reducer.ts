import { ModalsAction, ModalsActions } from '../actions/modals.actions';
import { InitialAppState, INITIAL_STATE } from '../initialState';


export function modalsReducer(state: InitialAppState = INITIAL_STATE,  action: ModalsAction) {
  switch (action.type) {
    case ModalsActions.OPEN_MODAL:
    return state = {
      ...state,
      modalsState: action.payload,
    };
  }
  return state;
}
