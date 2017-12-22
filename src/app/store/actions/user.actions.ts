import { Injectable } from '@angular/core';

export interface UserAction {
  type: string;
  payload: any;
}
@Injectable()
export class UserActions {
  static SIGN_UP_USER = 'SIGN_UP_USER';
  static SING_IN_USER = 'SIGN_IN_USER';
  signInUser(id: string, email: string, token: string): UserAction {
    return {
      type: UserActions.SING_IN_USER,
      payload: {
        id, email, token
      }
    };
  }
  signUpUser(id: string, email: string, token: string): UserAction {
    return {
      type: UserActions.SIGN_UP_USER,
      payload: {
        id, email, token
      }
    };
  }
}
