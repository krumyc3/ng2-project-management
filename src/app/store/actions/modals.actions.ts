import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { dispatch } from '@angular-redux/store';

export interface ModalsAction {
  type: any;
  payload: string;
}

@Injectable()
export class ModalsActions {
  static OPEN_MODAL = 'OPEN_MODAL';
  static CLOSE_MODAL = 'CLOSE_MODAL';
  openModal(modalType: string): ModalsAction {
    return {
      type: ModalsActions.OPEN_MODAL,
      payload: modalType,
    };
  }
}
