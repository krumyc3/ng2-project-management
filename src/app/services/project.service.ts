import { NgRedux } from '@angular-redux/store';
import { ProjectActions } from '../store/actions/project.actions';
import { Injectable } from '@angular/core';
import { InitialAppState } from '../store/initialState';
import { Apollo } from 'apollo-angular';
import { QAllProjects } from '../backend/graph.queries';
import { MCreateProject, MUpdateProject } from '../backend/graph.mutations';

import { Project } from '../models/project';
import { ModalsActions, ModalTypes } from '../store/actions/modals.actions';

@Injectable()
export class ProjectService {
  constructor(
    private store: NgRedux<InitialAppState>,
    private projectActions: ProjectActions,
    private apollo: Apollo
  ) {
  }

  getAllProjects() {
    this.apollo.query({ query: QAllProjects}).subscribe((data: any) => {
      const projects = data.data.allProjects.map((project) => {
        return new Project(project.name, project.id, project.description, null, null, null);
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
          payload: new Project(response.name, response.id, response.description, null, null, null),
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
}
