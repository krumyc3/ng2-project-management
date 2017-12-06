import { Injectable } from '@angular/core';
import Firebase from '../backend/firebase';
import { Task } from '../models/task';

@Injectable()
export class TasksService {
  private db: any;
  constructor() {
    this.db = Firebase.database();
  }

  addNewTask(newTask: Task): void {
    this.db.ref(`/tasks/projects/${newTask.projectId}`).push(newTask);
  }
}
