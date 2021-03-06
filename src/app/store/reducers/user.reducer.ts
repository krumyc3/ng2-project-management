import { UserAction, UserActions } from '../actions/user.actions';

export interface IUserState {
  user: {
    email: string;
    id: string;
    token: string;
  };
}

const InitialUserState = {
  user: {
    email: '',
    id: '',
    token: '',
  }
};

export function userReducer(state: IUserState = InitialUserState, action: UserAction) {
  switch (action.type) {
    case UserActions.SIGN_UP_USER:
      return action.payload;
    case UserActions.SING_IN_USER:
      return action.payload;
    case UserActions.CLEAR_USER:
      return {
        id: '',
        email: '',
        token: '',
      };
    case UserActions.UPDATE_USER_INFO:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        phone: action.payload.phone,
        role: action.payload.role
      };
    default:
      return state;
  }
}
