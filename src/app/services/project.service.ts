import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { InitialAppState } from '../store/initialState';
import Firebase from '../backend/firebase';
import {DbRefs} from '../enums/db-refs.enum';
import { ProjectActions } from '../store/actions/project.actions';
import { Project } from '../models/project';
import { Task } from '../models/task';
import { User } from '../models/user';
import { Comment } from '../models/comment';

@Injectable()
export class ProjectService {
  private db: any;
  private dbRefs: any;
  constructor(private store: NgRedux<InitialAppState>, private projectActions: ProjectActions) {
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
         const el = element.val();
         tasks.push(
           new Task(
             element.key, el.status, el.projectId, el.name, el.description, el.due, el.user, [],
            )
         );
       });
       this.store.dispatch(
         this.projectActions.setTasks({
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
       this.store.dispatch(
         this.projectActions.setProjects(projects));
    });
  }

  listenForCommentChanges(): void {
    this.db.ref(`/comments/tasks/`).on('value', (data) => {
      let comments = [];
      comments.forEach(comment => {
        comments.push(new Comment(null, comment.key, comment.val().content, 0));
      });
      this.store.dispatch(
        this.taskActions.setComments(comments)
      );
    });
  }

    addProject(newProject: Project): void {
      const newProjectWithoutId = newProject;
      delete newProjectWithoutId.id;
      this.db.ref('/projects/').push(newProjectWithoutId);
    }
}
