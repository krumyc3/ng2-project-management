import { Injectable } from '@angular/core';
// import Firebase from '../backend/firebase';
import { Task } from '../models/task';
import { Comment } from '../models/comment';

@Injectable()
export class TasksService {
  private db: any;
  constructor() {
    // this.db = Firebase.database();
  }

  addNewTask(newTask: Task): void {
    this.db.ref(`/tasks/projects/${newTask.projectId}`).push(newTask);
  }

  addCommentToTask(newComment: Comment, taskId: string) {
    console.log('comment to push');
    console.log(newComment);
    this.db.ref(`/comments/tasks/${taskId}`).push(newComment);
  }
}
