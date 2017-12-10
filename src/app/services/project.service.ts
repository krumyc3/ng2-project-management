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
import { TaskActions } from '../store/actions/task.actions';
import { CommentActions } from '../store/actions/comment.actions';

@Injectable()
export class BackendService {
  private db: any;
  private dbRefs: any;
  constructor(
    private store: NgRedux<InitialAppState>,
    private projectActions: ProjectActions,
    private taskActions: TaskActions,
    private commmentActions: CommentActions
  ) {
    this.db = Firebase.database();
    this.dbRefs = DbRefs;
    this.listenForProjectChanges();
   }
   deactiveTaskListener(projectId: String) {
     this.db.ref(`/tasks/projects/${projectId}`).off();
   }
   listenForTaskChanges(projectId: String) {
     this.db.ref(`/tasks/projects/${projectId}`).on('value', (data) => {
       const tasks = [];
       data.forEach(element => {
         const el = element.val();
         tasks.push(
           new Task(
             element.key, el.status, el.projectId, el.name, el.description, el.due, el.user, [],
            )
         );
       });
       this.store.dispatch(
         this.taskActions.setTasks({
           projectId: data.key,
           projectTasks: tasks,
         })
       );
       });
   }
   listenForProjectChanges(): void {
     this.db.ref('/projects/').on('value', (data) => {
       const projects = [];
       data.forEach(project => {
         projects.push(new Project(project.val().name, project.key, project.val().description, null, [], []));
       });
       this.store.dispatch(
         this.projectActions.setProjects(projects));
    });
  }

  listenForCommentChanges(): void {
    this.db.ref(`/comments/tasks`).on('value', (data) => {
      const comments = [];
      data.forEach(task => {
        task.forEach(comment => {
          comments.push(comment.val());
        });
      });
      this.store.dispatch(
        this.commmentActions.setComments(comments)
      );
    });
  }

    addProject(newProject: Project): void {
      const newProjectWithoutId = newProject;
      delete newProjectWithoutId.id;
      this.db.ref('/projects/').push(newProjectWithoutId);
    }
}
