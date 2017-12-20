import { NgRedux } from '@angular-redux/store';
import { ProjectActions } from '../store/actions/project.actions';
import { Injectable } from '@angular/core';
import { InitialAppState } from '../store/initialState';
import { Apollo } from 'apollo-angular';
import { QAllProjects, QProjectDetails } from '../backend/graph.queries';
import { MCreateProject, MUpdateProject, MDeleteProject, MAddTaskToProject, MCreateProjectWithoutClient } from '../backend/graph.mutations';

import { Project } from '../models/project';
import { ModalsActions, ModalTypes } from '../store/actions/modals.actions';
import { Task } from '../models/task';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class ProjectService {
  constructor(
    private store: NgRedux<InitialAppState>,
    private projectActions: ProjectActions,
    private apollo: Apollo,
    private notification: NotificationsService,
  ) {
  }

  getAllProjects() {
    this.apollo.query({ query: QAllProjects}).subscribe((data: any) => {
      const projects = data.data.allProjects.map((project) => {
        return new Project(project.name, project.client, project.id, project.description, null, null, null, project.createdAt);
      });
      this.store.dispatch({
        type: ProjectActions.SET_PROJECTS,
        payload: projects,
      });
    });
  }
  createProject(newProject: Project) {
    const projectHasClient: boolean = newProject.client !== null && newProject.client.id !== '';
    let mutationVariables: any = {
      name: newProject.name,
      description: newProject.description,
    };
    if (projectHasClient) {
      mutationVariables = {
        ...mutationVariables,
        clientId: newProject.client.id
      };
    }
    this.apollo.mutate({
      mutation: projectHasClient ? MCreateProject : MCreateProjectWithoutClient,
      variables: mutationVariables
    }).subscribe(({ data }) => {
      const response = data.createProject;
      if (response) {
        this.store.dispatch({
          type: ProjectActions.ADD_SINGLE_PROJECT,
          payload: new Project(
            response.name, response.client || null, response.id, response.description, null, null, null, response.createdAt),
        });
      }
    }, (error) => {
      console.log(error);
    });
  }

  updateProject(updatedProject: Project) {
    this.apollo.mutate({
      mutation: MUpdateProject,
      variables: {
        id: updatedProject.id,
        name: updatedProject.name,
        description: updatedProject.description
      }
    }).subscribe(({data}) => {
      const response = data.updateProject;
      if (response) {
        this.store.dispatch({
          type: ModalsActions.CLOSE_MODAL,
          payload: ModalTypes.EDIT_PROJECT
        });
        this.getAllProjects();
      }
    });
  }

  deleteProject(projectId: String) {
    this.apollo.mutate({
      mutation: MDeleteProject,
      variables: {
        id: projectId
      }
    }).subscribe(({data}: any) => {
      this.store.dispatch({
        type: ProjectActions.DELETE_PROJECT,
        payload: data.deleteProject.id
      });
    });
  }
  getProjectInfo(projectId: String) {
    this.apollo.query({
      query: QProjectDetails,
      variables: {
        id: projectId,
      }
    }).subscribe(({data}: any) => {
      const response = data.Project;
      this.store.dispatch({
        type: ProjectActions.UPDATE_PROJECT,
        payload: response
      });
    });
  }
}
