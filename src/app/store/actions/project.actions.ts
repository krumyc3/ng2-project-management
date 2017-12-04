import { dispatch } from '@angular-redux/store';
import { Action } from 'redux';
import { Project } from '../../models/project';
import { Injectable } from '@angular/core';

export interface ProjectAction {
  type: any;
  payload: Project;
}

@Injectable()
export class ProjectActions {
  static ADD_PROJECT = 'ADD_PROJECT';

  addProject(newProject: Project): ProjectAction {
    return {
      type: ProjectActions.ADD_PROJECT,
      payload: newProject
    };
  }
}
