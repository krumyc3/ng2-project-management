import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular/Apollo';
import { NgRedux } from '@angular-redux/store';
import { InitialAppState } from './store/initialState';
import { QTaskComments } from './backend/graph.queries';
import { CommentActions } from './store/actions/comment.actions';
import { Comment } from './models/comment';
import { MAddCommentToTask } from './backend/graph.mutations';

@Injectable()
export class CommentsService {

  constructor(
    private apollo: Apollo,
    private store: NgRedux<InitialAppState>
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
}
