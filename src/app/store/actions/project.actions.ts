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
  static SET_PROJECTS = 'SET_PROJECTS';
  static ADD_SINGLE_PROJECT = 'ADD_SINGLE_PROJECT';
  static UPDATE_PROJECT = 'UPDATE_PROJECT';
  static DELETE_PROJECT = 'DELETE_PROJECT';

  setProjects(projectsList: Project[]): ProjectAction {
    return {
      type: ProjectActions.SET_PROJECTS,
      payload: projectsList
    };
  }
  addSingleProject(project: Project): ProjectAction {
    return {
      type: ProjectActions.ADD_SINGLE_PROJECT,
      payload: project,
    };
  }

  updateProject(projectToUpdate: Project): ProjectAction {
    return {
      type: ProjectActions.UPDATE_PROJECT,
      payload: projectToUpdate,
    };
  }

  deleteProject(projectId: string): ProjectAction {
    return {
      type: ProjectActions.DELETE_PROJECT,
      payload: projectId,
    };
  }
}
