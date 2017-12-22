import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular/Apollo';
import { NgRedux } from '@angular-redux/store';
import { InitialAppState } from './store/initialState';
import { QTaskComments } from './backend/graph.queries';
import { CommentActions } from './store/actions/comment.actions';
import { Comment } from './models/comment';
import { MAddCommentToTask, MLikeComment } from './backend/graph.mutations';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class CommentsService {

  constructor(
    private apollo: Apollo,
    private store: NgRedux<InitialAppState>,
    private notifications: NotificationsService,
    private commentActions: CommentActions
  ) { }
  addCommentToTask(newComment: Comment) {
    this.apollo.mutate({
      mutation: MAddCommentToTask,
      variables: {
        taskId: newComment.taskId,
        commentContent: newComment.content
      },
    }).subscribe(({ data }) => {
      const response = data.createComment;
      this.store.dispatch({
        type: CommentActions.ADD_COMMENT,
        payload: new Comment(response.id, null, response.task.id, response.content, response.likes, response.createdAt),
      });
    });
  }
  getTaskComments(taskId: string) {
    this.apollo.query({
      query: QTaskComments,
      variables: {
        taskId
      }
    }).subscribe(({data}: any) => {
      const response = data.Task.comments;
      const taskComments = response.map((comment => {
        return new Comment(comment.id, null, data.Task.id, comment.content, comment.likes, comment.createdAt);
      }));
      this.store.dispatch({
        type: CommentActions.ADD_COMMENT,
        payload: taskComments,
      });
    });
  }

  likeComment(commentId: String, likes: number) {
    this.apollo.mutate({
      mutation: MLikeComment,
      variables: {
        commentId,
        likes: likes + 1,
      }
    }).subscribe(({ data }) => {
      const response = data.updateComment;
      this.store.dispatch(this.commentActions.likeComment(response.id));
      this.notifications.success('Success', 'Comment liked');
    });
  }
}
