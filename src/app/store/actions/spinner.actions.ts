import { Action } from 'redux';
import { Injectable } from '@angular/core';

export interface SpinnerAction extends Action {
  type: string;
}
@Injectable()
export class SpinnerActions {
  static SET_ACTIVE = 'SET_ACTIVE';
  static SET_NOT_ACTIVE = 'SET_NOT_ACTIVE';

  setActive(): SpinnerAction {
    return {
      type: SpinnerActions.SET_ACTIVE
    };
  }

  setNotActive(): SpinnerAction {
    return {
      type: SpinnerActions.SET_NOT_ACTIVE
    };
  }
}
