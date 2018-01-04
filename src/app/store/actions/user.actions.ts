import { Injectable } from '@angular/core';
import { User } from '../../models/user';

export interface UserAction {
  type: string;
  payload?: any;
}
@Injectable()
export class UserActions {
  static SIGN_UP_USER = 'SIGN_UP_USER';
  static SING_IN_USER = 'SIGN_IN_USER';
  static CLEAR_USER = 'CLEAR_USER';
  static UPDATE_USER_INFO = 'UPDATE_USER_INFO';
  updateUserInfo(user: User): UserAction {
    return {
      type: UserActions.UPDATE_USER_INFO,
      payload: {
        ...user
      }
    };
  }
  clearUser(): UserAction {
    return {
      type: UserActions.CLEAR_USER,
    };
  }
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
