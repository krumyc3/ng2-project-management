import { Injectable } from '@angular/core';
// import Firebase from '../backend/firebase';
import { Task } from '../models/task';
import { Comment } from '../models/comment';
import { NotificationsService } from 'angular2-notifications';
import { Apollo } from 'apollo-angular';
import {
  MAddCommentToTask, MDeleteTask,
  MLikeComment,
  MAddTaskToProject,
  MDeleteComment,
  MUpdateTaskStatus } from '../backend/graph.mutations';
import { NgRedux } from '@angular-redux/store';
import { InitialAppState } from '../store/initialState';
import { ProjectActions } from '../store/actions/project.actions';
import { QProjectTasks, QTaskComments } from '../backend/graph.queries';
import { TaskActions } from '../store/actions/task.actions';
import { TaskStatuses } from '../enums/task.status.enum';
import { BaseService } from './base-service';
import { User } from '../models/user';

@Injectable()
export class TasksService extends BaseService {
  private db: any;
  constructor(
    private apollo: Apollo,
    protected store: NgRedux<InitialAppState>,
    protected notifications: NotificationsService,
  ) {
    super(notifications, store);
  }
  getProjectTasks(projectId: string) {
    console.log(`get tasks from project ${projectId}`);
    this.apollo.query({
      query: QProjectTasks,
      variables: {
        projectId: projectId
      }
    }).subscribe(({ data }: any) => {
      const response = data.Project;
      console.log('response');
      console.log(response);
      const projectTasks = response.tasks.map((task) => {
        // tslint:disable-next-line:max-line-length
        const taskAuthor: User = new User('', task.author.email, task.author.firstName, task.author.lastName, null, '');
        return new Task(task.id, task.status, response.id, task.title, task.description, task.due, taskAuthor, []);
      });
      this.store.dispatch({
        type: TaskActions.SET_PROJECT_TASKS,
        payload: projectTasks,
      });
    });
  }
  deleteTask(taskId: string) {
    this.apollo.mutate({
      mutation: MDeleteTask,
      variables: {
        taskId,
      }
    }).subscribe(({data}: any) => {
      const deletedTaskId = data.deleteTask.id;
      this.store.dispatch({
          type: TaskActions.DELETE_TASK,
          payload: {
            taskId: deletedTaskId
          }
        });
      this.notifications.success('Success', 'Task deleted');
      }, this.handleError);
}

  addTaskToProject(projectId: string, task: Task) {
    this.apollo.mutate({
      mutation: MAddTaskToProject,
      variables: {
        projectId,
        taskName: task.title,
        taskDescription: task.description,
        taskDue: task.due,
        userId: this.getLoggedInUserId()
      }
    }).subscribe(({ data }: any) => {
      const response = data.createTask;
      this.store.dispatch({
        type: TaskActions.ADD_TASK_TO_PROJECT,
        // tslint:disable-next-line:max-line-length
        payload: new Task(response.id, TaskStatuses.NO_STATUS, response.project.id, response.title, response.description, response.due, new User(response.author.id, response.author.email, response.author.firstName, response.author.lastName, null, ''), null),
      });
      this.notifications.success('Success', 'Added task to project');
    }, this.handleError);
  }

  updateTaskStatus(taskId: string, newTaskStatus: TaskStatuses) {
    this.apollo.mutate({
      mutation: MUpdateTaskStatus,
      variables: {
        taskId,
        newTaskStatus
      }
    }).subscribe(({data}: any) => {
      const response = data.updateTask;
      if (response) {
        this.notifications.success('Success', 'Updated task status');
      }
    }, this.handleError);
  }
}
