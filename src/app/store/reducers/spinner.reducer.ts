import { SpinnerActions, SpinnerAction } from '../actions/spinner.actions';

export function spinnerReducer(state = false, action: SpinnerAction) {
  switch (action.type) {
    case SpinnerActions.SET_ACTIVE:
      return true;
    case SpinnerActions.SET_NOT_ACTIVE:
      return false;
    default:
      return state;
  }
}
