import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { InitialAppState } from '../store/initialState';
import Firebase from '../backend/firebase';
import {DbRefs} from '../enums/db-refs.enum';
import { ProjectActions } from '../store/actions/project.actions';
import { Project } from '../models/project';
import { Task } from '../models/task';
import { User } from '../models/user';

@Injectable()
export class ProjectService {
  private db: any;
  private dbRefs: any;
  constructor(private ngRedux: NgRedux<InitialAppState>, private actions: ProjectActions) {
    this.db = Firebase.database();
    this.dbRefs = DbRefs;
    this.listenForProjectChanges();
   }
   deactiveTaskListener(projectId: String) {
     this.db.ref(`/task/projects/${projectId}`).off();
   }
   listenForTaskChanges(projectId: String) {
     this.db.ref(`/tasks/projects/${projectId}`).on('value', (data) => {
       let tasks = [];
       console.log('listen for task changes');
       data.forEach(element => {
         tasks.push(element.val());
       });
       this.ngRedux.dispatch(
         this.actions.setTasks({
           projectId: data.key,
           projectTasks: tasks,
         })
       );
       });
   }
   listenForProjectChanges(): void {
     this.db.ref('/projects/').on('value', (data) => {
       let projects = [];
       data.forEach(project => {
         projects.push(new Project(project.val().name, project.key, project.val().description, null, [], []));
       });
       console.log('projects in services');
       console.log(projects);
       this.ngRedux.dispatch(
         this.actions.setProjects(projects));
    });
  }

    addProject(newProject: Project): void {
      const newProjectWithoutId = newProject;
      delete newProjectWithoutId.id;
      this.db.ref('/projects/').push(newProjectWithoutId);
    }
}
