import { Injectable } from '@angular/core';
import { Comment } from '../../models/comment';
import { Action } from 'redux';
import { Task } from '../../models/task';
import { Project } from '../../models/project';

export interface TaskAction {
  type: string;
  payload: any;
}

@Injectable()
export class TaskActions {
  static SET_PROJECT_TASKS = 'SET_PROJECT_TASKS';
  static ADD_TASK_TO_PROJECT = 'ADD_TASK_TO_PROJECT';
  static DELETE_TASK = 'DELETE_TASK';

  addTaskToProject(projectId: String, task: Task): TaskAction {
    return {
      type: TaskActions.ADD_TASK_TO_PROJECT,
      payload: task,
    };
  }
  setTasks(projectTasks: Project[]): TaskAction {
    return {
      type: TaskActions.SET_PROJECT_TASKS,
      payload: projectTasks,
    };
  }
  deleteTask(taskId: String): TaskAction {
    return {
      type: TaskActions.DELETE_TASK,
      payload: {
        taskId
      }
    };
  }
}
