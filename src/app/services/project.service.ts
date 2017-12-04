import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { InitialAppState } from '../store/AppStore';
import Firebase from '../backend/firebase';
import {DbRefs} from '../enums/db-refs.enum';
import { ProjectActions } from '../store/actions/project.actions';
import { Project } from '../models/project';

@Injectable()
export class ProjectService {
  private db: any;
  private dbRefs: any;
  constructor(private ngRedux: NgRedux<InitialAppState>, private actions: ProjectActions) {
    this.db = Firebase.database();
    this.dbRefs = DbRefs;
   }

   fetchProjects(): void {
     console.log('should fetch projects');
     this.db.ref('/projects/').once('value', (snapshot) => {
       console.log('inside snapshot');
       snapshot.forEach(project => {
         const fetchedProject = project.val();
         console.log('fetched project');
         console.log(fetchedProject);
         this.ngRedux.dispatch(
           this.actions.addProject(new Project(fetchedProject.name, fetchedProject.id, fetchedProject.description, null, null)));
       });
     });
   }

}
