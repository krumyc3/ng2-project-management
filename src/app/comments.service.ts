import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular/Apollo';
import { NgRedux } from '@angular-redux/store';
import { InitialAppState } from './store/initialState';
import { QTaskComments } from './backend/graph.queries';
import { CommentActions } from './store/actions/comment.actions';
import { Comment } from './models/comment';
import { MAddCommentToTask, MLikeComment, MDeleteComment } from './backend/graph.mutations';
import { NotificationsService } from 'angular2-notifications';
import { UtilsService } from './services/base-service';
import { User } from './models/user';

@Injectable()
export class CommentsService {

  constructor(
    private apollo: Apollo,
    private utils: UtilsService,
    private commentActions: CommentActions
  ) {
   }
  addCommentToTask(newComment: Comment) {
    this.apollo.mutate({
      mutation: MAddCommentToTask,
      variables: {
        taskId: newComment.taskId,
        commentContent: newComment.content,
        userId: this.utils.getLoggedInUserId()
      },
    }).subscribe(({ data }) => {
      const comment = data.createComment;
      this.utils.store.dispatch({
        type: CommentActions.ADD_COMMENT,
        // tslint:disable-next-line:max-line-length
        payload: new Comment(comment.id, new User(comment.author.id, '', comment.author.firstName, comment.author.lastName), comment.task.id, comment.content, comment.likes, comment.createdAt),
      });
      this.utils.notifications.success('Success', 'Comment added');
    }, this.utils.handleError.bind(this));
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
        const commentAuthor = new User(comment.author.id, comment.author.email, comment.author.firstName, comment.author.lastName, null, '');
        return new Comment(comment.id, commentAuthor, data.Task.id, comment.content, comment.likes, comment.createdAt);
      }));
      this.utils.store.dispatch({
        type: CommentActions.SET_COMMENTS,
        payload: taskComments,
      });
    }, this.utils.handleError.bind(this));
  }

  likeComment(commentId: string, likes: number) {
    this.apollo.mutate({
      mutation: MLikeComment,
      variables: {
        commentId,
        likes: likes + 1,
      }
    }).subscribe(({ data }) => {
      const response = data.updateComment;
      this.utils.store.dispatch(this.commentActions.likeComment(response.id));
      this.utils.notifications.success('Success', 'Comment liked');
    }, this.utils.handleError.bind(this));
  }

  deleteComment(commentId: string) {
    this.apollo.mutate({
      mutation: MDeleteComment,
      variables: {
        commentId
      }
    }).subscribe(({ data}) => {
      const response = data.deleteComment;
      this.utils.store.dispatch(this.commentActions.deleteComment(response.id));
      this.utils.notifications.success('Success', 'Comment deleted!');
    }, this.utils.handleError.bind(this));
  }
}
