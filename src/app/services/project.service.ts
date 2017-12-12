import { NgRedux } from '@angular-redux/store';
import { ProjectActions } from '../store/actions/project.actions';
import { Injectable } from '@angular/core';
import { InitialAppState } from '../store/initialState';
import { Apollo } from 'apollo-angular';
import { QAllProjects, QProjectDetails } from '../backend/graph.queries';
import { MCreateProject, MUpdateProject, MDeleteProject, MAddTaskToProject } from '../backend/graph.mutations';

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
        return new Project(project.name, project.id, project.description, null, null, null, project.createdAt);
      });
      this.store.dispatch({
        type: ProjectActions.SET_PROJECTS,
        payload: projects,
      });
    });
  }
  createProject(newProject: Project) {
    this.apollo.mutate({
      mutation: MCreateProject,
      variables: {
        name: newProject.name,
        description: newProject.description
      },
    }).subscribe(({ data }) => {
      const response = data.createProject;
      if (response) {
        console.log('response');
        console.log(data);
        this.store.dispatch({
          type: ProjectActions.ADD_SINGLE_PROJECT,
          payload: new Project(response.name, response.id, response.description, null, null, null, response.createdAt),
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

  getProjectDetails(projectId: String) {
    this.apollo.query({
      query: QProjectDetails,
      variables: {
        id: projectId
      }
    }).subscribe(({data}: any) => {
      const projectToUpdate = data.Project;
      this.store.dispatch({
        type: ProjectActions.UPDATE_PROJECT,
        payload: new Project(
          projectToUpdate.name, projectToUpdate.id, projectToUpdate.description, null, null,
          projectToUpdate.tasks, projectToUpdate.createdAt
        ),
      });
    });
  }

  addTaskToProject(projectId: String, task: Task) {
    this.apollo.mutate({
      mutation: MAddTaskToProject,
      variables: {
        projectId,
        taskName: task.title,
        taskDescription: task.description,
        taskDue: task.due
      }
    }).subscribe(({data}: any) => {
      const response = data.createTask;
      this.store.dispatch({
        type: ProjectActions.ADD_TASK_TO_PROJECT,
        payload: {
          projectId: response.project.id,
          task: new Task(response.id, null, response.project.id, response.title, response.description, response.due, null, null),
        }
      });
    });
    this.notification.success('Success', 'Added task to project');
  }
}
