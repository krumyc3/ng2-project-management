import { dispatch } from '@angular-redux/store';
import { Action } from 'redux';
import { Project } from '../../models/project';
import { Injectable } from '@angular/core';

export interface ProjectAction {
  type: any;
  payload: any;
}


export interface ProjectTasks {
  projectId: string;
  projectTasks: any[];
}
@Injectable()
export class ProjectActions {
  static ADD_PROJECT = 'ADD_PROJECT';
  static SET_TASKS = 'SET_TASKS';
  addProject(newProject: Project): ProjectAction {
    return {
      type: ProjectActions.ADD_PROJECT,
      payload: newProject
    };
  }

  setTasks(projectTasks: ProjectTasks): ProjectAction {
    return {
      type: ProjectActions.SET_TASKS,
      payload: projectTasks,
    };
  }
}
