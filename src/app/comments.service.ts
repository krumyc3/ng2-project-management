import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular/Apollo';
import { NgRedux } from '@angular-redux/store';
import { InitialAppState } from './store/initialState';
import { QTaskComments } from './backend/graph.queries';
import { CommentActions } from './store/actions/comment.actions';
import { Comment } from './models/comment';
import { MAddCommentToTask, MLikeComment } from './backend/graph.mutations';
import { NotificationsService } from 'angular2-notifications';
import { BaseService } from './services/base-service';
import { User } from './models/user';

@Injectable()
export class CommentsService extends BaseService {

  constructor(
    private apollo: Apollo,
    store: NgRedux<InitialAppState>,
    notifications: NotificationsService,
    private commentActions: CommentActions
  ) {
    super(notifications, store);
   }
  addCommentToTask(newComment: Comment) {
    this.apollo.mutate({
      mutation: MAddCommentToTask,
      variables: {
        taskId: newComment.taskId,
        commentContent: newComment.content,
        userId: this.getLoggedInUserId()
      },
    }).subscribe(({ data }) => {
      const comment = data.createComment;
      this.store.dispatch({
        type: CommentActions.ADD_COMMENT,
        // tslint:disable-next-line:max-line-length
        payload: new Comment(comment.id, new User('', comment.author.email, '', ''), comment.task.id, comment.content, comment.likes, comment.createdAt),
      });
    }, this.handleError.bind(this));
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
        // tslint:disable-next-line:max-line-length
        return new Comment(comment.id, new User('', comment.author.email, '', ''), data.Task.id, comment.content, comment.likes, comment.createdAt);
      }));
      this.store.dispatch({
        type: CommentActions.ADD_COMMENT,
        payload: taskComments,
      });
    }, this.handleError.bind(this));
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
    }, this.handleError.bind(this));
  }
}
