import { Action } from 'redux';
import { Task } from '../../models/task';
import { Project } from '../../models/project';
import { Injectable } from '@angular/core';

export interface EditingAction {
  type: string;
  payload: Project | Task;
}

@Injectable()
export class EditingActions {
  static EDIT_PROJECT = 'EDIT_PROJECT';
  editProject(editedProject: Project): EditingAction {
    return {
      type: EditingActions.EDIT_PROJECT,
      payload: editedProject,
    };
  }
}
