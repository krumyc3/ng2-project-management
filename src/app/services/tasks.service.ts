import { Injectable } from '@angular/core';
// import Firebase from '../backend/firebase';
import { Task } from '../models/task';
import { Comment } from '../models/comment';
import { NotificationsService } from 'angular2-notifications';
import { Apollo } from 'apollo-angular';
import { MAddCommentToTask } from '../backend/graph.mutations';
import { NgRedux } from '@angular-redux/store';
import { InitialAppState } from '../store/initialState';
import { ProjectActions } from '../store/actions/project.actions';

@Injectable()
export class TasksService {
  private db: any;
  constructor(
    private apollo: Apollo,
    private store: NgRedux<InitialAppState>,
    private notification: NotificationsService,
  ) {
    // this.db = Firebase.database();
  }

  addNewTask(newTask: Task): void {
  }

  addCommentToTask(newComment: Comment) {
    this.apollo.mutate({
      mutation: MAddCommentToTask,
      variables: {
        taskId: newComment.taskId,
        commentContent: newComment.content
      },
    }).subscribe(({data}) => {
      const response = data.createComment;
      this.notification.success('Success', 'Comment added');
      this.store.dispatch({
        type: ProjectActions.ADD_COMMMENT_TO_TASK,
        payload: {
          taskId: response.task.id,
          comment: new Comment(null, response.task.id, response.content, response.likes, response.createdAt),
        }
      });
    });
  }
}
