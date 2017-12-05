import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { dispatch } from '@angular-redux/store';

export interface ModalsAction extends Action {
  type: any;
}

@Injectable()
export class ModalsActions {
  static OPEN_MODAL = 'OPEN_MODAL';
  static CLOSE_MODAL = 'CLOSE_MODAL';
  openModal(): ModalsAction {
    return {
      type: ModalsActions.OPEN_MODAL,
    };
  }

  closeModal(): ModalsAction {
    return {
      type: ModalsActions.CLOSE_MODAL,
    }
  }
}
