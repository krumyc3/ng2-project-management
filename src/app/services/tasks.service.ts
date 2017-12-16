import { Injectable } from '@angular/core';
// import Firebase from '../backend/firebase';
import { Task } from '../models/task';
import { Comment } from '../models/comment';
import { NotificationsService } from 'angular2-notifications';
import { Apollo } from 'apollo-angular';
import { MAddCommentToTask, MDeleteTask, MLikeComment, MAddTaskToProject, MDeleteComment, MUpdateTaskStatus } from '../backend/graph.mutations';
import { NgRedux } from '@angular-redux/store';
import { InitialAppState } from '../store/initialState';
import { ProjectActions } from '../store/actions/project.actions';
import { QProjectTasks, QTaskComments } from '../backend/graph.queries';
import { TaskActions } from '../store/actions/task.actions';
import { TaskStatuses } from '../enums/task.status.enum';

@Injectable()
export class TasksService {
  private db: any;
  constructor(
    private apollo: Apollo,
    private store: NgRedux<InitialAppState>,
    private notification: NotificationsService,
  ) {
  }
  getProjectTasks(projectId: String) {
    this.apollo.query({
      query: QProjectTasks,
      variables: {
        projectId: projectId
      }
    }).subscribe(({ data }: any) => {
      const response = data.Project;
      const projectTasks = response.tasks.map((task) => {
        return new Task(task.id, task.status, response.id, task.title, task.description, task.due, null, []);
      });
      this.store.dispatch({
        type: TaskActions.SET_PROJECT_TASKS,
        payload: projectTasks,
      });
    });
  }
  deleteTask(taskId: String) {
    this.apollo.mutate({
      mutation: MDeleteTask,
      variables: {
        taskId
      }
    }).subscribe(({data}: any) => {
      const deletedTaskId = data.deleteTask.id;
      this.store.dispatch({
        type: TaskActions.DELETE_TASK,
        payload: {
          taskId: deletedTaskId
        }
      });
      this.notification.success('Success', 'Task deleted');
    });
}

  likeComment(commentId: String, likes: number) {
    this.apollo.mutate({
      mutation: MLikeComment,
      variables: {
        commentId,
        likes: likes + 1,
      }
    }).subscribe(({data}) => {
      const response = data.updateComment;
      this.store.dispatch({
        type: ProjectActions.UPDATE_COMMENT_LIKES,
        payload: {
          commentId,
          likes: response.likes,
        }
      });
      this.notification.success('Success', 'Comment liked');
    });
  }
  addTaskToProject(projectId: String, task: Task) {
    this.apollo.mutate({
      mutation: MAddTaskToProject,
      variables: {
        projectId,
        taskName: task.title,
        taskDescription: task.description,
        taskDue: task.due
      }
    }).subscribe(({ data }: any) => {
      const response = data.createTask;
      this.store.dispatch({
        type: TaskActions.ADD_TASK_TO_PROJECT,
        // tslint:disable-next-line:max-line-length
        payload: new Task(response.id, TaskStatuses.NO_STATUS, response.project.id, response.title, response.description, response.due, null, null),
      });
    });
    this.notification.success('Success', 'Added task to project');
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
        this.notification.success('Success', 'Updated task status');
      }
    });
  }
}
