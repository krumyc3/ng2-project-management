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
    this.listenForChanges();
   }

   fetchProjects(): void {
     this.db.ref('/projects/').once('value', (snapshot) => {
       snapshot.forEach(project => {
         const fetchedProject = project.val();
        //  this.ngRedux.dispatch(
        //    this.actions.addProject(new Project(fetchedProject.name, fetchedProject.id, fetchedProject.description, null, null)));
       });
     });
   }
   fetchProjectTasks(projectId: String) {
     this.db.ref(`/tasks/projects/${projectId}`).once('value', (data) => {
       let tasks = [];
       data.forEach(element => {
         tasks.push(element.val());
       });
       console.log('fetch project tasks');
       console.log(tasks);
       this.ngRedux.dispatch(
         this.actions.setTasks({
           projectId: projectId.toString(),
           projectTasks: tasks,
         })
       );
       });
   }
   listenForChanges(): void {
     this.db.ref('/projects/').on('child_added', (data) => {
       const newProject = data.val();
       this.ngRedux.dispatch(
         this.actions.addProject(new Project(newProject.name, newProject.id.toString(), newProject.description, null, [], [])));
      });
     }

    addProject(newProject: Project): void {
      this.db.ref('/projects/').push(newProject);
    }
}
