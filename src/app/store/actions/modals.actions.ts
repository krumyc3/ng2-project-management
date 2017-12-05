import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { dispatch } from '@angular-redux/store';

export interface ModalsAction {
  type: any;
  payload: String;
}

@Injectable()
export class ModalsActions {
  static OPEN_MODAL = 'OPEN_MODAL';

  openModal(modalType: String): ModalsAction {
    return {
      type: ModalsActions.OPEN_MODAL,
      payload: modalType,
    };
  }
}
