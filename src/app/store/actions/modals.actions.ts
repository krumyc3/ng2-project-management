import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { dispatch } from '@angular-redux/store';

export interface ModalsAction extends Action {
  type: any;
  payload: string;
}
export enum ModalTypes {
  ADD_NEW_PROJECT = 'newProjectModalActive',
  ADD_NEW_TASK = 'newTaskModalActive',
  ADD_NEW_CLIENT = 'newClientModalActive',
  EDIT_PROJECT = 'editProjectModalActive',
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

  closeModal(modalType: ModalTypes): ModalsAction {
    return {
      type: ModalsActions.CLOSE_MODAL,
      payload: modalType,
    };
  }
}
