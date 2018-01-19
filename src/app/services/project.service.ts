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
import { UtilsService } from './base-service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable()
export class ProjectService {
  constructor(
    private projectActions: ProjectActions,
    private apollo: Apollo,
    private utils: UtilsService,
    private modalsActions: ModalsActions,
    private router: Router
  ) {
  }

  getAllProjects() {
    this.apollo.query({
      query: QAllProjects,
      variables: {
        user_id: this.utils.getLoggedInUserId()
      }
    }).subscribe(({data}: any) => {
      this.utils.store.dispatch({
        type: ProjectActions.SET_PROJECTS,
        payload: data.allProjects,
      });
    }, this.utils.handleError.bind(this));
  }
  createProject(newProject: Project) {
    const projectHasClient: boolean = newProject.client !== null && newProject.client.id !== '';
    let mutationVariables: any = {
      name: newProject.name,
      userId: this.utils.getLoggedInUserId(),
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
        this.utils.store.dispatch({
          type: ProjectActions.ADD_SINGLE_PROJECT,
          payload: new Project(
            // tslint:disable-next-line:max-line-length
            response.name, response.client || null, response.id, response.description, new User('', response.author.email, response.author.firstName, response.author.lastName, null, ''), null, null, response.createdAt),
        });
       this.utils.notifications.success('Created', `Project ${response.name} created`);
      }
    }, this.utils.handleError.bind(this));
  }

  updateProject(updatedProject: Project) {
    console.log('updated project info');
    console.log(updatedProject);
    this.apollo.mutate({
      mutation: MUpdateProject,
      variables: {
        id: updatedProject.id,
        userId: this.utils.getLoggedInUserId(),
        name: updatedProject.name,
        description: updatedProject.description,
        clientId: updatedProject.client.id
      }
    }).subscribe(({data}) => {
      const response = data.updateProject;
      if (response) {
        this.utils.store.dispatch(this.modalsActions.closeModal(ModalTypes.EDIT_PROJECT));
        this.utils.store.dispatch(
          this.projectActions.updateProject(
            // tslint:disable-next-line:max-line-length
            new Project(response.name, response.client, response.id, response.description, new User(response.author.id, '', response.author.firstName, response.author.lastName), null, null, response.createdAt)
          ));
       this.utils.notifications.success('Updated', 'Project updated');
      }
    }, this.utils.handleError.bind(this));
  }

  deleteProject(projectId: string) {
    this.apollo.mutate({
      mutation: MDeleteProject,
      variables: {
        id: projectId
      }
    }).subscribe(({data}: any) => {
      this.utils.store.dispatch({
        type: ProjectActions.DELETE_PROJECT,
        payload: data.deleteProject.id
      });
      if (this.router.url !== '/projects') {
        this.router.navigateByUrl('/projects').then(() => {
          this.getAllProjects();
        });
      }
    }, this.utils.handleError.bind(this));
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
      this.utils.store.dispatch({
        type: ProjectActions.UPDATE_PROJECT,
        payload: response
      });
    }, this.utils.handleError.bind(this));
  }
}
