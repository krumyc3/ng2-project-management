import { Injectable } from '@angular/core';
import { Comment } from '../../models/comment';
import { Action } from 'redux';
import { Task } from '../../models/task';

export interface TaskAction {
  type: string;
  payload: any;
}
export interface ProjectTasks {
  projectId: String;
  projectTasks: Task[];
}
@Injectable()
export class TaskActions {
  static SET_TASKS = 'SET_TASKS';

  setTasks(projectTasks: ProjectTasks): TaskAction {
    return {
      type: TaskActions.SET_TASKS,
      payload: projectTasks,
    };
  }
}
