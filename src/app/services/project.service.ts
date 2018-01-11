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
import { BaseService } from './base-service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable()
export class ProjectService extends BaseService {
  constructor(
    store: NgRedux<InitialAppState>,
    private projectActions: ProjectActions,
    private apollo: Apollo,
    notification: NotificationsService,
    private modalsActions: ModalsActions,
    private router: Router
  ) {
    super(notification, store);
  }

  getAllProjects() {
    this.apollo.query({
      query: QAllProjects,
      variables: {
        user_id: this.getLoggedInUserId()
      }
    }).subscribe(({data}: any) => {
      this.store.dispatch({
        type: ProjectActions.SET_PROJECTS,
        payload: data.allProjects,
      });
    }, this.handleError.bind(this));
  }
  createProject(newProject: Project) {
    const projectHasClient: boolean = newProject.client !== null && newProject.client.id !== '';
    let mutationVariables: any = {
      name: newProject.name,
      userId: this.getLoggedInUserId(),
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
            // tslint:disable-next-line:max-line-length
            response.name, response.client || null, response.id, response.description, new User('', response.author.email, response.author.firstName, response.author.lastName, null, ''), null, null, response.createdAt),
        });
        this.notifications.success('Created', `Project ${response.name} created`);
      }
    }, this.handleError.bind(this));
  }

  updateProject(updatedProject: Project) {
    console.log('updated project info');
    console.log(updatedProject);
    this.apollo.mutate({
      mutation: MUpdateProject,
      variables: {
        id: updatedProject.id,
        userId: this.getLoggedInUserId(),
        name: updatedProject.name,
        description: updatedProject.description,
        clientId: updatedProject.client.id
      }
    }).subscribe(({data}) => {
      const response = data.updateProject;
      if (response) {
        this.store.dispatch(this.modalsActions.closeModal(ModalTypes.EDIT_PROJECT));
        this.store.dispatch(
          this.projectActions.updateProject(
            // tslint:disable-next-line:max-line-length
            new Project(response.name, response.client, response.id, response.description, new User(response.author.id, '', response.author.firstName, response.author.lastName), null, null, response.createdAt)
          ));
        this.notifications.success('Updated', 'Project updated');
      }
    }, this.handleError.bind(this));
  }

  deleteProject(projectId: string) {
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
      this.router.navigateByUrl('/projects').then(() => {
        this.getAllProjects();
      });
    }, this.handleError.bind(this));
  }
  getProjectInfo(projectId: string) {
    this.apollo.query({
      query: QProjectDetails,
      variables: {
        id: projectId,
      }
    }).subscribe(({data}: any) => {
      const response = data.Project;
      console.log('get project info');
      console.log(response);
      this.store.dispatch({
        type: ProjectActions.UPDATE_PROJECT,
        payload: response
      });
    }, this.handleError.bind(this));
  }
}
